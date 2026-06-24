import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './CategoryNav.module.scss';

export default function CategoryNav() {
  const { t } = useTranslation();

  return (
    <nav className={styles.nav} aria-label={t('categoryNav.ariaLabel')}>
      <div className={styles.inner}>
        <NavLink to="/catalog" className={styles.allLink}>
          {t('categoryNav.allLink')}
        </NavLink>
        {CATEGORIES.map((category) => (
          <NavLink
            key={category.slug}
            to={`/catalog/${category.slug}`}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
          >
            {t(`categories.${category.slug}.name`)}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
