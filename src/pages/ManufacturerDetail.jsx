import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { getManufacturer } from '../data/manufacturers';
import { getSearchIndex } from '../data/products';
import { useTranslation } from '../i18n/LanguageContext';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import ProductCard from '../components/catalog/ProductCard';
import Pagination from '../components/catalog/Pagination';
import styles from './Search.module.scss';

const PAGE_SIZE = 24;

export default function ManufacturerDetail() {
  const { manufacturerSlug } = useParams();
  const manufacturer = getManufacturer(manufacturerSlug);
  const [index, setIndex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { t } = useTranslation();

  useEffect(() => {
    let cancelled = false;
    getSearchIndex().then((data) => {
      if (!cancelled) {
        setIndex(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const products = useMemo(() => index.filter((p) => p.manufacturerSlug === manufacturerSlug), [index, manufacturerSlug]);

  useSeo({
    title: manufacturer?.name,
    description: manufacturer ? `Каталог продукции производителя ${manufacturer.name} — ${manufacturer.productCount} позиций.` : undefined,
    canonical: manufacturer ? `https://electromarket.kz/manufacturers/${manufacturer.slug}` : undefined,
  });

  if (!manufacturer) return <Navigate to="/manufacturers" replace />;

  const name = manufacturer.slug === 'involt-production' ? t('common.manufacturerOwnProduction') : manufacturer.name;
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const pageItems = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className={styles.wrap}>
      <Breadcrumbs items={[{ label: t('manufacturers.breadcrumb'), href: '/manufacturers' }, { label: name }]} />
      <h1 style={{ marginBottom: 8 }}>{name}</h1>
      <div className={styles.resultCount}>{t('manufacturers.positionsInCatalog', { count: manufacturer.productCount })}</div>

      {loading ? (
        <div className={styles.empty}>{t('common.loading')}</div>
      ) : (
        <>
          <div className={styles.grid}>
            {pageItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setSearchParams({ page: String(p) })}
          />
        </>
      )}
    </div>
  );
}
