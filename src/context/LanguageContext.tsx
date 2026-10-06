import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, type Language, type TranslationType } from '../translations/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'aimapping_lang';

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    // 1. Highest priority: URL query param (essential for SEO hreflang / bots / direct links)
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang')?.toLowerCase();
    if (urlLang === 'en' || urlLang === 'es') {
      return urlLang;
    }

    // 2. Second priority: Local storage for returning user preference
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') {
      return saved;
    }
  }
  return 'es';
}

function updateUrlForLanguage(lang: Language) {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  if (lang === 'en') {
    url.searchParams.set('lang', 'en');
  } else {
    url.searchParams.delete('lang');
  }

  // Update URL without triggering a full page reload
  if (url.toString() !== window.location.href) {
    window.history.replaceState({}, '', url.toString());
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
      updateUrlForLanguage(lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const nextLang = language === 'es' ? 'en' : 'es';
    setLanguage(nextLang);
  }, [language, setLanguage]);

  // Sync state if user navigates back/forward in browser history
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang')?.toLowerCase();
      if (urlLang === 'en' || urlLang === 'es') {
        setLanguageState(urlLang);
        localStorage.setItem(STORAGE_KEY, urlLang);
      } else {
        const saved = localStorage.getItem(STORAGE_KEY);
        setLanguageState(saved === 'en' ? 'en' : 'es');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update HTML lang attribute and dynamic SEO meta tags on language change
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;

      if (language === 'en') {
        document.title = 'AiMapping — B2B Geospatial Solution & Intelligent Asset Surveying';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'We transform road survey imagery into identified and georeferenced assets using Artificial Intelligence, ready for GIS and CAD. B2B solution for telecom, municipalities, energy, and road infrastructure.'
          );
        }
      } else {
        document.title = 'Relevamiento de infraestructura con IA | AiMapping';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'Transforma imágenes del relevamiento en activos de infraestructura identificados y georreferenciados con IA, listos para usar en GIS y CAD.'
          );
        }
      }
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language] as unknown as TranslationType,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
