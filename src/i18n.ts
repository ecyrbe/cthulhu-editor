import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationFR from "./translations/fr/translation.json";
import skillsFR from "./translations/fr/skills.json";
import translationEN from "./translations/en/translation.json";
import skillsEN from "./translations/en/skills.json";
import translationES from "./translations/es/translation.json";
import skillsES from "./translations/es/skills.json";
import translationDE from "./translations/de/translation.json";
import skillsDE from "./translations/de/skills.json";
import translationPT from "./translations/pt/translation.json";
import skillsPT from "./translations/pt/skills.json";

const resources = {
  fr: {
    translation: translationFR,
    skills: skillsFR,
  },
  en: {
    translation: translationEN,
    skills: skillsEN,
  },
  es: {
    translation: translationES,
    skills: skillsES,
  },
  de: {
    translation: translationDE,
    skills: skillsDE,
  },
  pt: {
    translation: translationPT,
    skills: skillsPT,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
