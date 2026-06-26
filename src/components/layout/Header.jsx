import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../../data/siteConfig';
import { useQuoteList } from '../../context/QuoteListContext';
import { useTranslation } from '../../i18n/LanguageContext';
import SearchBar from '../catalog/SearchBar';
import Modal from '../ui/Modal';
import CallbackForm from '../forms/CallbackForm';
import LanguageSwitch from './LanguageSwitch';
import logoFull from '../../assets/logo/logo-full.png';
import logoIcon from '../../assets/logo/logo-icon.png';
import styles from './Header.module.scss';

export default function Header() {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const { count } = useQuoteList();
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <Link to="/" className={styles.logo} aria-label={t('header.logoAria')}>
            <img src={logoIcon} alt={SITE.name} className={styles.logoIcon} width={400} height={400} />
            <img src={logoFull} alt={SITE.name} className={styles.logoFull} width={960} height={320} />
          </Link>

          <div className={styles.utility}>
            <LanguageSwitch className={styles.langSwitch} />

            <Link to="/request-quote" className={styles.quoteLink}>
              <svg className={styles.quoteIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              {t('header.quoteListLabel')}
              {count > 0 && <span className={styles.quoteBadge}>{count}</span>}
            </Link>
          </div>
        </div>

        <div className={styles.search}>
          <SearchBar />
        </div>

        <div className={styles.ctaRow}>
          <div className={styles.phone}>
            <span className={styles.phoneLabel}>{t('header.callDaily')}</span>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </div>

          <button type="button" className={`btn btn-outline-navy btn-sm ${styles.callbackBtn}`} onClick={() => setCallbackOpen(true)}>
            {t('header.orderCallback')}
          </button>

          <Link to="/request-quote" className={`btn btn-amber btn-sm ${styles.quoteCta}`}>
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
