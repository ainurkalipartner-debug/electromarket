import { useSeo } from '../hooks/useSeo';
import { useTranslation } from '../i18n/LanguageContext';
import { CATEGORIES } from '../data/categories';
import CategoryCard from '../components/catalog/CategoryCard';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import styles from './Catalog.module.scss';

export default function Catalog() {
  const { t } = useTranslation();

  useSeo({
    title: 'Каталог электрооборудования',
    description: 'Полный каталог категорий: изоляторы, оборудование 10 кВ, трансформаторы, щитовое оборудование, автоматика, кабельная арматура и другое.',
    canonical: 'https://electromarket.kz/catalog',
  });

  return (
    <section className={styles.section}>
      <Breadcrumbs items={[{ label: t('catalog.breadcrumb') }]} />
      <div className={styles.grid}>
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}
