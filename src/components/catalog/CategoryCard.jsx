import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './CategoryCard.module.scss';

export default function CategoryCard({ category }) {
  const { t } = useTranslation();
  const name = t(`categories.${category.slug}.name`);

  return (
    <Link to={`/catalog/${category.slug}`} className={styles.card}>
      {category.image ? (
        <img className={styles.image} src={category.image} alt={name} loading="lazy" />
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
      <div className={styles.overlay}>
        <div className={styles.name}>{name}</div>
        <div className={styles.count}>
          {category.productCount > 0 ? t('common.positionsCount', { count: category.productCount }) : t('common.orderStatus')}
        </div>
      </div>
    </Link>
  );
}
