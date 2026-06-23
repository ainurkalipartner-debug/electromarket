import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/catalog/${category.slug}`} className={styles.card}>
      {category.image ? (
        <img className={styles.image} src={category.image} alt={category.name} loading="lazy" />
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
      <div className={styles.overlay}>
        <div className={styles.name}>{category.name}</div>
        <div className={styles.count}>
          {category.productCount > 0 ? `${category.productCount} позиций` : 'Под заказ'}
        </div>
      </div>
    </Link>
  );
}
