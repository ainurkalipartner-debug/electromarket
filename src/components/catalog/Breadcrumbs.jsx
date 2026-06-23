import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export default function Breadcrumbs({ items }) {
  return (
    <nav className={styles.list} aria-label="Хлебные крошки">
      <Link to="/">Главная</Link>
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
