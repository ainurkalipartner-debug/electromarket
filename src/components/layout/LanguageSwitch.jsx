import { useTranslation } from '../../i18n/LanguageContext';
import styles from './LanguageSwitch.module.scss';

export default function LanguageSwitch({ className }) {
  const { lang, setLang } = useTranslation();

  return (
    <div className={[styles.switch, className].filter(Boolean).join(' ')} role="group" aria-label="Тіл / Язык">
      <button
        type="button"
        className={`${styles.option} ${lang === 'ru' ? styles.optionActive : ''}`}
        onClick={() => setLang('ru')}
      >
        РУС
      </button>
      <button
        type="button"
        className={`${styles.option} ${lang === 'kk' ? styles.optionActive : ''}`}
        onClick={() => setLang('kk')}
      >
        ҚАЗ
      </button>
    </div>
  );
}
