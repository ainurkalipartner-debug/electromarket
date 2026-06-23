import { SERVICES } from '../../data/servicesContent';
import SectionHeading from '../ui/SectionHeading';
import styles from './ServicesTeaser.module.scss';

export default function ServicesTeaser() {
  return (
    <section className={styles.section}>
      <SectionHeading title="Услуги" subtitle="Сопровождаем проект от подбора оборудования до поставки" linkTo="/services" />
      <div className={styles.grid}>
        {SERVICES.map((service) => (
          <div key={service.title} className={styles.card}>
            <div className={styles.icon} aria-hidden="true">{service.icon}</div>
            <div className={styles.title}>{service.title}</div>
            <div className={styles.text}>{service.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
