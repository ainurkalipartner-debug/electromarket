import { Link } from 'react-router-dom';
import { SITE } from '../../data/siteConfig';
import styles from './CtaBanner.module.scss';

export default function CtaBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div>
          <h2 className={styles.title}>Нужна помощь с подбором оборудования или расчётом КП?</h2>
          <p className={styles.text}>
            Оставьте заявку — пришлём коммерческое предложение со сроками поставки по вашему списку оборудования.
          </p>
        </div>
        <div className={styles.actions}>
          <Link to="/request-quote" className="btn btn-amber">Запросить КП</Link>
          <a
            className="btn btn-whatsapp"
            href={`https://wa.me/${SITE.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Написать в WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
