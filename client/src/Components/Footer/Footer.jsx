import React, {useEffect, useState} from 'react';
import './footer.scss'

import footer_img_1 from '../../Assets/footer_img_1.png'
import footer_img_2 from '../../Assets/footer_img_2.png'
import footer_img_3 from '../../Assets/footer_img_3.png'

import {useTranslation} from "react-i18next";
const Footer = () => {
    const {i18n} = useTranslation();
    const currentLanguage = i18n.language;

    const [isMobile, setIsMobile] = useState(false);
    const [footer_link, set_footer_link] = useState(null);
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '/';

    useEffect(() => {
        fetch(`${basePath ? `${basePath}/` : ''}footer_link.json`)
            .then(response => response.json())
            .then(data => set_footer_link(data));
    }, []);


    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => {
            window.removeEventListener('resize', checkDevice);
        };
    }, []);

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