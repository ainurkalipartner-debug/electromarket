import { useSeo } from '../hooks/useSeo';
import { PROJECT_DIRECTIONS } from '../data/projectDirections';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import SectionHeading from '../components/ui/SectionHeading';
import CtaBanner from '../components/home/CtaBanner';
import styles from './Projects.module.scss';

const STEPS = [
  { title: 'Заявка', text: 'Получаем список оборудования или задачу по проекту.' },
  { title: 'Подбор', text: 'Подбираем позиции и аналоги под технические требования.' },
  { title: 'КП', text: 'Готовим коммерческое предложение со сроками поставки.' },
  { title: 'Поставка', text: 'Организуем доставку по Казахстану.' },
  { title: 'Сопровождение', text: 'На связи на всех этапах — от заказа до получения на объекте.' },
];

export default function Projects() {
  useSeo({
    title: 'Проекты',
    description: 'Направления и подход к работе с проектами по комплектации электрооборудования.',
    canonical: 'https://electromarket.kz/projects',
  });

  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerInner}>
          <Breadcrumbs items={[{ label: 'Проекты' }]} />
          <h1 className={styles.bannerTitle}>Проекты</h1>
          <p className={styles.bannerText}>
            Помогаем с комплектацией электрооборудования для объектов разного масштаба — от подбора отдельных
            позиций до сопровождения поставки по полному списку.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <SectionHeading title="Направления" subtitle="Типы объектов, для которых мы подбираем оборудование" />
        <div className={styles.grid}>
          {PROJECT_DIRECTIONS.map((item) => (
            <div key={item.title} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">{item.icon}</div>
              <div className={styles.cardTitle}>{item.title}</div>
              <div className={styles.cardText}>{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading title="Как мы работаем с проектом" />
        <div className={styles.steps}>
          {STEPS.map((step, idx) => (
            <div key={step.title} className={styles.step}>
              <div className={styles.stepNumber}>{idx + 1}</div>
              <div className={styles.stepTitle}>{step.title}</div>
              <div className={styles.stepText}>{step.text}</div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
