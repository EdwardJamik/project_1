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

    const getRandomItems = (data, count) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    useEffect(() => {
        const selectedItems = getRandomItems(data, 10);
        setRandomItems(selectedItems);
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
                    {randomItems.map((record, index) => (
                        <SwiperSlide key={index}>
                            <div className="card" onClick={handleOpen}>
                                <div className="image-placeholder">
                                    <img src={record.photo} alt=""/>
                                </div>
                                {record.badge ?
                                    <div className="tags">
                                        <Tag type={record.badge}/>
                                    </div>
                                    :
                                    <></>
                                }

                                <div className="content">
                                <p className="title">{getLocalizedValue(record.title)}</p>
                                    <p className="location">{record?.location ? getLocalizedValue(record?.location) : ''}</p>
                                    <p className="description">{getLocalizedValue(record.description)}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </div>

                <button className="swiper-button-next">{rightIcon}</button>
                <button className="swiper-button-prev">{leftIcon}</button>
            </Swiper>
        </div>
    );
}
