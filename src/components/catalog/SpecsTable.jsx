import { useTranslation } from '../../i18n/LanguageContext';
import { tc } from '../../i18n/translateCatalogText';
import styles from './SpecsTable.module.scss';

export default function SpecsTable({ specs }) {
  const { t, lang } = useTranslation();
  const entries = Object.entries(specs || {});
  if (!entries.length) return null;

  return (
    <table className={styles.table}>
      <tbody>
        {entries.map(([label, value]) => (
          <tr key={label}>
            <td className={styles.label}>{t(`specLabels.${label}`)}</td>
            <td className={styles.value}>{tc(value, lang)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
