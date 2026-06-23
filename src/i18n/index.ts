import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('multimdreader-language') || 'en-US',
    fallbackLng: 'en-US',
    supportedLngs: ['it', 'en-GB', 'en-US', 'es', 'de', 'fr'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
