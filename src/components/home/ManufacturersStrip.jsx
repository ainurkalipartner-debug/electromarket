import { MANUFACTURERS } from '../../data/manufacturers';
import ManufacturerBadge from '../catalog/ManufacturerBadge';
import SectionHeading from '../ui/SectionHeading';
import styles from './ManufacturersStrip.module.scss';

export default function ManufacturersStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading title="Производители" subtitle="Бренды, представленные в нашем прайс-листе" linkTo="/manufacturers" />
        <div className={styles.row}>
          {MANUFACTURERS.map((m) => (
            <ManufacturerBadge key={m.slug} slug={m.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
