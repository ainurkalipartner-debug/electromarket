import styles from './FormShell.module.scss';

export default function FormShell({
  title,
  description,
  submitted,
  whatsappHref,
  mailtoHref,
  onSubmit,
  submitLabel = 'Отправить заявку',
  children,
}) {
  if (submitted) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon} aria-hidden="true">✅</div>
        <h3>Сообщение сформировано</h3>
        <p>Нажмите кнопку ниже, чтобы отправить уже готовое сообщение нам в WhatsApp или на почту.</p>
        <div className={styles.successActions}>
          <a className="btn btn-whatsapp btn-block" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            Открыть WhatsApp
          </a>
          <a className="btn btn-outline-navy btn-block" href={mailtoHref}>
            Написать на email
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
        {submitLabel}
      </button>
    </form>
  );
}
