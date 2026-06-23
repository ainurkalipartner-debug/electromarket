import styles from './FormField.module.scss';

export default function FormField({ label, required, hint, type = 'text', value, onChange, ...rest }) {
  const id = rest.id || rest.name;

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={id}
          className={styles.textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          {...rest}
        />
      ) : type === 'file' ? (
        <input
          id={id}
          type="file"
          className={styles.fileInput}
          onChange={(e) => onChange(e.target.files?.[0]?.name || '')}
          {...rest}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          {...rest}
        />
      )}
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}
