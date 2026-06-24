import { MANUFACTURERS } from '../../data/manufacturers';
import { useTranslation } from '../../i18n/LanguageContext';
import ManufacturerBadge from '../catalog/ManufacturerBadge';
import SectionHeading from '../ui/SectionHeading';
import styles from './ManufacturersStrip.module.scss';

export default function ManufacturersStrip() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading title={t('home.manufacturersStrip.title')} subtitle={t('home.manufacturersStrip.subtitle')} linkTo="/manufacturers" />
        <div className={styles.row}>
          {MANUFACTURERS.map((m) => (
            <ManufacturerBadge key={m.slug} slug={m.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
