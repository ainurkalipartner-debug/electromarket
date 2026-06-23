import { useSeo } from '../hooks/useSeo';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import CtaBanner from '../components/home/CtaBanner';
import styles from './About.module.scss';

const ITEMS = [
  { icon: '🚚', title: 'Доставка по всему Казахстану', text: 'Организуем доставку оборудования в любой регион республики.' },
  { icon: '🏢', title: 'Юридические и физические лица', text: 'Работаем как с компаниями, так и с частными заказчиками.' },
  { icon: '💳', title: 'Безналичный расчёт', text: 'Принимаем оплату по безналичному расчёту с предоставлением документов.' },
  { icon: '⏱️', title: 'Оперативная логистика', text: 'Сообщаем сроки поставки заранее и сопровождаем груз до получения.' },
];

export default function Delivery() {
  useSeo({
    title: 'Доставка и оплата',
    description: 'Доставка по всему Казахстану, работа с юридическими и физическими лицами, безналичный расчёт.',
    canonical: 'https://electromarket.kz/delivery',
  });

  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerInner}>
          <Breadcrumbs items={[{ label: 'Доставка и оплата' }]} />
          <h1 className={styles.bannerTitle}>Доставка и оплата</h1>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.grid} style={{ gridTemplateColumns: '1fr' }}>
          {ITEMS.map((item) => (
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
