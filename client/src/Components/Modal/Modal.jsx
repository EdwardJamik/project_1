import React, {useEffect, useState} from 'react';
import { useModal } from './ModalContext';
import './modal.scss'
import axios from "axios";
import {useTranslation} from "react-i18next";
import CryptoJS from 'crypto-js'
import EmailAutofill from "./AutoFill.jsx";
import {useLocation} from "react-router-dom";

const closeIcon = [
    <svg key={'closeIcon'} viewBox="0 0 24 24" width='20px' height='20px' fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
]

const Modal = () => {
    const {t} = useTranslation();

    const {isActive, closeModal} = useModal();

    const [isStep, setStep] = useState(1)
    const [isLand, setLand] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [isMailError, setMailError] = useState(false)
    const [isConfirm, setConfirm] = useState(0)
    const [isLoadButton, setLoadButton] = useState(false)

    const [isStepInfo, setStepInfo] = useState('')

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        setStep(1)
        setLand('')
        setLoading(false)
        setMailError(false)
        setConfirm(0)

        const step_info = t('modal_step')
        const updatedStep = step_info.replace("{isStep}", 1);
        setStepInfo(updatedStep)
   },[isActive])

    const api_key = import.meta.env.VITE_API_KEY_FLIRT;
    const url = import.meta.env.VITE_GENERAL_API;

    const [userData, setUserData] = useState({
        gender: 1,
        gender_search: 2,
        tag: null,
        monat: null,
        jahr: null,
        nick: null,
        pass: null,
        mail: null,
        land: null,
        plz: null,
        subid: 1,
        campaign: 10,
        transaction_id: 1,
        policy: 1,
        parametersString: [],
        clientIP: null,
        hash: null,
        fallback: 10
    })

    const [isError, setError] = useState(null)
    const [isErrorType, setErrorType] = useState(null)

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

    const handleEmailChange = (newEmail) => {

        const sanitizedValue = newEmail.replace(/[§$%()=?!]/g, '_');
        setUserData({...userData,mail:sanitizedValue})
    };

    const securePassword = (password) => {
        const salt = import.meta.env.VITE_SALT_PASSWORD;
        const combined = password + salt;
        return CryptoJS.SHA256(combined).toString(CryptoJS.enc.Hex);
    };

    const sendRequest = async () => {
        try {
            setLoadButton(true)

            let parameters = Array.from(searchParams.entries())
                .filter(([key]) => !['tag', 'monat', 'jahr', 'nick', 'clientIP', 'pass'].includes(key))
                .map(([key, value]) => {
                    if (key === 'parameter[]') {
                        const [subkey, subvalue] = value.split('|');
                        return { key: subkey, value: subvalue }; // Розбиваємо на підключі та значення
                    }
                    return { key, value };
                });

            const parsedParams = parameters.map(param => `${param.key}|${param.value}`);

            let data = {
                json: 1,
                gender: 1,
                gender_search: 2,
                tag: Number(userData?.tag) ? Number(userData?.tag) : 'undefined',
                monat: userData?.monat ? Number(userData?.monat) : 'undefined',
                jahr: Number(userData?.jahr) ? Number(userData?.jahr) : 'undefined',
                nick: userData?.nick ? userData?.nick : 'undefined',
                pass: userData?.pass ? userData?.pass : 'undefined',
                mail: userData?.mail?.toLowerCase() ? userData?.mail?.toLowerCase() : 'undefined',
                land: Number(userData?.land) ? Number(userData?.land) : 'undefined',
                clientIP: userData?.clientIP ? userData?.clientIP : 'undefined',
                plz: userData?.plz ? userData?.plz : 'undefined',
                subid: '1',
                campaign: 10,
                policy: 1,
                "parameter[]": parsedParams && parsedParams?.length ? parsedParams : [],
                ...Object.fromEntries(
                    Array.from(searchParams.entries())
                        .filter(([key]) => key !== 'tag' && key !== 'monat' && key !== 'jahr' && key !== 'nick' && key !== 'clientIP' && key !== 'pass')
                )
            };

            const paramsString = `${data.gender}${data.gender_search}${data.tag}${data.monat}${data.jahr}${data.nick}${data?.pass}${data.mail}${data.land}${data.plz}${data.subid}${data.campaign}${data["parameter[]"].join('')}`;
            const hash = CryptoJS.MD5(paramsString + api_key).toString();

            data.hash = hash;

            const formBody = Object.keys(data)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            });

            console.log(data)
            console.log(response)

            const result = await response.json();

            if (!result.success) {
                switch (result.error) {
                    case "plz":
                        setError(result.errortext);
                        setErrorType(result.error)
                        setStep(3)
                        setConfirm(false)
                        setLoading(false)
                        setLoadButton(false)
                        break;
                    case "mail":
                        setError(result.errortext);
                        setErrorType(result.error)
                        setLoadButton(false)
                        break;
                    case "nick":
                        setError(result.errortext);
                        setErrorType(result.error)
                        // console.log('Nickname error');
                        setLoadButton(false)
                        break;
                    default:
                        setError(result.errortext || 'An error occurred');
                        setErrorType(result.error)
                        setLoadButton(false)
                }
            } else {
                setLoadButton(false)
                window.location.replace(`https://flirtrakete.net/login.php?landingnick=${data?.nick}&landingpw=${data?.pass}`);
            }
        } catch (error) {
            setLoadButton(false)
            console.error('Fetch error:', error);
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
                                <input type="number" value={userData.tag || ""} onChange={(e)=>{
                                    const sanitizedValue = e.target.value.replace(/[§$%()=?!@]/g, '_').replace(/\s/g, '');
                                    setUserData({...userData, tag: sanitizedValue})
                                }} step="1" min="1" max="31" placeholder={t('input_placeholder_day')}/>
                                <input type="number" value={userData.monat || ""} onChange={(e)=>{
                                    const sanitizedValue = e.target.value.replace(/[§$%()=?!@]/g, '_').replace(/\s/g, '');
                                    setUserData({...userData, monat: sanitizedValue})
                                }} placeholder={t('input_placeholder_month')}/>
                                <input type="number" value={userData.jahr || ""} onChange={(e)=>{
                                    const sanitizedValue = e.target.value.replace(/[§$%()=?!@]/g, '_').replace(/\s/g, '');
                                    setUserData({...userData, jahr: sanitizedValue})}
                                } placeholder={t('input_placeholder_year')}/>
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
                                            setUserData({...userData, land: e.target.value})
                                            setLand(e.target.value)
                                        }}>
                                            <option value="" disabled>Land</option>
                                            <option value="105">Deutschland</option>
                                            <option value="106">Österreich</option>
                                            <option value="107">Schweiz</option>
                                        </select>
                                        <input
                                            style={isError === true|| isErrorType === 'plz' ? {borderColor: '#ef4444', borderWidth: '2px'} : {}}
                                            type="text" placeholder={t('input_placeholder_post_code')} value={userData?.plz || ""}
                                            onChange={(e) => {
                                                const sanitizedValue = e.target.value.replace(/[§$%()=?!@]/g, '_').replace(/\s/g, '');

                                                if(isErrorType === 'plz') {
                                                    setError(null)
                                                    setErrorType(null)
                                                }

                                                setUserData({...userData, plz: sanitizedValue})
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
                        <form
                            onSubmit={(e) => {
                                e.preventDefault(); // Запобігає перезавантаженню сторінки
                                nextStep() // Викликає функцію nextStep
                            }}
                        >
                            <div className="modal_content step_4">

                                <input
                                    style={!userData.nick && isError || isErrorType === 'nick' ? {
                                        borderColor: '#ef4444',
                                        borderWidth: '2px'
                                    } : {}}
                                    value={userData.nick || ""}
                                    onChange={(e) => {
                                        const sanitizedValue = e.target.value.replace(/[§$%()=?!@]/g, '_').replace(/\s/g, '');

                                        if (isErrorType === 'nick') {
                                            setError(null);
                                            setErrorType(null);
                                        }
                                        setUserData({...userData, nick: sanitizedValue});
                                    }}
                                    type="text"
                                    placeholder={t('input_placeholder_nick')}
                                    autoComplete="username"
                                />

                                {/*<input style={!userData.pass && isError ? {*/}
                                {/*    borderColor: '#ef4444',*/}
                                {/*    borderWidth: '2px'*/}
                                {/*} : {}} value={userData.pass}*/}
                                {/*       onChange={(e) => {*/}
                                {/*           setUserData({...userData, pass: e.target.value})*/}
                                {/*       }} type="password" placeholder={t('input_placeholder_password')*/}
                                {/*}/>*/}
                                <input
                                    style={!userData.pass && isError ? {
                                        borderColor: '#ef4444',
                                        borderWidth: '2px'
                                    } : {}}
                                    value={userData.pass || ""}
                                    onChange={(e) => {
                                        const sanitizedValue = e.target.value.replace(/[§$%()=?!@]/g, '_').replace(/\s/g, '');

                                        setUserData({...userData, pass: sanitizedValue})
                                    }}
                                    type="password"
                                    placeholder={t('input_placeholder_password')}
                                    autoComplete="current-password"
                                />


                                <p>{t('modal_p_1_step_4')}</p>

                                <EmailAutofill
                                    value={userData?.mail}
                                    onChange={handleEmailChange}
                                    // domains={["gmail.com", "hotmail.com", "customdomain.com"]}
                                />

                                <button className={isLoadButton ? 'load' : ''} type="submit">

                                    {t('modal_button_step_4')}</button>

                                {isError !== null &&
                                    <div className="warning">{isError}</div>
                                }

                                <span className="step">{isStepInfo}</span>
                            </div>
                        </form>
                    </>
                }
            </div>
        </div>
    );
};

export default Modal;
