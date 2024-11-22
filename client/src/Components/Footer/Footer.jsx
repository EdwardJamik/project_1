import React from 'react';
import './footer.scss'

import footer_img_1 from '../../Assets/footer_img_1.png'
import footer_img_2 from '../../Assets/footer_img_2.png'
import footer_img_3 from '../../Assets/footer_img_3.png'

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="sert">
                    <img src={footer_img_1} alt="SSL"/>
                    <img src={footer_img_2} alt="Amature"/>
                    <img src={footer_img_3} alt="Empfehlung"/>
                </div>
                <span>AGB</span><span>Impressum</span>
               <span>FAQ</span><span>Datenschutz</span>
            </div>
        </footer>
    );
};

export default Footer;