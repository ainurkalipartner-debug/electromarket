import { useTranslation } from '../../i18n/LanguageContext';
import SectionHeading from '../ui/SectionHeading';
import styles from './WhyUs.module.scss';

const ICONS = ['🤝', '🔁', '🕒', '🧾'];

export default function WhyUs() {
  const { t } = useTranslation();
  const items = t('home.whyUs.items');

  return (
    <section className={styles.section}>
      <SectionHeading title={t('home.whyUs.title')} subtitle={t('home.whyUs.subtitle')} />
      <div className={styles.grid}>
        {items.map((item, idx) => (
          <div key={item.title} className={styles.item}>
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
