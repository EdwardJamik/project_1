import React, {useEffect, useState} from 'react';
import './scrollButton.scss'
import {useModal} from "../Modal/ModalContext.jsx";

const adIcon = [
    <svg key='adIcon' viewBox="0 0 24 24" width='20px' height='20px' fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M21.9348 15.6583L18.6383 3.37924C18.2799 2.0442 16.6391 1.55235 15.603 2.46935L13.5253 4.30818C11.2132 6.35446 8.45556 7.83537 5.47068 8.63362C2.97216 9.30181 1.49142 11.8725 2.16089 14.3662C2.83037 16.8599 5.40053 18.3472 7.89906 17.679C10.8839 16.8807 14.014 16.787 17.0415 17.4054L19.762 17.961C21.1187 18.2381 22.2932 16.9933 21.9348 15.6583Z"
            stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M7.71747 8L11.5 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"
              strokeLinejoin="round"></path>
    </svg>
]

const ScrollButton = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const { openModal } = useModal();
    const handleOpen = (e) => {
        e.target.blur();
        openModal();
    };

    useEffect(() => {
        const handleScroll = () => {

            if (window.scrollY > 100) {
                setIsScrolled(true);
            }
            // else {
            //     setIsScrolled(false);
            // }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <button className={isScrolled ? 'create-ad-btn view' : 'create-ad-btn'} onClick={handleOpen}>
            <span className='icon'>{adIcon}</span>
            Gratis Anzeige erstellen
        </button>
    );
};

export default ScrollButton;