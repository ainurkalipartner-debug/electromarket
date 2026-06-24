import { useSeo } from '../hooks/useSeo';
import { SITE } from '../data/siteConfig';
import { useTranslation } from '../i18n/LanguageContext';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import ConsultationForm from '../components/forms/ConsultationForm';
import styles from './Contacts.module.scss';

export default function Contacts() {
  const { t } = useTranslation();

  useSeo({
    title: 'Контакты',
    description: `Адрес: ${SITE.address}. Телефон: ${SITE.phone}.`,
    canonical: 'https://electromarket.kz/contacts',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: SITE.name,
      telephone: SITE.phone,
      address: { '@type': 'PostalAddress', streetAddress: SITE.address, addressCountry: 'KZ' },
    },
  });

  return (
    <div className={styles.wrap}>
      <Breadcrumbs items={[{ label: t('contacts.breadcrumb') }]} />
      <h1 className={styles.title}>{t('contacts.title')}</h1>

      <div className={styles.grid}>
        <div>
          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <div>
                <div className={styles.infoLabel}>{t('contacts.addressLabel')}</div>
                <div>{SITE.address}</div>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div>
                <div className={styles.infoLabel}>{t('contacts.phoneLabel')}</div>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div>
                <div className={styles.infoLabel}>{t('contacts.emailLabel')}</div>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div>
                <div className={styles.infoLabel}>{t('contacts.hoursLabel')}</div>
                <div>{t('footer.workHours')}</div>
              </div>
            </div>
            <a
              className="btn btn-whatsapp btn-block"
              style={{ marginTop: 12 }}
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('common.writeWhatsapp')}
            </a>
          </div>

          <iframe
            className={styles.map}
            title={t('contacts.mapTitle')}
            src="https://yandex.ru/map-widget/v1/?text=Атырау%2C%20улица%20Сырым%20Датов%2C%20107"
            loading="lazy"
          />
        </div>

        <div className={styles.formCard}>
          <ConsultationForm />
        </div>
      </div>
    </div>
  );
}
