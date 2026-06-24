import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './CategoryNav.module.scss';

export default function CategoryNav() {
  const { t } = useTranslation();

  function renderLink(category, duplicate) {
    return (
      <NavLink
        key={duplicate ? `${category.slug}-dup` : category.slug}
        to={`/catalog/${category.slug}`}
        className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
        aria-hidden={duplicate ? 'true' : undefined}
        tabIndex={duplicate ? -1 : undefined}
      >
        {t(`categories.${category.slug}.name`)}
      </NavLink>
    );
  }

  return (
    <nav className={styles.nav} aria-label={t('categoryNav.ariaLabel')}>
      <div className={styles.inner}>
        <NavLink to="/catalog" className={styles.allLink}>
          {t('categoryNav.allLink')}
        </NavLink>

        {/* Fixed-size clipping window for the auto-scrolling category ticker —
            only this part moves; "Каталог товаров" above stays put. */}
        <div className={styles.viewport}>
          <div className={styles.track}>
            {CATEGORIES.map((category) => renderLink(category, false))}
            {/* Duplicate set closes the loop seamlessly; hidden from a11y tree
                and keyboard tab order since it's a visual-only repeat. */}
            {CATEGORIES.map((category) => renderLink(category, true))}
          </div>
        </div>
      </div>
    </nav>
  );
}
