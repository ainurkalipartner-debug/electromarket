import { SITE } from '../../data/siteConfig';
import styles from './TopBar.module.scss';

export default function TopBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.item}>
            <span className={styles.icon} aria-hidden="true">📍</span>
            {SITE.address}
          </span>
          <span className={styles.item}>
            <span className={styles.icon} aria-hidden="true">📞</span>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </span>
        </div>
        <div className={styles.right}>
          <span className={styles.item}>
            <span className={styles.icon} aria-hidden="true">🚚</span>
            Доставка по всему Казахстану
          </span>
          <span className={styles.item}>
            <span className={styles.icon} aria-hidden="true">🛡️</span>
            Гарантия качества
          </span>
          <span className={styles.item}>
            <span className={styles.icon} aria-hidden="true">⚙️</span>
            Техническая поддержка
          </span>
        </div>
      </div>
    </div>
  );
}
