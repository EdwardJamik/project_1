import React from 'react';
import './footer.scss'

import footer_img_1 from '../../Assets/footer_img_1.png'
import footer_img_2 from '../../Assets/footer_img_2.png'
import footer_img_3 from '../../Assets/footer_img_3.png'
import {useModal} from "../Modal/ModalContext.jsx";

import footer_link from '../../footer_link.json'
import {useTranslation} from "react-i18next";
const Footer = () => {
    const {openModal} = useModal();

    const {i18n} = useTranslation();
    const currentLanguage = i18n.language;
    const handleOpen = () => {
        openModal();
    };
    return (
        <footer>
            <div className="container">
                <div className="sert">
                    <img src={footer_img_1} alt="SSL"/>
                    <img src={footer_img_2} alt="Amature"/>
                    <img src={footer_img_3} alt="Empfehlung"/>
                </div>
                {footer_link && footer_link[0] ? <a target='_blank' href={footer_link[0]['link']}>{footer_link[0][currentLanguage]}</a> : ''}
                {footer_link &&footer_link[1] ? <a target='_blank' href={footer_link[1]['link']}>{footer_link[1][currentLanguage]}</a> : ''}
                {footer_link &&footer_link[2] ? <a target='_blank' href={footer_link[2]['link']}>{footer_link[2][currentLanguage]}</a> : ''}
                {footer_link &&footer_link[3] ? <a target='_blank' href={footer_link[3]['link']}>{footer_link[3][currentLanguage]}</a> : ''}
            </div>
        </footer>
    );
};

export default Footer;