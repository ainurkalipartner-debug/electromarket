import { useTranslation } from '../../i18n/LanguageContext';
import SectionHeading from '../ui/SectionHeading';
import styles from './ServicesTeaser.module.scss';

export default function ServicesTeaser() {
  const { t } = useTranslation();
  const services = t('servicesList');

  return (
    <section className={styles.section}>
      <SectionHeading title={t('home.servicesTeaser.title')} subtitle={t('home.servicesTeaser.subtitle')} linkTo="/services" />
      <div className={styles.grid}>
        {services.map((service) => (
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
