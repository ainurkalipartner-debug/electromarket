import { getManufacturer } from '../../data/manufacturers';
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
  const manufacturerFacets = buildFacets(products, 'manufacturerSlug');
  const voltageFacets = buildFacets(products, 'voltageClass');
  const subcategoryFacets = onSelectSubcategory ? buildFacets(products, 'subcategoryName', 15) : [];
  const hasActiveFilters = Boolean(selectedManufacturer || selectedVoltage || selectedSubcategory);

  if (!manufacturerFacets.length && !voltageFacets.length && !subcategoryFacets.length) return null;

  return (
    <aside className={styles.sidebar}>
      {hasActiveFilters && (
        <button type="button" className={`${styles.resetBtn} ${styles.reset}`} onClick={onReset}>
          Сбросить фильтры ✕
        </button>
      )}

      <FacetGroup title="Раздел" facets={subcategoryFacets} selected={selectedSubcategory} onSelect={onSelectSubcategory} />
      <FacetGroup
        title="Производитель"
        facets={manufacturerFacets}
        selected={selectedManufacturer}
        onSelect={onSelectManufacturer}
        labelFor={(slug) => getManufacturer(slug)?.name || slug}
      />
      <FacetGroup title="Напряжение" facets={voltageFacets} selected={selectedVoltage} onSelect={onSelectVoltage} />
    </aside>
  );
}
