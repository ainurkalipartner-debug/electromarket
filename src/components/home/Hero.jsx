import { Link } from 'react-router-dom';
import { getCategory } from '../../data/categories';
import styles from './Hero.module.scss';

export default function Hero() {
  const isolators = getCategory('izolyatory-i-vysokovoltnaya-armatura');
  const grounding = getCategory('zazemlenie-i-molniezashchita');
  const automation = getCategory('avtomatika-i-zashchita');

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>⚡ Электротехническое снабжение</span>
          <h1 className={styles.title}>Электрооборудование 0,4–10 кВ для промышленных и коммерческих объектов</h1>
          <p className={styles.subtitle}>
            Поставка кабельной продукции, КРУ, КСО, трансформаторов, распределительных устройств, щитового
            оборудования, кабельной арматуры, автоматики, изоляторов и комплектующих по всему Казахстану.
          </p>
          <div className={styles.actions}>
            <Link to="/catalog" className="btn btn-amber">Перейти в каталог</Link>
            <Link to="/request-quote" className="btn btn-outline">Получить консультацию</Link>
            <Link to="/request-quote?tab=spec" className="btn btn-outline">Отправить спецификацию</Link>
          </div>
        </div>

        <div className={styles.gallery}>
          {isolators?.image && (
            <div className={styles.tile}>
              <img src={isolators.image} alt={isolators.name} />
            </div>
          )}
          {grounding?.image && (
            <div className={styles.tile}>
              <img src={grounding.image} alt={grounding.name} />
            </div>
          )}
          {automation?.image && (
            <div className={`${styles.tile} ${styles.tileWide}`}>
              <img src={automation.image} alt={automation.name} />
            </div>
          )}
        </div>

        <div className={styles.statsStrip}>
          <div className={styles.stat}>
            <span className={styles.statIcon} aria-hidden="true">🛡️</span>
            <div>
              <div className={styles.statTitle}>Надёжность</div>
              <div className={styles.statText}>Оборудование соответствует ГОСТ и МЭК</div>
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon} aria-hidden="true">✅</span>
            <div>
              <div className={styles.statTitle}>Качество</div>
              <div className={styles.statText}>Только проверенные производители</div>
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon} aria-hidden="true">⚙️</span>
            <div>
              <div className={styles.statTitle}>Поддержка</div>
              <div className={styles.statText}>Техническая поддержка и подбор оборудования</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
