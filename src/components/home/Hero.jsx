import { Link } from 'react-router-dom';
import { getCategory } from '../../data/categories';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './Hero.module.scss';

export default function Hero() {
  const { t } = useTranslation();
  const isolators = getCategory('izolyatory-i-vysokovoltnaya-armatura');
  const grounding = getCategory('zazemlenie-i-molniezashchita');
  const automation = getCategory('avtomatika-i-zashchita');

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>{t('home.hero.eyebrow')}</span>
          <h1 className={styles.title}>{t('home.hero.title')}</h1>
          <p className={styles.subtitle}>{t('home.hero.subtitle')}</p>
          <div className={styles.actions}>
            <Link to="/catalog" className="btn btn-amber">{t('home.hero.goToCatalog')}</Link>
            <Link to="/request-quote" className="btn btn-outline">{t('home.hero.getConsultation')}</Link>
            <Link to="/request-quote?tab=spec" className="btn btn-outline">{t('home.hero.sendSpec')}</Link>
          </div>
        </div>

        <div className={styles.gallery}>
          {isolators?.image && (
            <div className={styles.tile}>
              <img src={isolators.image} alt={t(`categories.${isolators.slug}.name`)} />
            </div>
          )}
          {grounding?.image && (
            <div className={styles.tile}>
              <img src={grounding.image} alt={t(`categories.${grounding.slug}.name`)} />
            </div>
          )}
          {automation?.image && (
            <div className={`${styles.tile} ${styles.tileWide}`}>
              <img src={automation.image} alt={t(`categories.${automation.slug}.name`)} />
            </div>
          )}
        </div>

        <div className={styles.statsStrip}>
          <div className={styles.stat}>
            <span className={styles.statIcon} aria-hidden="true">🛡️</span>
            <div>
              <div className={styles.statTitle}>{t('home.hero.statReliabilityTitle')}</div>
              <div className={styles.statText}>{t('home.hero.statReliabilityText')}</div>
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon} aria-hidden="true">✅</span>
            <div>
              <div className={styles.statTitle}>{t('home.hero.statQualityTitle')}</div>
              <div className={styles.statText}>{t('home.hero.statQualityText')}</div>
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon} aria-hidden="true">⚙️</span>
            <div>
              <div className={styles.statTitle}>{t('home.hero.statSupportTitle')}</div>
              <div className={styles.statText}>{t('home.hero.statSupportText')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
