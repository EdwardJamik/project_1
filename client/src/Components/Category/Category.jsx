import React, {useEffect, useState} from 'react';

import './category.scss'
import {useTranslation} from "react-i18next";
import {Link, useLocation, useParams} from "react-router-dom";

const Category = () => {
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const currentLanguage = i18n.language;

    const location = useLocation();

    const [isOpen, setOpen] = useState(false)

    const { category } = useParams();
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '/';
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${basePath ? `${basePath}/` : ''}/category.json`)
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

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
                    {data ? data.map((record, index) => (
                        <li key={index} className={category === record?.link ? "active menu-item" : "menu-item"}>
                            <Link to={`/category/${record?.link}${location?.search ? location?.search : ''}`}>
                                <div>
                                    <span>{getLocalizedValue(record?.title)}</span>
                                </div>
                            </Link>
                        </li>
                    )) : <></>}
                </ul>
            </nav>
        </aside>
    );
};

export default Category;