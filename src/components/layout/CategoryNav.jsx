import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import styles from './CategoryNav.module.scss';

export default function CategoryNav() {
  return (
    <nav className={styles.nav} aria-label="Категории каталога">
      <div className={styles.inner}>
        <NavLink to="/catalog" className={styles.allLink}>
          ☰ Каталог товаров
        </NavLink>
        {CATEGORIES.map((category) => (
          <NavLink
            key={category.slug}
            to={`/catalog/${category.slug}`}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
