import { useMemo } from 'react';
import { useParams, useNavigate, Navigate, useSearchParams } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { useCategoryProducts } from '../hooks/useCategoryProducts';
import { getCategory } from '../data/categories';
import { SITE } from '../data/siteConfig';
import { useTranslation } from '../i18n/LanguageContext';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import FilterSidebar from '../components/catalog/FilterSidebar';
import ProductCard from '../components/catalog/ProductCard';
import Pagination from '../components/catalog/Pagination';
import styles from './Category.module.scss';

const PAGE_SIZE = 24;

export default function Category() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const category = getCategory(categorySlug);
  const { products, loading } = useCategoryProducts(categorySlug);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const q = searchParams.get('q') || '';
  const manufacturer = searchParams.get('manufacturer');
  const voltage = searchParams.get('voltage');
  const sub = searchParams.get('sub');
  const sort = searchParams.get('sort') || 'name-asc';
  const page = parseInt(searchParams.get('page') || '1', 10);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setSearchParams(next);
  }

  const filtered = useMemo(() => {
    let list = products;
    if (manufacturer) list = list.filter((p) => p.manufacturerSlug === manufacturer);
    if (voltage) list = list.filter((p) => p.voltageClass === voltage);
    if (sub) list = list.filter((p) => p.subcategoryName === sub);
    if (q.trim()) {
      const tokens = q.toLowerCase().trim().split(/\s+/);
      list = list.filter((p) => tokens.every((t) => p.keywords.some((k) => k.includes(t))));
    }
    const sorted = [...list];
    if (sort === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    if (sort === 'name-desc') sorted.sort((a, b) => b.name.localeCompare(a.name, 'ru'));
    return sorted;
  }, [products, manufacturer, voltage, sub, q, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const categoryName = category ? t(`categories.${category.slug}.name`) : null;
  const categoryDescription = category ? t(`categories.${category.slug}.description`) : null;

  useSeo({
    title: categoryName || 'Категория не найдена',
    description: categoryDescription,
    canonical: category ? `https://electromarket.kz/catalog/${category.slug}` : undefined,
    jsonLd: category
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Каталог', item: 'https://electromarket.kz/catalog' },
            { '@type': 'ListItem', position: 2, name: categoryName },
          ],
        }
      : undefined,
  });

  if (!category) return <Navigate to="/catalog" replace />;

  return (
    <div>
      <div className={styles.banner}>
        {category.image && <img className={styles.bannerImage} src={category.image} alt="" aria-hidden="true" />}
        <div className={styles.bannerInner}>
          <Breadcrumbs variant="dark" items={[{ label: t('category.catalogCrumb'), href: '/catalog' }, { label: categoryName }]} />
          <h1 className={styles.bannerTitle}>{categoryName}</h1>
          <p className={styles.bannerText}>{categoryDescription}</p>
          {category.productCount > 0 && (
            <span className={styles.bannerCount}>{t('common.positionsCount', { count: category.productCount })}</span>
          )}
        </div>
      </div>

      <div className={styles.body}>
        {category.productCount === 0 ? (
          <div className={styles.empty} style={{ gridColumn: '1 / -1' }}>
            <div className={styles.emptyTitle}>{t('category.emptyTitle')}</div>
            <p className={styles.emptyText}>{t('category.emptyText', { name: categoryName })}</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-amber" onClick={() => navigate('/request-quote')}>
                {t('common.requestQuote')}
              </button>
              <a
                className="btn btn-whatsapp"
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('common.writeWhatsapp')}
              </a>
            </div>
          </div>
        ) : loading ? (
          <div className={styles.loading} style={{ gridColumn: '1 / -1' }}>{t('category.loadingProducts')}</div>
        ) : (
          <>
            <FilterSidebar
              products={products}
              selectedManufacturer={manufacturer}
              selectedVoltage={voltage}
              selectedSubcategory={sub}
              onSelectManufacturer={(v) => updateParam('manufacturer', v)}
              onSelectVoltage={(v) => updateParam('voltage', v)}
              onSelectSubcategory={(v) => updateParam('sub', v)}
              onReset={() => setSearchParams({})}
            />
            <div>
              <div className={styles.toolbar}>
                <input
                  className={styles.localSearch}
                  type="search"
                  placeholder={t('category.searchPlaceholder')}
                  value={q}
                  onChange={(e) => updateParam('q', e.target.value)}
                />
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span className={styles.resultCount}>{t('category.productsCount', { count: filtered.length })}</span>
                  <select className={styles.sortSelect} value={sort} onChange={(e) => updateParam('sort', e.target.value)}>
                    <option value="name-asc">{t('category.sortNameAsc')}</option>
                    <option value="name-desc">{t('category.sortNameDesc')}</option>
                  </select>
                </div>
              </div>

              {pageItems.length === 0 ? (
                <div className={styles.empty}>
                  <div className={styles.emptyTitle}>{t('category.noResultsTitle')}</div>
                  <p className={styles.emptyText}>{t('category.noResultsText')}</p>
                </div>
              ) : (
                <div className={styles.grid}>
                  {pageItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => updateParam('page', String(p))} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
