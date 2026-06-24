import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { MANUFACTURERS } from '../data/manufacturers';
import { useTranslation } from '../i18n/LanguageContext';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import styles from './Manufacturers.module.scss';

export default function Manufacturers() {
  const { t } = useTranslation();

  useSeo({
    title: 'Производители',
    description: 'Бренды и производители электрооборудования, представленные в каталоге ЭЛЕКТРОМАРКЕТ.',
    canonical: 'https://electromarket.kz/manufacturers',
  });

  return (
    <div className={styles.wrap}>
      <Breadcrumbs items={[{ label: t('manufacturers.breadcrumb') }]} />
      <p className={styles.intro}>{t('manufacturers.intro')}</p>
      <div className={styles.grid}>
        {MANUFACTURERS.map((m) => (
          <Link key={m.slug} to={`/manufacturers/${m.slug}`} className={styles.card}>
            <div>
              <div className={styles.name}>{m.slug === 'involt-production' ? t('common.manufacturerOwnProduction') : m.name}</div>
              <div className={styles.count}>{t('manufacturers.positionsInCatalog', { count: m.productCount })}</div>
            </div>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
