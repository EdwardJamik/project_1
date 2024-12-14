import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '/';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['de', 'en', 'dk'],
        fallbackLng: 'de',
        debug: false,
        detection: {
            order: ['queryString', 'cookie', 'navigator'],
            cache: ['cookie']
        },
        backend: {
            loadPath: `${basePath ? `${basePath}/` : ''}/locales/{{lng}}/{{ns}}.json`
        },
        react: {
            useSuspense: true,
        },
    });

export default i18n;