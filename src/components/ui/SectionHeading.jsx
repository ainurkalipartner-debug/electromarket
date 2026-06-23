import { Link } from 'react-router-dom';
import styles from './SectionHeading.module.scss';

export default function SectionHeading({ title, subtitle, linkTo, linkLabel }) {
  return (
    <div className={styles.wrap}>
      <div>
        <h2 className={styles.title}>
          <span className={styles.bar} aria-hidden="true" />
          {title}
        </h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className={styles.link}>
          {linkLabel || 'Смотреть всё'} →
        </Link>
      )}
    </div>
  );
}
