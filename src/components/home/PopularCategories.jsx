import { CATEGORIES } from '../../data/categories';
import CategoryCard from '../catalog/CategoryCard';
import SectionHeading from '../ui/SectionHeading';
import styles from './PopularCategories.module.scss';

const popular = CATEGORIES.filter((c) => c.productCount > 0)
  .sort((a, b) => b.productCount - a.productCount)
  .slice(0, 8);

export default function PopularCategories() {
  return (
    <section className={styles.section}>
      <SectionHeading title="Популярные категории" subtitle="Сформировано на основе актуального прайс-листа" linkTo="/catalog" />
      <div className={styles.grid}>
        {popular.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}
