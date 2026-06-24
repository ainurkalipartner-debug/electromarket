import { Link } from 'react-router-dom';
import { getCategory } from '../../data/categories';
import { useQuoteList } from '../../context/QuoteListContext';
import { buildWhatsAppLink } from '../../utils/whatsappMessageBuilder';
import { useTranslation } from '../../i18n/LanguageContext';
import { tc } from '../../i18n/translateCatalogText';
import ManufacturerBadge from './ManufacturerBadge';
import styles from './ProductCard.module.scss';

export default function ProductCard({ product }) {
  const { addItem, removeItem, hasItem } = useQuoteList();
  const { t, lang } = useTranslation();
  const category = getCategory(product.categorySlug);
  const image = product.image || category?.image || null;
  const inQuote = hasItem(product.slug);
  const displayName = tc(product.name, lang);

  // The outgoing WhatsApp message always uses the original Russian name —
  // it must match the supplier's actual nomenclature, not a machine translation.
  const whatsappHref = buildWhatsAppLink('productInquiry', {
    product: product.name,
    sku: product.sku,
  });

  function toggleQuote(e) {
    e.preventDefault();
    if (inQuote) removeItem(product.slug);
    else addItem(product);
  }

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.slug}`} className={styles.imageWrap}>
        {image ? (
          <img className={styles.image} src={image} alt={displayName} loading="lazy" />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">⚡</span>
        )}
        <span className={styles.status}>{t('common.orderStatus')}</span>
      </Link>

      <div className={styles.body}>
        {product.sku && <span className={styles.sku}>{t('product.skuLabel', { sku: product.sku })}</span>}
        <Link to={`/product/${product.slug}`} className={styles.name}>
          {displayName}
        </Link>

        <div className={styles.metaRow}>
          {product.voltageClass && <span className={styles.voltage}>{product.voltageClass}</span>}
          {product.manufacturerSlug && <ManufacturerBadge slug={product.manufacturerSlug} />}
        </div>

        <div className={styles.actions}>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-amber btn-sm btn-block">
            {t('common.requestPrice')}
          </a>
          <button
            type="button"
            onClick={toggleQuote}
            className={`btn btn-outline-navy btn-sm ${styles.addBtn} ${inQuote ? styles.addBtnActive : ''}`}
            aria-label={inQuote ? t('common.removeFromQuote') : t('common.addToQuote')}
            title={inQuote ? t('common.inQuote') : t('common.addToQuote')}
          >
            {inQuote ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}
