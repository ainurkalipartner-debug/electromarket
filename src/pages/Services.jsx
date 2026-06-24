import { useSeo } from '../hooks/useSeo';
import { useTranslation } from '../i18n/LanguageContext';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import CtaBanner from '../components/home/CtaBanner';
import styles from './Services.module.scss';

export default function Services() {
  const { t } = useTranslation();
  const services = t('servicesList');

  useSeo({
    title: 'Услуги',
    description: 'Комплектация объектов, подбор оборудования, технические консультации, подготовка КП, поставка и логистика по Казахстану.',
    canonical: 'https://electromarket.kz/services',
  });

  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerInner}>
          <Breadcrumbs variant="dark" items={[{ label: t('services.breadcrumb') }]} />
          <h1 className={styles.bannerTitle}>{t('services.bannerTitle')}</h1>
          <p className={styles.bannerText}>{t('services.bannerText')}</p>
        </div>
      </div>

      <section className={styles.section}>
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

      <CtaBanner />
    </div>
  );
}
