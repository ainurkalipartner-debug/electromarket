import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './SearchBar.module.scss';

export default function SearchBar({ placeholder, className }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') || '');
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    const q = value.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  }

  return (
    <form className={[styles.form, className].filter(Boolean).join(' ')} onSubmit={handleSubmit} role="search">
      <input
        className={styles.input}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || t('header.searchPlaceholder')}
        aria-label={t('header.searchAriaLabel')}
      />
      <button className={styles.button} type="submit" aria-label={t('header.findButton')}>
        🔍
      </button>
    </form>
  );
}
