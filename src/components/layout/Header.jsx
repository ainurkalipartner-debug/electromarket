import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../../data/siteConfig';
import { useQuoteList } from '../../context/QuoteListContext';
import { useTranslation } from '../../i18n/LanguageContext';
import SearchBar from '../catalog/SearchBar';
import Modal from '../ui/Modal';
import CallbackForm from '../forms/CallbackForm';
import LanguageSwitch from './LanguageSwitch';
import logo from '../../assets/logo/logo.jpeg';
import styles from './Header.module.scss';

export default function Header() {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const { count } = useQuoteList();
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label={t('header.logoAria')}>
          <img src={logo} alt={SITE.name} />
        </Link>

        <div className={styles.search}>
          <SearchBar />
        </div>

        <div className={styles.actions}>
          <LanguageSwitch />

          <Link to="/request-quote" className={styles.quoteLink}>
            🧾 {t('header.quoteListLabel')}
            {count > 0 && <span className={styles.quoteBadge}>{count}</span>}
          </Link>

          <div className={styles.phone}>
            <span className={styles.phoneLabel}>{t('header.callDaily')}</span>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </div>

          <button type="button" className={`btn btn-outline-navy btn-sm ${styles.callbackBtn}`} onClick={() => setCallbackOpen(true)}>
            {t('header.orderCallback')}
          </button>

          <Link to="/request-quote" className="btn btn-amber btn-sm">
            {t('header.requestQuote')}
          </Link>
        </div>
      </div>

      <Modal isOpen={callbackOpen} onClose={() => setCallbackOpen(false)}>
        <CallbackForm />
      </Modal>
    </header>
  );
}
