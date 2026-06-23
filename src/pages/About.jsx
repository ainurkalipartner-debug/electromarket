import { useSeo } from '../hooks/useSeo';
import { SITE } from '../data/siteConfig';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import CtaBanner from '../components/home/CtaBanner';
import styles from './About.module.scss';

export default function About() {
  useSeo({
    title: 'О компании',
    description: 'ЭЛЕКТРОМАРКЕТ — поставка электрооборудования 0,4–10 кВ в Атырау и по всему Казахстану.',
    canonical: 'https://electromarket.kz/about',
  });

  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerInner}>
          <Breadcrumbs items={[{ label: 'О компании' }]} />
          <h1 className={styles.bannerTitle}>О компании</h1>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.heading}>Кто мы</h2>
        <p className={styles.text}>
          {SITE.name} — компания из Атырау, специализирующаяся на поставках электрооборудования напряжением
          0,4–10 кВ для промышленных и коммерческих объектов. Работаем с кабельной арматурой, оборудованием
          для распределительных устройств, трансформаторами, щитовым оборудованием, автоматикой и сопутствующими
          материалами. Наш слоган отражает суть подхода: «{SITE.slogan}».
        </p>

        <h2 className={styles.heading}>Миссия</h2>
        <p className={styles.text}>
          Помогать промышленным и коммерческим заказчикам быстро и точно подбирать электрооборудование —
          от отдельной позиции до полной комплектации объекта — и обеспечивать его доставку в любую точку
          Казахстана.
        </p>

        <h2 className={styles.heading}>Преимущества</h2>
        <div className={styles.grid}>
          <div className={styles.item}>📍 Расположены в Атырау, работаем по всему Казахстану</div>
          <div className={styles.item}>🤝 Работаем с юридическими и физическими лицами</div>
          <div className={styles.item}>⚙️ Помогаем с техническим подбором оборудования</div>
          <div className={styles.item}>📦 Широкая номенклатура — от изоляторов до щитового оборудования</div>
        </div>

        <h2 className={styles.heading} style={{ marginTop: 24 }}>География поставок</h2>
        <p className={styles.text}>
          База компании находится в Атырау, доставку организуем по всем регионам Казахстана.
        </p>
      </section>

      <CtaBanner />
    </div>
  );
}
