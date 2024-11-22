import React from 'react';
import './footer.scss'

import footer_img_1 from '../../Assets/footer_img_1.png'
import footer_img_2 from '../../Assets/footer_img_2.png'
import footer_img_3 from '../../Assets/footer_img_3.png'
import {useModal} from "../Modal/ModalContext.jsx";

const Footer = () => {
    const {openModal} = useModal();
    const handleOpen = () => {
        openModal();
    };
    return (
        <footer>
            <div className="container">
                <div className="sert">
                    <img onClick={handleOpen} src={footer_img_1} alt="SSL"/>
                    <img onClick={handleOpen} src={footer_img_2} alt="Amature"/>
                    <img onClick={handleOpen} src={footer_img_3} alt="Empfehlung"/>
                </div>
                <span onClick={handleOpen}>AGB</span><span onClick={handleOpen}>Impressum</span>
               <span onClick={handleOpen}>FAQ</span><span onClick={handleOpen}>Datenschutz</span>
            </div>
        </footer>
    );
};

export default Footer;