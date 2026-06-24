import { Link } from 'react-router-dom';
import { getManufacturer } from '../../data/manufacturers';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './ManufacturerBadge.module.scss';

export default function ManufacturerBadge({ slug, linkTo = true }) {
  const manufacturer = getManufacturer(slug);
  const { t } = useTranslation();
  if (!manufacturer) return null;

  const name = slug === 'involt-production' ? t('common.manufacturerOwnProduction') : manufacturer.name;
  const variant = slug.length % 2 === 0 ? styles.amber : '';
  const content = <span className={`${styles.badge} ${variant}`}>{name}</span>;

  if (!linkTo) return content;

  return <Link to={`/manufacturers/${slug}`}>{content}</Link>;
}
