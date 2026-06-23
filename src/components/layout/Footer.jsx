import { Link } from 'react-router-dom';
import { SITE } from '../../data/siteConfig';
import { CATEGORIES } from '../../data/categories';
import styles from './Footer.module.scss';

const topCategories = CATEGORIES.slice(0, 7);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandBlock}>
          <div className={styles.heading}>{SITE.name}</div>
          <p>{SITE.slogan}. Поставка электрооборудования 0,4–10 кВ для промышленных и коммерческих объектов по всему Казахстану.</p>
          <a
            className={`btn btn-whatsapp btn-sm ${styles.waButton}`}
            href={`https://wa.me/${SITE.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Написать в WhatsApp
          </a>
        </div>

        <div>
          <div className={styles.heading}>Каталог</div>
          <nav className={styles.list}>
            {topCategories.map((c) => (
              <Link key={c.slug} to={`/catalog/${c.slug}`}>
                {c.name}
              </Link>
            ))}
            <Link to="/catalog">Все категории →</Link>
          </nav>
        </div>

        <div>
          <div className={styles.heading}>Компания</div>
          <nav className={styles.list}>
            <Link to="/about">О компании</Link>
            <Link to="/services">Услуги</Link>
            <Link to="/projects">Проекты</Link>
            <Link to="/manufacturers">Производители</Link>
            <Link to="/delivery">Доставка и оплата</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>
        </div>

        <div>
          <div className={styles.heading}>Контакты</div>
          <div className={styles.contactItem}>
            <span aria-hidden="true">📍</span>
            <span>{SITE.address}</span>
          </div>
          <div className={styles.contactItem}>
            <span aria-hidden="true">📞</span>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </div>
          <div className={styles.contactItem}>
            <span aria-hidden="true">✉️</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className={styles.contactItem}>
            <span aria-hidden="true">🕒</span>
            <span>{SITE.workHours}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>© {year} {SITE.name}. Все права защищены.</span>
          <span>Цены предоставляются по запросу — все товары поставляются под заказ.</span>
        </div>
      </div>
    </footer>
  );
}
