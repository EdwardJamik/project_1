import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import './slider.scss';

import Tag from "../Tag/Tag.jsx";

import data from '../../slide_list.json';
import {useTranslation} from "react-i18next";
import {useModal} from "../Modal/ModalContext.jsx";
import { Navigation, Autoplay } from 'swiper/modules';
import axios from "axios";

const rightIcon = [
    <svg viewBox="0 0 24 24" width='20px' height='20px' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 7L15 12L10 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"></path>
    </svg>
]

const leftIcon = [
    <svg viewBox="0 0 24 24" width='20px' height='20px' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 7L10 12L15 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"></path>
    </svg>
]
export default function TopSlider() {
    const {t} = useTranslation();
    const {i18n} = useTranslation();
    const currentLanguage = i18n.language;

    const [randomItems, setRandomItems] = useState([]);

    const {openModal} = useModal();
    const handleOpen = () => {
        openModal();
    };

    const [locationData, setLocationData] = useState(null);

    const fetchLocation = async () => {
        try {
            const getUserIp = await axios.get('https://api.ipify.org?format=json');
            const response = await axios.get(`https://pro.ip-api.com/json/${getUserIp?.data?.ip}?key=${import.meta.env.VITE_API_KEY}`);
            const { city, zip } = response.data;

            setLocationData({ city, zip });
        } catch (err) {
            console.log(err);
        }
    };

    const getRandomItems = (data, count) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };


    useEffect(() => {
        const fetchData = async () => {
            const selectedItems = getRandomItems(data, 10);
            setRandomItems(selectedItems);

            fetchLocation();
        };

        fetchData();
    }, []);


    const getLocalizedValue = (localizedObject) => {
        return localizedObject[currentLanguage] || localizedObject['de'] || '';
    };

    return (
        <div className='top_slider'>
            <h2>{t('title')}</h2>
            <Swiper
                spaceBetween={10}
                slidesPerView={5}
                loop={true}
                loopAdditionalSlides={2}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    waitForTransition: false,
                    stopOnLastSlide: false
                }}
                speed={1000}
                breakpoints={{
                    300: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    560: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    990: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                }}
                pagination={{
                    clickable: true,
                }}
                scrollbar={{ draggable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
            >
                <div className="grid">
                    {randomItems.map((record, index) => {
                        const distance = Math.floor(Math.random() * (45 - 4 + 1)) + 4;
                        return (
                            <SwiperSlide key={index}>
                                <div className="card" onClick={handleOpen}>
                                    <div className="image-placeholder">
                                        <img src={record.photo} alt="" />
                                    </div>
                                    {record.badge ? (
                                        <div className="tags">
                                            <Tag type={record.badge} />
                                        </div>
                                    ) : null}
                                    <div className="content">
                                        <p className="title">{getLocalizedValue(record.title)}</p>
                                        <p className="location">
                                            {distance ? `${distance} km` : ``} von {locationData?.city}
                                        </p>
                                        <p className="description">{getLocalizedValue(record.description)}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </div>

                <button className="swiper-button-next">{rightIcon}</button>
                <button className="swiper-button-prev">{leftIcon}</button>
            </Swiper>
        </div>
    );
}
