import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import it from './locales/it.json';
import enGB from './locales/en-GB.json';
import enUS from './locales/en-US.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';

const resources = {
  it: { translation: it },
  'en-GB': { translation: enGB },
  'en-US': { translation: enUS },
  es: { translation: es },
  de: { translation: de },
  fr: { translation: fr },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US',
    supportedLngs: ['it', 'en-GB', 'en-US', 'es', 'de', 'fr'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'multimdreader-language',
    },
  });

export default i18n;
