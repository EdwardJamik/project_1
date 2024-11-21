import React from 'react';
import './header.scss'

import logo from '../../Assets/logo.png'
import {useTranslation} from "react-i18next";
import {useModal} from "../Modal/ModalContext.jsx";

const mailingIcon = [
    <svg key='mailing' viewBox="0 0 24 24" width='24px' height='24px' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 3H6C4.93913 3 3.92172 3.42149 3.17157 4.17163C2.42142 4.92178 2 5.93913 2 7V14C2 15.0609 2.42142 16.0783 3.17157 16.8285C3.92172 17.5786 4.93913 18 6 18H8L10.29 20.29C10.514 20.5156 10.7804 20.6946 11.0739 20.8168C11.3674 20.9389 11.6821 21.0018 12 21.0018C12.3179 21.0018 12.6326 20.9389 12.9261 20.8168C13.2196 20.6946 13.486 20.5156 13.71 20.29L16 18H18C19.0609 18 20.0783 17.5786 20.8284 16.8285C21.5786 16.0783 22 15.0609 22 14V10"
                stroke="#c6507e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path
                d="M20.6 1.00003C20.008 1.00175 19.4377 1.2171 19 1.60422C18.6567 1.30103 18.23 1.10139 17.7719 1.02963C17.3138 0.957876 16.844 1.0171 16.42 1.20011C15.9959 1.38311 15.6359 1.68198 15.3838 2.06026C15.1316 2.43854 14.9983 2.87989 15 3.33048C15 6.11406 19 8 19 8C19 8 23 6.11406 23 3.33048C23 2.71241 22.7472 2.11966 22.2971 1.68261C21.847 1.24557 21.2365 1.00003 20.6 1.00003Z"
                stroke="#c6507e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
]

const moreIcon = [
    <svg key='more' viewBox="0 0 24 24" width='26px' height='26px' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z"
                fill="#c6507e"></path>
            <path
                d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z"
                fill="#c6507e"></path>
            <path
                d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z"
                fill="#c6507e"></path>
    </svg>
]

const adIcon = [
    <svg key='adIcon' viewBox="0 0 24 24" width='20px' height='20px' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.9348 15.6583L18.6383 3.37924C18.2799 2.0442 16.6391 1.55235 15.603 2.46935L13.5253 4.30818C11.2132 6.35446 8.45556 7.83537 5.47068 8.63362C2.97216 9.30181 1.49142 11.8725 2.16089 14.3662C2.83037 16.8599 5.40053 18.3472 7.89906 17.679C10.8839 16.8807 14.014 16.787 17.0415 17.4054L19.762 17.961C21.1187 18.2381 22.2932 16.9933 21.9348 15.6583Z"
                stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M7.71747 8L11.5 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"
                  strokeLinejoin="round"></path>
    </svg>
]
const Header = () => {
    const { i18n } = useTranslation();
    const { t } = useTranslation();

    const { openModal } = useModal();
    const handleOpen = (e) => {
        e.target.blur();
        openModal();
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo" onClick={handleOpen}><img src={logo} alt="Logo"/></div>
                <div className="search_content">
                    <input type="text" placeholder="Suchen" className="search-input" onClick={handleOpen}/>
                    <button className="create-ad-btn" onClick={handleOpen}>
                        <span className='icon'>{adIcon}</span>
                        Gratis Anzeige erstellen
                    </button>
                </div>

                <div className="tools">
                    <div className="menu-item" onClick={handleOpen}>
                        <div className="icon">{mailingIcon}</div>
                        <span>{t('text_box')}</span>
                    </div>
                    <div className="menu-item" onClick={handleOpen}>
                        <div className="icon">{moreIcon}</div>
                        <span>{t('text_more')}</span>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;