import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'tam'],
    // lng: document.querySelector("html").lang, // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    detection: {
        order: ['cookie', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain'],
        caches: ['cookie', 'localStorage', 'sessionStorage']
    },

    backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json'
    },

    react: {
        useSuspense: false
    }
  });
