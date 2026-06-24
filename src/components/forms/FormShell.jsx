import { useTranslation } from '../../i18n/LanguageContext';
import styles from './FormShell.module.scss';

export default function FormShell({
  title,
  description,
  submitted,
  whatsappHref,
  mailtoHref,
  onSubmit,
  submitLabel,
  children,
}) {
  const { t } = useTranslation();

  if (submitted) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon} aria-hidden="true">✅</div>
        <h3>{t('forms.successTitle')}</h3>
        <p>{t('forms.successText')}</p>
        <div className={styles.successActions}>
          <a className="btn btn-whatsapp btn-block" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            {t('forms.openWhatsapp')}
          </a>
          <a className="btn btn-outline-navy btn-block" href={mailtoHref}>
            {t('forms.writeEmail')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
      <button type="submit" className="btn btn-amber btn-block">
        {submitLabel || t('forms.submitDefault')}
      </button>
    </form>
  );
}
