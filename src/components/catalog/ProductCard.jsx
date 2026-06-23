import { Link } from 'react-router-dom';
import { getCategory } from '../../data/categories';
import { useQuoteList } from '../../context/QuoteListContext';
import { buildWhatsAppLink } from '../../utils/whatsappMessageBuilder';
import ManufacturerBadge from './ManufacturerBadge';
import styles from './ProductCard.module.scss';

export default function ProductCard({ product }) {
  const { addItem, removeItem, hasItem } = useQuoteList();
  const category = getCategory(product.categorySlug);
  const image = product.image || category?.image || null;
  const inQuote = hasItem(product.slug);

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
          <img className={styles.image} src={image} alt={product.name} loading="lazy" />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">⚡</span>
        )}
        <span className={styles.status}>{product.status}</span>
      </Link>

      <div className={styles.body}>
        {product.sku && <span className={styles.sku}>Артикул: {product.sku}</span>}
        <Link to={`/product/${product.slug}`} className={styles.name}>
          {product.name}
        </Link>

        <div className={styles.metaRow}>
          {product.voltageClass && <span className={styles.voltage}>{product.voltageClass}</span>}
          {product.manufacturerSlug && <ManufacturerBadge slug={product.manufacturerSlug} />}
        </div>

        <div className={styles.actions}>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-amber btn-sm btn-block">
            Запросить цену
          </a>
          <button
            type="button"
            onClick={toggleQuote}
            className={`btn btn-outline-navy btn-sm ${styles.addBtn} ${inQuote ? styles.addBtnActive : ''}`}
            aria-label={inQuote ? 'Убрать из заявки' : 'Добавить в заявку'}
            title={inQuote ? 'В заявке' : 'Добавить в заявку'}
          >
            {inQuote ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}
