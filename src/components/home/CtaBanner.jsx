import { Link } from 'react-router-dom';
import { SITE } from '../../data/siteConfig';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './CtaBanner.module.scss';

export default function CtaBanner() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div>
          <h2 className={styles.title}>{t('home.cta.title')}</h2>
          <p className={styles.text}>{t('home.cta.text')}</p>
        </div>
        <div className={styles.actions}>
          <Link to="/request-quote" className="btn btn-amber">{t('common.requestQuote')}</Link>
          <a
            className="btn btn-whatsapp"
            href={`https://wa.me/${SITE.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('common.writeWhatsapp')}
          </a>
        </div>
      </div>
    </section>
  );
}
