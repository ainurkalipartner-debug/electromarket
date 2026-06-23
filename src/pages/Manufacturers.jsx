import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { MANUFACTURERS } from '../data/manufacturers';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import styles from './Manufacturers.module.scss';

export default function Manufacturers() {
  useSeo({
    title: 'Производители',
    description: 'Бренды и производители электрооборудования, представленные в каталоге ЭЛЕКТРОМАРКЕТ.',
    canonical: 'https://electromarket.kz/manufacturers',
  });

  return (
    <div className={styles.wrap}>
      <Breadcrumbs items={[{ label: 'Производители' }]} />
      <p className={styles.intro}>
        Работаем с проверенными производителями электротехнической продукции, а также поставляем оборудование
        собственного производства. Ниже — бренды, представленные в нашем актуальном прайс-листе.
      </p>
      <div className={styles.grid}>
        {MANUFACTURERS.map((m) => (
          <Link key={m.slug} to={`/manufacturers/${m.slug}`} className={styles.card}>
            <div>
              <div className={styles.name}>{m.name}</div>
              <div className={styles.count}>{m.productCount} позиций в каталоге</div>
            </div>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
