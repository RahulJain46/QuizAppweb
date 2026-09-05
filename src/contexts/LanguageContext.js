import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('hi'); // default to Hindi

  useEffect(() => {
    const savedLang = localStorage.getItem('jindarshan_lang');
    if (savedLang === 'hi' || savedLang === 'en') {
      setLang(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => {
      const newLang = prev === 'hi' ? 'en' : 'hi';
      localStorage.setItem('jindarshan_lang', newLang);
      return newLang;
    });
  };

  // Helper function to return translation based on current language
  const t = (hiText, enText) => {
    return lang === 'hi' ? hiText : enText;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
