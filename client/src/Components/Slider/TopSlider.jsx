import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './slider.scss';

import Tag from "../Tag/Tag.jsx";

import data from '../../posts.json';
import {useTranslation} from "react-i18next";

export default function TopSlider() {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const [randomItems, setRandomItems] = useState([]);

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
                spaceBetween={10} // Відступи між слайдами
                slidesPerView={5} // Кількість слайдів на екрані
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

                className="mySwiper"
            >
                <div className="grid">
                    {randomItems.map((record, index) => (
                        <SwiperSlide key={index}>
                            <div className="card">
                                <div className="image-placeholder">
                                    <img src={record.photo} alt=""/>
                                </div>
                                <div className="tags">
                                    <Tag type={record.badge}/>
                                </div>
                                <div className="content">
                                    <p className="title">{getLocalizedValue(record.title)}</p>
                                    <p className="location">{getLocalizedValue(record.location)}</p>
                                    <p className="description">{getLocalizedValue(record.description)}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    );
}
