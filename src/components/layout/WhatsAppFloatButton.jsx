import { SITE } from '../../data/siteConfig';
import styles from './WhatsAppFloatButton.module.scss';

export default function WhatsAppFloatButton() {
  return (
    <a
      className={styles.button}
      href={`https://wa.me/${SITE.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
    >
      💬
    </a>
  );
}
