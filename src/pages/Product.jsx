import { useParams, Link, Navigate } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { useProduct } from '../hooks/useProduct';
import { getCategory } from '../data/categories';
import { useQuoteList } from '../context/QuoteListContext';
import { buildWhatsAppLink } from '../utils/whatsappMessageBuilder';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import SpecsTable from '../components/catalog/SpecsTable';
import ManufacturerBadge from '../components/catalog/ManufacturerBadge';
import styles from './Product.module.scss';

export default function Product() {
  const { productSlug } = useParams();
  const { product, loading } = useProduct(productSlug);
  const { addItem, removeItem, hasItem } = useQuoteList();

  useSeo({
    title: product?.name,
    description: product ? `${product.name} — ${product.status}. Запросите цену и срок поставки.` : undefined,
    canonical: product ? `https://electromarket.kz/product/${product.slug}` : undefined,
    jsonLd: product
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          sku: product.sku || undefined,
          description: product.description || product.name,
          brand: product.manufacturerSlug || undefined,
          image: product.image ? `https://electromarket.kz${product.image}` : undefined,
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/PreOrder',
            priceSpecification: 'По запросу',
          },
        }
      : undefined,
  });

  if (loading) return <div className={styles.wrap}>Загрузка…</div>;
  if (!product) return <Navigate to="/catalog" replace />;

  const category = getCategory(product.categorySlug);
  const image = product.image || category?.image || null;
  const inQuote = hasItem(product.slug);
  const whatsappHref = buildWhatsAppLink('productInquiry', { product: product.name, sku: product.sku });

  return (
    <div className={styles.wrap}>
      <Breadcrumbs
        items={[
          { label: 'Каталог', href: '/catalog' },
          ...(category ? [{ label: category.name, href: `/catalog/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className={styles.grid}>
        <div className={styles.imageBox}>
          {image ? (
            <img className={styles.image} src={image} alt={product.name} />
          ) : (
            <span className={styles.placeholder} aria-hidden="true">⚡</span>
          )}
        </div>

        <div>
          {product.sku && <div className={styles.sku}>Артикул: {product.sku}</div>}
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.metaRow}>
            <span className={styles.statusPill}>{product.status}</span>
            {product.voltageClass && <span className={styles.voltage}>{product.voltageClass}</span>}
            {product.manufacturerSlug && <ManufacturerBadge slug={product.manufacturerSlug} />}
          </div>

          <div className={styles.leadTime}>
            ⏱ Ориентировочный срок поставки уточняется менеджером после оформления заявки — зависит от наличия у поставщика.
          </div>

          {product.description && <p className={styles.description}>{product.description}</p>}

          <div className={styles.actions}>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-amber btn-block">
              Запросить цену
            </a>
            <button
              type="button"
              className="btn btn-outline-navy btn-block"
              onClick={() => (inQuote ? removeItem(product.slug) : addItem(product))}
            >
              {inQuote ? '✓ В заявке' : 'Добавить в заявку'}
            </button>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-block">
              WhatsApp
            </a>
            <Link to={`/request-quote?item=${encodeURIComponent(product.name)}`} className="btn btn-navy btn-block">
              Получить КП
            </Link>
          </div>

          {Object.keys(product.specs || {}).length > 0 && (
            <>
              <h2 className={styles.specsHeading}>Технические характеристики</h2>
              <SpecsTable specs={product.specs} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
