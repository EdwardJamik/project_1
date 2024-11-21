import React, {useEffect, useState} from 'react';
import { useModal } from './ModalContext';
import './modal.scss'
import axios from "axios";
import md5 from 'md5';
import {useTranslation} from "react-i18next";

const closeIcon = [
    <svg viewBox="0 0 24 24" width='20px' height='20px' fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
]
const Modal = () => {
    const { t } = useTranslation();

    const {isActive, closeModal} = useModal();

    const [isStep, setStep] = useState(1)
    const [isLand, setLand] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [isMailError, setMailError] = useState(false)
    const [isConfirm, setConfirm] = useState(0)

    const [isStepInfo, setStepInfo] = useState('')

    useEffect(()=>{
            setStep(1)
            setLand('')
            setLoading(false)
            setMailError(false)
            setConfirm(0)

        const step_info = t('modal_step')
        const updatedStep = step_info.replace("{isStep}", 1);
        setStepInfo(updatedStep)
   },[isActive])

    const [userData, setUserData] = useState({
        gender: 1,
        gender_search: 2,
        tag: null,
        monat: null,
        jahr: null,
        nick: null,
        pass: null,
        mail: null,
        land: 105,
        plz: null,
        subid: 1,
        campaign: 150,
        transaction_id: 1,
        policy: 1,
        parametersString: "¶meter[]=s2|Testlinks_18¶meter[]=tracking_id|664f0a60746711521921333459c64acd8efaa82e74",
        clientIP: null,
        hash: null
    })

    const [isError, setError] = useState(null)

    useEffect(() => {
        const fetchIp = async () => {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                setUserData({...userData,clientIP:response.data.ip})
            } catch (error) {
                console.error('Error fetching IP:', error);
            }
        };

        fetchIp();
    }, []);
    const nextStep = async () => {

        if (isStep === 1) {
            const step_info = t('modal_step')
            const updatedStep = step_info.replace("{isStep}", isStep+1);
            setStepInfo(updatedStep)

            setStep(isStep + 1)
            setError(null)

        } else if (isStep === 2) {
            if (!userData?.tag || !userData?.monat || !userData?.jahr) {
                setError(t('modal_warning_date'));
                return;
            }

            if (userData?.tag < 1 || userData?.tag > 31 || userData?.monat < 1 || userData?.monat > 12 || userData?.jahr < 1900 || userData?.jahr > new Date().getFullYear()) {
                setError(t('modal_warning_date'));
                return;
            }

            const birthDate = new Date(userData?.jahr, userData?.monat - 1, userData?.tag);
            const age = new Date().getFullYear() - birthDate.getFullYear();

            if (age < 18 || (age === 18 && (new Date().getMonth() + 1) < userData?.monat) || (age === 18 && (new Date().getMonth() + 1) === userData?.monat && new Date().getDate() < userData?.tag)) {
                setError(t('modal_warning_age'));
                return;
            }

            const step_info = t('modal_step')
            const updatedStep = step_info.replace("{isStep}", isStep+1);
            setStepInfo(updatedStep)

            setError(null)
            setStep(isStep + 1)
        } else if (isStep === 3) {
            if (!isLand || !userData?.plz) {
                setError(true)
                return;
            }

            if (isLoading && isConfirm) {
                const step_info = t('modal_step')
                const updatedStep = step_info.replace("{isStep}", isStep+1);
                setStepInfo(updatedStep)

                setError(null)
                setStep(isStep + 1)
            } else {
                setLoading(true)
                setTimeout(() => {
                    const randomNumber = Math.floor(Math.random() * (160 - 30 + 1)) + 30;
                    setConfirm(randomNumber);
                }, 4000);
            }
        } else if (isStep === 4) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!userData?.nick || !userData?.pass || !userData?.mail) {
                setError(true);
                return;
            }

            if (!emailRegex.test(userData?.mail)) {
                setMailError(true);
                setError(t('modal_warning_mail'))
                return;
            }

            setError(null)
            setMailError(false);

            await sendRequest()
        }
    }

    const calculateHash = () => {
        const secret = 'Gn8F3AlLq19z';
        const safeValue = value => value === null || value === undefined ? '' : value;

        const paramsString =
            `${safeValue(userData.gender)}${safeValue(userData.gender_search)}${safeValue(userData.tag)}${safeValue(userData.monat)}${safeValue(userData.jahr)}${safeValue(userData.nick)}${safeValue(userData.pass)}${safeValue(userData.mail)}${safeValue(userData.land)}${safeValue(userData.plz)}${safeValue(userData.subid)}${safeValue(userData.campaign)}${userData.parametersString}`;
        return md5(paramsString + secret);
    };

    const sendRequest = async () => {
        try {
            const gender = 1;
            const gender_search = 2;
            const tag = 1;
            const monat = 1;
            const jahr = 1980;
            const nick = "mpolly";
            const pass = "mpolly";
            const mail = "mpolly1@web.de";
            const land = 105;
            const plz = 10115;
            const subid = 1;
            const campaign = 150;
            const parametersString = "¶meter[]=s2|Testlinks_18¶meter[]=tracking_id|664f0a60746711521921333459c64acd8efaa82e74";
            const parameters = ["s2|Testlinks_18", "tracking_id|664f0a60746711521921333459c64acd8efaa82e74"];
            const secret = "Gn8F3AlLq19z";

            const paramString = parameters.join('');
            const params =
                `${gender}${gender_search}${tag}${monat}${jahr}${nick}${pass}${mail}${land}${plz}${subid}${campaign}${paramString}`;

            const hashTemp = md5(params + secret);

            const parameter = `gender=${gender}&gender_search=${gender_search}&tag=${tag}&monat=${monat}&jahr=${jahr}&nick=${nick}` +
                `&pass=${pass}&mail=${mail}&land=${land}&plz=${plz}&subid=${subid}&campaign=${campaign}` +
                `&transaction_id=1&policy=1${parametersString}&hash=${hashTemp}&clientIP=111.111.111.111`;

            const url = `https://flirtrakete.net/API/api.adultstats_net.php?${parameter}`;

            try {

                const response = await axios.get(url);
                console.log("API Response:", response.data);
            } catch (error) {
                console.error("API Error:", error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const Replacer = (text) =>{
        const updatedText = text.replace("{isConfirm}", isConfirm);

        return <>{updatedText}</>;
    }

    return (
        <div className={isActive ? 'modal active' : 'modal'}>
            <div className={isActive ? 'modal_container active' : 'modal_container'} onClick={(e) => e.stopPropagation()}>
                {isStep === 1 &&
                    <>
                        <div className="modal_header">
                            <h4>{t('modal_title_step_1')}</h4>
                            <button className='close_button' onClick={closeModal}>{closeIcon}</button>
                        </div>

                        <div className="modal_content">
                            <p>{t('modal_p_1_step_1')}</p>
                            <p className='last'>{t('modal_p_2_step_1')}</p>

                            <button onClick={nextStep}>{t('modal_button_step_1')}</button>
                            <span className="step">{isStepInfo}</span>
                        </div>
                    </>
                }

                {isStep === 2 &&
                    <>
                        <div className="modal_header">
                            <h4>{t('modal_title_step_2')}</h4>
                            <button className='close_button' onClick={closeModal}>{closeIcon}</button>
                        </div>

                        <div className="modal_content step_2">
                            <p>{t('modal_p_1_step_2')}</p>

                            <div className="date">
                                <input type="number" value={userData.tag} onChange={(e)=>{setUserData({...userData, tag: e.target.value})}} step="1" min="1" max="31" placeholder={t('input_placeholder_day')}/>
                                <input type="number" value={userData.monat} onChange={(e)=>{setUserData({...userData, monat: e.target.value})}} placeholder={t('input_placeholder_month')}/>
                                <input type="number" value={userData.jahr} onChange={(e)=>{setUserData({...userData, jahr: e.target.value})}} placeholder={t('input_placeholder_year')}/>
                            </div>

                            <button onClick={nextStep}>{t('modal_button_step_2')}</button>

                            {isError !== null &&
                                <div className="warning">{isError}</div>
                            }

                            <span className="step">{isStepInfo}</span>
                        </div>
                    </>
                }

                {isStep === 3 &&
                    <>
                        <div className="modal_header">
                            <h4>{isLoading ? <>{t('modal_title_step_find')}</> : <>{t('modal_p_1_step_2')}</>}</h4>
                            <button className='close_button' onClick={closeModal}>{closeIcon}</button>
                        </div>

                        <div className="modal_content step_3">

                            {isLoading ?
                                <>
                                    {isConfirm ?
                                        <>
                                            <p>{Replacer(t('modal_p_1_step_3'))}</p>
                                            <button onClick={nextStep}>{t('modal_button_step_3')}</button>
                                            <span className="step">{isStepInfo}</span>
                                        </>
                                        :
                                        <>
                                            <div className="loading-container">
                                                <div className="loading-line-container">
                                                    <div className="loading-line startLoading"></div>
                                                </div>
                                            </div>

                                            <p className='loadingSubtitle'>{t('modal_p_2_step_3')}</p>
                                            <span className="step">{isStepInfo}</span>
                                        </>
                                    }

                                        </>
                                        :
                                        <>
                                        <p>{t('modal_p_3_step_3')}</p>

                                        <div className="selector">
                                        <select
                                        style={isError === true ? {borderColor: '#ef4444', borderWidth: '2px'} : {}}
                                    value={isLand} onChange={(e) => {
                                            setLand(e.target.value)
                                        }}>
                                            <option value="" disabled>Land</option>
                                            <option value="DE">Deutschland</option>
                                            <option value="AT">Österreich</option>
                                            <option value="CH">Schweiz</option>
                                        </select>
                                        <input
                                            style={isError === true ? {borderColor: '#ef4444', borderWidth: '2px'} : {}}
                                            type="text" placeholder={t('input_placeholder_post_code')} value={userData?.plz} onChange={(e) => {
                                            setUserData({...userData, plz: e.target.value})
                                        }}/>
                                    </div>

                                    <button onClick={nextStep}>{t('modal_button_step_find')}</button>

                                    {isError !== null &&
                                        <div className="warning">{isError}</div>
                                    }

                                    <span className="step">{isStepInfo}</span>
                                </>
                            }
                        </div>
                    </>
                }
                {isStep === 4 &&
                    <>
                        <div className="modal_header">
                            <h4>{t('modal_title_step_4')}</h4>
                            <button className='close_button' onClick={closeModal}>{closeIcon}</button>
                        </div>

                        <div className="modal_content step_4">

                            <input style={!userData.nick && isError ? {borderColor: '#ef4444', borderWidth: '2px'} : {}} value={userData.nick} onChange={(e)=>{setUserData({...userData, nick: e.target.value})}} type="text" placeholder={t('input_placeholder_nick')}/>
                            <input style={!userData.pass && isError ? {borderColor: '#ef4444', borderWidth: '2px'} : {}} value={userData.pass} onChange={(e)=>{setUserData({...userData, pass: e.target.value})}} type="password" placeholder={t('input_placeholder_password')}/>

                            <p>{t('modal_p_1_step_4')}</p>

                            <input style={!userData.mail && isError || isMailError ? {borderColor: '#ef4444', borderWidth: '2px'} : {}} value={userData.mail} onChange={(e)=>{setUserData({...userData, mail: e.target.value})}} type="email" className='email_input' placeholder={t('input_placeholder_mail')}/>

                            <button onClick={nextStep}>{t('modal_button_step_4')}</button>

                            {isError !== null &&
                                <div className="warning">{isError}</div>
                            }

                            <span className="step">{isStepInfo}</span>
                        </div>
                    </>
                }

            </div>
        </div>
    );
};

export default Modal;
