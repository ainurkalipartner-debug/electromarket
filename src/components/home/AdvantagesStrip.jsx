import { useTranslation } from '../../i18n/LanguageContext';
import styles from './AdvantagesStrip.module.scss';

const ICONS = ['🛡️', '🚚', '⚙️', '📋'];

export default function AdvantagesStrip() {
  const { t } = useTranslation();
  const items = t('home.advantages');

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {items.map((item, idx) => (
          <div key={item.title} className={styles.card}>
            <span className={styles.icon} aria-hidden="true">{ICONS[idx]}</span>
            <div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.text}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
