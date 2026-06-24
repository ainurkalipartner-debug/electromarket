import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './ProjectsTeaser.module.scss';

export default function ProjectsTeaser() {
  const { t } = useTranslation();
  const directions = t('projectDirections');

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>
            <h2 className={styles.title}>{t('home.projectsTeaser.title')}</h2>
            <p className={styles.subtitle}>{t('home.projectsTeaser.subtitle')}</p>
          </div>
          <Link to="/projects" className={styles.link}>{t('home.projectsTeaser.link')}</Link>
        </div>
        <div className={styles.grid}>
          {directions.map((item) => (
            <div key={item.title} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">{item.icon}</div>
              <div className={styles.cardTitle}>{item.title}</div>
              <div className={styles.cardText}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
