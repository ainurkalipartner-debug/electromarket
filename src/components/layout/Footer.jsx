import { Link } from 'react-router-dom';
import { SITE } from '../../data/siteConfig';
import { CATEGORIES } from '../../data/categories';
import { useTranslation } from '../../i18n/LanguageContext';
import logo from '../../assets/logo/logo.jpeg';
import styles from './Footer.module.scss';

const topCategories = CATEGORIES.slice(0, 7);

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandBlock}>
          <div className={styles.brandHeader}>
            <img className={styles.logoImg} src={logo} alt={SITE.name} />
            <div className={styles.heading} style={{ marginBottom: 0 }}>{SITE.name}</div>
          </div>
          <p>{t('footer.description')}</p>
          <a
            className={`btn btn-whatsapp btn-sm ${styles.waButton}`}
            href={`https://wa.me/${SITE.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('common.writeWhatsapp')}
          </a>
        </div>

        <div>
          <div className={styles.heading}>{t('footer.catalogHeading')}</div>
          <nav className={styles.list}>
            {topCategories.map((c) => (
              <Link key={c.slug} to={`/catalog/${c.slug}`}>
                {t(`categories.${c.slug}.name`)}
              </Link>
            ))}
            <Link to="/catalog">{t('footer.allCategories')}</Link>
          </nav>
        </div>

        <div>
          <div className={styles.heading}>{t('footer.companyHeading')}</div>
          <nav className={styles.list}>
            <Link to="/about">{t('footer.about')}</Link>
            <Link to="/services">{t('footer.services')}</Link>
            <Link to="/projects">{t('footer.projects')}</Link>
            <Link to="/manufacturers">{t('footer.manufacturers')}</Link>
            <Link to="/delivery">{t('footer.delivery')}</Link>
            <Link to="/contacts">{t('footer.contacts')}</Link>
          </nav>
        </div>

        <div>
          <div className={styles.heading}>{t('footer.contactsHeading')}</div>
          <div className={styles.contactItem}>
            <span aria-hidden="true">📍</span>
            <span>{SITE.address}</span>
          </div>
          <div className={styles.contactItem}>
            <span aria-hidden="true">📞</span>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </div>
          <div className={styles.contactItem}>
            <span aria-hidden="true">✉️</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className={styles.contactItem}>
            <span aria-hidden="true">🕒</span>
            <span>{t('footer.workHours')}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>{t('footer.copyright', { year, name: SITE.name })}</span>
          <span>{t('footer.priceNote')}</span>
        </div>
      </div>
    </footer>
  );
}
