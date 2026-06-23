import styles from './Pagination.module.scss';

function getPageList(current, total) {
  const pages = new Set([1, total, current, current - 1, current + 1]);
  return [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = getPageList(currentPage, totalPages);

  return (
    <nav className={styles.nav} aria-label="Пагинация">
      <button
        type="button"
        className={styles.pageBtn}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Предыдущая страница"
      >
        ←
      </button>

      {pages.map((page, idx) => {
        const prev = pages[idx - 1];
        const showEllipsis = prev && page - prev > 1;
        return (
          <span key={page} style={{ display: 'flex', alignItems: 'center' }}>
            {showEllipsis && <span className={styles.ellipsis}>…</span>}
            <button
              type="button"
              className={`${styles.pageBtn} ${page === currentPage ? styles.active : ''}`}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        className={styles.pageBtn}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Следующая страница"
      >
        →
      </button>
    </nav>
  );
}
