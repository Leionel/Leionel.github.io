import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextValue {
  language: Language;
  isZh: boolean;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('site-language');
    return saved === 'en' ? 'en' : 'zh';
  });

  useEffect(() => {
    localStorage.setItem('site-language', language);
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      isZh: language === 'zh',
      toggleLanguage: () => setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh')),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
