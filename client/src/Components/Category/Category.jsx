import React, {useState} from 'react';

import './category.scss'
import {useTranslation} from "react-i18next";
import {SwiperSlide} from "swiper/react";
import Tag from "../Tag/Tag.jsx";

import data from '../../category.json';
import {Link, useLocation, useParams} from "react-router-dom";

const Category = () => {
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const currentLanguage = i18n.language;

    const location = useLocation();

    const [isOpen, setOpen] = useState(false)

    const { category } = useParams();

    const onChange = () =>{
        setOpen(!isOpen)
    }

    const getLocalizedValue = (localizedObject) => {
        return localizedObject[currentLanguage] || localizedObject['de'] || '';
    };
    return (
        <aside className="sidebar" onClick={onChange}>
            <nav>
                <h2 className={isOpen ? "open" : ""}>{t('title_category')}</h2>
                <ul className={isOpen ? "open menu-list" : "menu-list"}>
                    {data.map((record, index) => (
                        <li key={index} className={category === record?.link ? "active menu-item" : "menu-item"}>
                            <Link to={`/category/${record?.link}${location?.search ? location?.search : ''}`}>
                                <div>
                                    <span>{getLocalizedValue(record?.title)}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Category;