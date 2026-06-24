import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ru from './translations/ru';
import kk from './translations/kk';

const DICTS = { ru, kk };
const STORAGE_KEY = 'electromarket.lang';

const LanguageContext = createContext(null);

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'kk' ? 'kk' : 'ru';
  } catch {
    return 'ru';
  }
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined), obj);
}

function interpolate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => readStoredLang());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage unavailable — language choice just won't persist across reloads
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next === 'kk' ? 'kk' : 'ru');
  }, []);

  const t = useCallback(
    (key, vars) => {
      const value = getByPath(DICTS[lang], key) ?? getByPath(DICTS.ru, key);
      if (value === undefined) return key;
      return typeof value === 'string' ? interpolate(value, vars) : value;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
}
