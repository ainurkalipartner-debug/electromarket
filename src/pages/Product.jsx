import { useParams, Link, Navigate } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { useProduct } from '../hooks/useProduct';
import { getCategory } from '../data/categories';
import { useQuoteList } from '../context/QuoteListContext';
import { buildWhatsAppLink } from '../utils/whatsappMessageBuilder';
import { useTranslation } from '../i18n/LanguageContext';
import { tc } from '../i18n/translateCatalogText';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import SpecsTable from '../components/catalog/SpecsTable';
import ManufacturerBadge from '../components/catalog/ManufacturerBadge';
import styles from './Product.module.scss';

export default function Product() {
  const { productSlug } = useParams();
  const { product, loading } = useProduct(productSlug);
  const { addItem, removeItem, hasItem } = useQuoteList();
  const { t, lang } = useTranslation();

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

  if (loading) return <div className={styles.wrap}>{t('common.loading')}</div>;
  if (!product) return <Navigate to="/catalog" replace />;

  const category = getCategory(product.categorySlug);
  const image = product.image || category?.image || null;
  const inQuote = hasItem(product.slug);
  const displayName = tc(product.name, lang);
  const categoryName = category ? t(`categories.${category.slug}.name`) : null;
  // The outgoing WhatsApp message always uses the original Russian name — see ProductCard.
  const whatsappHref = buildWhatsAppLink('productInquiry', { product: product.name, sku: product.sku }, lang);

  return (
    <div className={styles.wrap}>
      <Breadcrumbs
        items={[
          { label: t('catalog.breadcrumb'), href: '/catalog' },
          ...(category ? [{ label: categoryName, href: `/catalog/${category.slug}` }] : []),
          { label: displayName },
        ]}
      />

      <div className={styles.grid}>
        <div className={styles.imageBox}>
          {image ? (
            <img className={styles.image} src={image} alt={displayName} />
          ) : (
            <span className={styles.placeholder} aria-hidden="true">⚡</span>
          )}
        </div>

        <div>
          {product.sku && <div className={styles.sku}>{t('product.skuLabel', { sku: product.sku })}</div>}
          <h1 className={styles.title}>{displayName}</h1>

          <div className={styles.metaRow}>
            <span className={styles.statusPill}>{t('common.orderStatus')}</span>
            {product.voltageClass && <span className={styles.voltage}>{product.voltageClass}</span>}
            {product.manufacturerSlug && <ManufacturerBadge slug={product.manufacturerSlug} />}
          </div>

          <div className={styles.leadTime}>{t('product.leadTime')}</div>

          {product.description && <p className={styles.description}>{tc(product.description, lang)}</p>}

          <div className={styles.actions}>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-amber btn-block">
              {t('common.requestPrice')}
            </a>
            <button
              type="button"
              className="btn btn-outline-navy btn-block"
              onClick={() => (inQuote ? removeItem(product.slug) : addItem(product))}
            >
              {inQuote ? `✓ ${t('common.inQuote')}` : t('common.addToQuote')}
            </button>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-block">
              {t('common.whatsapp')}
            </a>
            <Link to={`/request-quote?item=${encodeURIComponent(product.name)}`} className="btn btn-navy btn-block">
              {t('common.getQuote')}
            </Link>
          </div>

          {Object.keys(product.specs || {}).length > 0 && (
            <>
              <h2 className={styles.specsHeading}>{t('product.specsHeading')}</h2>
              <SpecsTable specs={product.specs} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
