import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { searchProducts } from '../data/products';
import { useTranslation } from '../i18n/LanguageContext';
import SearchBar from '../components/catalog/SearchBar';
import ProductCard from '../components/catalog/ProductCard';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import styles from './Search.module.scss';

export default function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    searchProducts(q).then((res) => {
      if (!cancelled) {
        setResults(res);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [q]);

  useSeo({
    title: q ? `Поиск: ${q}` : 'Поиск по каталогу',
    description: 'Поиск по наименованию, артикулу, категории, производителю и напряжению.',
  });

  return (
    <div className={styles.wrap}>
      <Breadcrumbs items={[{ label: t('search.breadcrumb') }]} />
      <div className={styles.searchRow}>
        <SearchBar />
      </div>

      {!q.trim() ? (
        <div className={styles.empty}>{t('search.promptEmpty')}</div>
      ) : loading ? (
        <div className={styles.empty}>{t('search.searching')}</div>
      ) : results.length === 0 ? (
        <div className={styles.empty}>{t('search.noResults', { q })}</div>
      ) : (
        <>
          <div className={styles.resultCount}>{t('search.resultsCount', { count: results.length, q })}</div>
          <div className={styles.grid}>
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
