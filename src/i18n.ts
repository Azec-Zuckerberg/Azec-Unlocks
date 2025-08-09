import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fr from './locales/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr }
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

// Add logic to force French if user is in France
const userLang = navigator.language || navigator.languages[0] || '';
if (userLang.toLowerCase().startsWith('fr') || userLang.toLowerCase().endsWith('-fr')) {
  i18n.changeLanguage('fr');
}

export default i18n; 