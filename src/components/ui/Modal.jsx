import { useEffect } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './Modal.module.scss';

export default function Modal({ isOpen, onClose, children }) {
  const { t } = useTranslation();
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label={t('modal.close')}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
