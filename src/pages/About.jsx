import { useSeo } from '../hooks/useSeo';
import { SITE } from '../data/siteConfig';
import { useTranslation } from '../i18n/LanguageContext';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import CtaBanner from '../components/home/CtaBanner';
import styles from './About.module.scss';

export default function About() {
  const { t } = useTranslation();

  useSeo({
    title: 'О компании',
    description: 'ЭЛЕКТРОМАРКЕТ — поставка электрооборудования 0,4–10 кВ в Атырау и по всему Казахстану.',
    canonical: 'https://electromarket.kz/about',
  });

  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerInner}>
          <Breadcrumbs variant="dark" items={[{ label: t('about.breadcrumb') }]} />
          <h1 className={styles.bannerTitle}>{t('about.bannerTitle')}</h1>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.heading}>{t('about.whoWeAreHeading')}</h2>
        <p className={styles.text}>{t('about.whoWeAreText', { name: SITE.name, slogan: t('common.slogan') })}</p>

        <h2 className={styles.heading}>{t('about.missionHeading')}</h2>
        <p className={styles.text}>{t('about.missionText')}</p>

        <h2 className={styles.heading}>{t('about.advantagesHeading')}</h2>
        <div className={styles.grid}>
          <div className={styles.item}>{t('about.advantage1')}</div>
          <div className={styles.item}>{t('about.advantage2')}</div>
          <div className={styles.item}>{t('about.advantage3')}</div>
          <div className={styles.item}>{t('about.advantage4')}</div>
        </div>

        <h2 className={styles.heading} style={{ marginTop: 24 }}>{t('about.geographyHeading')}</h2>
        <p className={styles.text}>{t('about.geographyText')}</p>
      </section>

      <CtaBanner />
    </div>
  );
}
