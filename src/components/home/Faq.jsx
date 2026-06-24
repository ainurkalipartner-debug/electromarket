import { useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import SectionHeading from '../ui/SectionHeading';
import styles from './Faq.module.scss';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useTranslation();
  const items = t('faqItems');

  return (
    <section className={styles.section}>
      <SectionHeading title={t('home.faq.title')} />
      {items.map((item, idx) => {
        const isOpen = idx === openIndex;
        return (
          <div key={item.question} className={styles.item}>
            <button type="button" className={styles.question} onClick={() => setOpenIndex(isOpen ? -1 : idx)}>
              {item.question}
              <span className={styles.icon} aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <p className={styles.answer}>{item.answer}</p>}
          </div>
        );
      })}
    </section>
  );
}
