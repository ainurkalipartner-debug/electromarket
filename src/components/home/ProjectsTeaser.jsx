import { Link } from 'react-router-dom';
import { PROJECT_DIRECTIONS } from '../../data/projectDirections';
import styles from './ProjectsTeaser.module.scss';

export default function ProjectsTeaser() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>
            <h2 className={styles.title}>Проекты</h2>
            <p className={styles.subtitle}>Направления, в которых мы помогаем с комплектацией оборудования</p>
          </div>
          <Link to="/projects" className={styles.link}>Подробнее о проектах →</Link>
        </div>
        <div className={styles.grid}>
          {PROJECT_DIRECTIONS.map((item) => (
            <div key={item.title} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">{item.icon}</div>
              <div className={styles.cardTitle}>{item.title}</div>
              <div className={styles.cardText}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
