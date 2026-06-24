import { useSeo } from '../hooks/useSeo';
import { useTranslation } from '../i18n/LanguageContext';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import SectionHeading from '../components/ui/SectionHeading';
import CtaBanner from '../components/home/CtaBanner';
import styles from './Projects.module.scss';

export default function Projects() {
  const { t } = useTranslation();
  const directions = t('projectDirections');
  const steps = t('projectSteps');

  useSeo({
    title: 'Проекты',
    description: 'Направления и подход к работе с проектами по комплектации электрооборудования.',
    canonical: 'https://electromarket.kz/projects',
  });

  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerInner}>
          <Breadcrumbs variant="dark" items={[{ label: t('projects.breadcrumb') }]} />
          <h1 className={styles.bannerTitle}>{t('projects.bannerTitle')}</h1>
          <p className={styles.bannerText}>{t('projects.bannerText')}</p>
        </div>
      </div>

      <section className={styles.section}>
        <SectionHeading title={t('projects.directionsTitle')} subtitle={t('projects.directionsSubtitle')} />
        <div className={styles.grid}>
          {directions.map((item) => (
            <div key={item.title} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">{item.icon}</div>
              <div className={styles.cardTitle}>{item.title}</div>
              <div className={styles.cardText}>{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading title={t('projects.howWeWork')} />
        <div className={styles.steps}>
          {steps.map((step, idx) => (
            <div key={step.title} className={styles.step}>
              <div className={styles.stepNumber}>{idx + 1}</div>
              <div className={styles.stepTitle}>{step.title}</div>
              <div className={styles.stepText}>{step.text}</div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
