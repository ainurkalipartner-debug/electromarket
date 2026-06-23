import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { searchProducts } from '../data/products';
import SearchBar from '../components/catalog/SearchBar';
import ProductCard from '../components/catalog/ProductCard';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import styles from './Search.module.scss';

export default function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <Breadcrumbs items={[{ label: 'Поиск' }]} />
      <div className={styles.searchRow}>
        <SearchBar />
      </div>

      {!q.trim() ? (
        <div className={styles.empty}>Введите запрос — название, артикул, производитель или класс напряжения.</div>
      ) : loading ? (
        <div className={styles.empty}>Поиск…</div>
      ) : results.length === 0 ? (
        <div className={styles.empty}>По запросу «{q}» ничего не найдено. Попробуйте изменить формулировку или оставьте заявку — поможем найти нужную позицию.</div>
      ) : (
        <>
          <div className={styles.resultCount}>Найдено {results.length} товаров по запросу «{q}»</div>
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
