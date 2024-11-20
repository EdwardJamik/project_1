import React from 'react';

import './category.scss'
import {useTranslation} from "react-i18next";
import {SwiperSlide} from "swiper/react";
import Tag from "../Tag/Tag.jsx";

import data from '../../category.json';
import {Link, useParams} from "react-router-dom";

const Category = () => {
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const currentLanguage = i18n.language;

    const { category } = useParams();

    const getLocalizedValue = (localizedObject) => {
        return localizedObject[currentLanguage] || localizedObject['de'] || '';
    };
    return (
        <>
            <nav>
                <h2>{t('title_category')}</h2>
                <ul className="menu-list">
                    {data.map((record, index) => (
                        <li key={index} className={category === record?.link ? "active menu-item" : "menu-item"}>
                            <Link to={`/category/${record?.link}`}>
                                <div>
                                    <span>{getLocalizedValue(record?.title)}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Category;