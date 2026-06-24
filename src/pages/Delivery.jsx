import { useSeo } from '../hooks/useSeo';
import { useTranslation } from '../i18n/LanguageContext';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import CtaBanner from '../components/home/CtaBanner';
import styles from './About.module.scss';

const ICONS = ['🚚', '🏢', '💳', '⏱️'];

export default function Delivery() {
  const { t } = useTranslation();
  const items = [1, 2, 3, 4].map((n, idx) => ({
    icon: ICONS[idx],
    title: t(`delivery.item${n}Title`),
    text: t(`delivery.item${n}Text`),
  }));

  useSeo({
    title: 'Доставка и оплата',
    description: 'Доставка по всему Казахстану, работа с юридическими и физическими лицами, безналичный расчёт.',
    canonical: 'https://electromarket.kz/delivery',
  });

  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerInner}>
          <Breadcrumbs variant="dark" items={[{ label: t('delivery.breadcrumb') }]} />
          <h1 className={styles.bannerTitle}>{t('delivery.bannerTitle')}</h1>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.grid} style={{ gridTemplateColumns: '1fr' }}>
          {items.map((item) => (
            <div key={item.title} className={styles.item} style={{ alignItems: 'flex-start', fontWeight: 400 }}>
              <span style={{ fontSize: 22 }} aria-hidden="true">{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#0f1b2a', marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#51647a', fontWeight: 400 }}>{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
