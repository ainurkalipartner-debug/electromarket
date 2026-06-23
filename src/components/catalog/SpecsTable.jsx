import styles from './SpecsTable.module.scss';

export default function SpecsTable({ specs }) {
  const entries = Object.entries(specs || {});
  if (!entries.length) return null;

  return (
    <table className={styles.table}>
      <tbody>
        {entries.map(([label, value]) => (
          <tr key={label}>
            <td className={styles.label}>{label}</td>
            <td className={styles.value}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
