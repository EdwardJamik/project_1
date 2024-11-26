import React, {useEffect, useState} from 'react';
import './footer.scss'

import footer_img_1 from '../../Assets/footer_img_1.png'
import footer_img_2 from '../../Assets/footer_img_2.png'
import footer_img_3 from '../../Assets/footer_img_3.png'

import footer_link from '../../footer_link.json'
import {useTranslation} from "react-i18next";
const Footer = () => {
    const {i18n} = useTranslation();
    const currentLanguage = i18n.language;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Перевірка на мобільний пристрій
        const checkDevice = () => {
            setIsMobile(window.innerWidth <= 768); // Встановлюємо поріг для мобільних пристроїв
        };

        // Викликаємо перевірку при першому рендерингу та при зміні розміру вікна
        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => {
            window.removeEventListener('resize', checkDevice);
        };
    }, []);

    // const openPopup = (url) => {
    //     window.open(url, 'popup', 'width=450,height=500,scrollbars=yes,resizable=yes');
    // };

    const openLink = (url) => {
        if (isMobile) {
            window.open(url, '_blank');
        } else {
            window.open(url, 'popup', 'width=450,height=500,scrollbars=yes,resizable=yes');
        }
    };

    return (
        <footer>
            <div className="container">
                <div className="sert">
                    <img src={footer_img_1} alt="SSL"/>
                    <img src={footer_img_2} alt="Amature"/>
                    <img src={footer_img_3} alt="Empfehlung"/>
                </div>
                {footer_link && footer_link[0] ? <button onClick={() => openLink(footer_link[0]['link'])}>{footer_link[0][currentLanguage]}</button> : ''}
                {footer_link &&footer_link[1] ? <button onClick={() => openLink(footer_link[1]['link'])}>{footer_link[1][currentLanguage]}</button> : ''}
                {footer_link &&footer_link[2] ? <button onClick={() => openLink(footer_link[2]['link'])}>{footer_link[2][currentLanguage]}</button> : ''}
                {footer_link &&footer_link[3] ? <button onClick={() => openLink(footer_link[3]['link'])}>{footer_link[3][currentLanguage]}</button> : ''}
            </div>
        </footer>
    );
};

export default Footer;