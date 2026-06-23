import SectionHeading from '../ui/SectionHeading';
import styles from './WhyUs.module.scss';

const PRINCIPLES = [
  {
    icon: '🤝',
    title: 'Работаем с юридическими и физическими лицами',
    text: 'Безналичный расчёт, документы для бухгалтерии и сопровождение сделки на каждом этапе.',
  },
  {
    icon: '🔁',
    title: 'Подбираем аналоги',
    text: 'Если нужной позиции нет в наличии у поставщика — предложим равноценный аналог по характеристикам.',
  },
  {
    icon: '🕒',
    title: 'Прозрачные сроки',
    text: 'Сообщаем ориентировочный срок поставки по каждой позиции до оформления заказа.',
  },
  {
    icon: '🧾',
    title: 'КП по списку или спецификации',
    text: 'Принимаем список оборудования в любом виде — текстом, файлом или фото — и готовим расчёт.',
  },
];

export default function WhyUs() {
  return (
    <section className={styles.section}>
      <SectionHeading title="Принципы работы с клиентами" subtitle="То, на что вы можете рассчитывать при обращении к нам" />
      <div className={styles.grid}>
        {PRINCIPLES.map((item) => (
          <div key={item.title} className={styles.item}>
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
