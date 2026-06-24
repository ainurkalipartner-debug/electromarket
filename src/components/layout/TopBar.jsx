import { SITE } from '../../data/siteConfig';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './TopBar.module.scss';

export default function TopBar() {
  const { t } = useTranslation();

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.item}>
            <span className={styles.icon} aria-hidden="true">📍</span>
            {SITE.address}
          </span>
          <span className={styles.item}>
            <span className={styles.icon} aria-hidden="true">📞</span>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </span>
        </div>
        <div className={styles.right}>
          <span className={styles.item}>
            <span className={styles.icon} aria-hidden="true">🚚</span>
            {t('topBar.delivery')}
          </span>
          <span className={styles.item}>
            <span className={styles.icon} aria-hidden="true">🛡️</span>
            {t('topBar.warranty')}
          </span>
          <span className={styles.item}>
            <span className={styles.icon} aria-hidden="true">⚙️</span>
            {t('topBar.support')}
          </span>
        </div>
      </div>
    </div>
  );
}
