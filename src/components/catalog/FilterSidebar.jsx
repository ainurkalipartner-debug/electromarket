import { getManufacturer } from '../../data/manufacturers';
import { useTranslation } from '../../i18n/LanguageContext';
import { tc } from '../../i18n/translateCatalogText';
import styles from './FilterSidebar.module.scss';

function buildFacets(products, key, limit) {
  const counts = new Map();
  for (const p of products) {
    const value = p[key];
    if (!value) continue;
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  return limit ? sorted.slice(0, limit) : sorted;
}

function FacetGroup({ title, facets, selected, onSelect, labelFor }) {
  if (!facets.length) return null;
  return (
    <div className={styles.group}>
      <div className={styles.groupTitle}>{title}</div>
      {facets.map(([value, count]) => (
        <button
          key={value}
          type="button"
          className={`${styles.optionBtn} ${styles.option} ${selected === value ? styles.optionActive : ''}`}
          onClick={() => onSelect(selected === value ? null : value)}
        >
          <span>{labelFor ? labelFor(value) : value}</span>
          <span className={styles.count}>{count}</span>
        </button>
      ))}
    </div>
  );
}

export default function FilterSidebar({
  products,
  selectedManufacturer,
  selectedVoltage,
  selectedSubcategory,
  onSelectManufacturer,
  onSelectVoltage,
  onSelectSubcategory,
  onReset,
}) {
  const { t, lang } = useTranslation();
  const manufacturerFacets = buildFacets(products, 'manufacturerSlug');
  const voltageFacets = buildFacets(products, 'voltageClass');
  const subcategoryFacets = onSelectSubcategory ? buildFacets(products, 'subcategoryName', 15) : [];
  const hasActiveFilters = Boolean(selectedManufacturer || selectedVoltage || selectedSubcategory);

  if (!manufacturerFacets.length && !voltageFacets.length && !subcategoryFacets.length) return null;

  function manufacturerLabel(slug) {
    if (slug === 'involt-production') return t('common.manufacturerOwnProduction');
    return getManufacturer(slug)?.name || slug;
  }

  return (
    <aside className={styles.sidebar}>
      {hasActiveFilters && (
        <button type="button" className={`${styles.resetBtn} ${styles.reset}`} onClick={onReset}>
          {t('filters.reset')}
        </button>
      )}

      <FacetGroup
        title={t('filters.section')}
        facets={subcategoryFacets}
        selected={selectedSubcategory}
        onSelect={onSelectSubcategory}
        labelFor={(value) => tc(value, lang)}
      />
      <FacetGroup
        title={t('filters.manufacturer')}
        facets={manufacturerFacets}
        selected={selectedManufacturer}
        onSelect={onSelectManufacturer}
        labelFor={manufacturerLabel}
      />
      <FacetGroup title={t('filters.voltage')} facets={voltageFacets} selected={selectedVoltage} onSelect={onSelectVoltage} />
    </aside>
  );
}
