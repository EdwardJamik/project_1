import React, {
    useState,
    useEffect,
    useCallback,
    useMemo
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import './slider.scss';

import Tag from "../Tag/Tag.jsx";
import data from '../../slide_list.json';
import { useTranslation } from "react-i18next";
import { useModal } from "../Modal/ModalContext.jsx";
import { Navigation, Autoplay } from 'swiper/modules';
import axios from "axios";
import {LazyImage} from "../Image/Image.jsx";

const NavigationIcons = {
    Right: () => (
        <svg viewBox="0 0 24 24" width='20px' height='20px' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 7L15 12L10 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    Left: () => (
        <svg viewBox="0 0 24 24" width='20px' height='20px' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 7L10 12L15 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
};

export default function TopSlider() {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const { openModal } = useModal();
    const handleOpen = useCallback(() => {
        openModal();
    }, [openModal]);

    const getLocalizedValue = useCallback((value) => {
        return value?.[currentLanguage] || '';
    }, [currentLanguage]);

    const [state, setState] = useState({
        randomItems: [],
        locationData: null
    });

    const getRandomItems = useCallback((sourceData, count) => {
        return [...sourceData]
            .sort(() => 0.5 - Math.random())
            .slice(0, count);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [locationResponse] = await Promise.allSettled([
                    fetchLocation()
                ]);

                const initialData = getRandomItems(data, 10);
                setState(prev => ({
                    ...prev,
                    randomItems: [],
                    locationData: locationResponse.status === 'fulfilled'
                        ? locationResponse.value
                        : null
                }));

                for (let i = 0; i < initialData.length; i++) {
                    await new Promise(resolve => setTimeout(resolve, 0));
                    setState(prev => ({
                        ...prev,
                        randomItems: [...prev.randomItems, initialData[i]]
                    }));
                }
            } catch (error) {
                console.error('Data fetching error:', error);
            }
        };

        fetchData();
    }, [getRandomItems]);

    const fetchLocation = async () => {
        try {
            const { data: ipData } = await axios.get('https://api.ipify.org?format=json');
            const { data: locationData } = await axios.get(
                `https://pro.ip-api.com/json/${ipData?.ip}?key=${import.meta.env.VITE_API_KEY}`
            );
            return { city: locationData.city, zip: locationData.zip };
        } catch (err) {
            console.error('Location fetch error:', err);
            return null;
        }
    };

    const swiperSettings = useMemo(() => ({
        spaceBetween: 10,
        slidesPerView: 5,
        loop: true,
        loopAdditionalSlides: 5,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: false,
            stopOnLastSlide: false
        },
        speed: 1000,
        breakpoints: {
            300: { slidesPerView: 2, spaceBetween: 10 },
            560: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            990: { slidesPerView: 4, spaceBetween: 30 },
            1200: { slidesPerView: 5, spaceBetween: 10 }
        },
        pagination: { clickable: true },
        scrollbar: { draggable: true },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        modules: [Navigation, Autoplay]
    }), []);

    return (
        <div className='top_slider'>
            <h2>{t('title')}</h2>
            <Swiper {...swiperSettings} className="mySwiper">
                <div className="grid">
                    {state.randomItems.map((record, index) => {
                        const distance = Math.floor(Math.random() * (45 - 4 + 1)) + 4;

                        return (
                            <SwiperSlide key={index}>
                                <div className="card" onClick={handleOpen}>
                                    <div className="image-placeholder">
                                        <LazyImage src={record?.photo} alt={getLocalizedValue(record?.title)}/>
                                        {/*<img*/}
                                        {/*    src={record?.photo}*/}
                                        {/*    alt=""*/}
                                        {/*    loading="lazy"*/}
                                        {/*/>*/}
                                    </div>
                                    {record?.badge && (
                                        <div className="tags">
                                            <Tag type={record?.badge} />
                                        </div>
                                    )}
                                    <div className="content">
                                        <p className="title">{getLocalizedValue(record?.title)}</p>
                                        <p className="location">
                                            {distance ? `${distance} km` : ``} von {state.locationData?.city}
                                        </p>
                                        <p className="description">{getLocalizedValue(record?.description)}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </div>

                <button className="swiper-button-next">
                    <NavigationIcons.Right />
                </button>
                <button className="swiper-button-prev">
                    <NavigationIcons.Left />
                </button>
            </Swiper>
        </div>
    );
}