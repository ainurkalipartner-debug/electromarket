import { Link } from 'react-router-dom';
import { getManufacturer } from '../../data/manufacturers';
import styles from './ManufacturerBadge.module.scss';

export default function ManufacturerBadge({ slug, linkTo = true }) {
  const manufacturer = getManufacturer(slug);
  if (!manufacturer) return null;

  const variant = slug.length % 2 === 0 ? styles.amber : '';
  const content = <span className={`${styles.badge} ${variant}`}>{manufacturer.name}</span>;

  if (!linkTo) return content;

  return <Link to={`/manufacturers/${slug}`}>{content}</Link>;
}
