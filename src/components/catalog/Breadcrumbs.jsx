import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './Breadcrumbs.module.scss';

export default function Breadcrumbs({ items, variant = 'light' }) {
  const { t } = useTranslation();
  const variantClass = variant === 'dark' ? styles.dark : styles.light;

  return (
    <nav className={`${styles.list} ${variantClass}`} aria-label={t('breadcrumbs.ariaLabel')}>
      <Link to="/">{t('common.home')}</Link>
      {items.map((item, idx) => (
        <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span aria-hidden="true">/</span>
          {item.href && idx !== items.length - 1 ? (
            <Link to={item.href}>{item.label}</Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
