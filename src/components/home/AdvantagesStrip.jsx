import styles from './AdvantagesStrip.module.scss';

const ITEMS = [
  { icon: '🛡️', title: 'Гарантия качества', text: 'Вся продукция сертифицирована и поставляется с гарантией производителя.' },
  { icon: '🚚', title: 'Доставка по Казахстану', text: 'Организуем оперативную доставку в любой регион РК.' },
  { icon: '⚙️', title: 'Техническая поддержка', text: 'Помогаем с подбором оборудования и консультируем по характеристикам.' },
  { icon: '📋', title: 'Индивидуальные решения', text: 'Подбираем комплектацию и готовим КП под требования вашего проекта.' },
];

export default function AdvantagesStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {ITEMS.map((item) => (
          <div key={item.title} className={styles.card}>
            <span className={styles.icon} aria-hidden="true">{item.icon}</span>
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
