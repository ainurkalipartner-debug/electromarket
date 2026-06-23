import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { useQuoteList } from '../context/QuoteListContext';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import RequestQuoteForm from '../components/forms/RequestQuoteForm';
import ConsultationForm from '../components/forms/ConsultationForm';
import SpecificationForm from '../components/forms/SpecificationForm';
import CallbackForm from '../components/forms/CallbackForm';
import styles from './RequestQuote.module.scss';

const TABS = [
  { key: 'quote', label: 'Запросить КП' },
  { key: 'consultation', label: 'Консультация' },
  { key: 'spec', label: 'Спецификация' },
  { key: 'callback', label: 'Обратный звонок' },
];

export default function RequestQuote() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'spec' ? 'spec' : 'quote';
  const [tab, setTab] = useState(initialTab);
  const { items } = useQuoteList();

  const item = searchParams.get('item');
  const defaultEquipment = item || (items.length ? items.map((i) => `${i.name}${i.sku ? ` (${i.sku})` : ''}`).join('\n') : '');

  useSeo({
    title: 'Запросить коммерческое предложение',
    description: 'Оставьте заявку на консультацию, коммерческое предложение или отправьте спецификацию для расчёта.',
    canonical: 'https://electromarket.kz/request-quote',
  });

  return (
    <div className={styles.wrap}>
      <Breadcrumbs items={[{ label: 'Запросить КП' }]} />

      {tab === 'quote' && items.length > 0 && (
        <div className={styles.quoteListNote}>
          В вашей заявке {items.length} {items.length === 1 ? 'позиция' : 'позиций'} — список уже добавлен в поле «Список оборудования».
        </div>
      )}

      <div className={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.card}>
        {tab === 'quote' && <RequestQuoteForm defaultEquipment={defaultEquipment} />}
        {tab === 'consultation' && <ConsultationForm />}
        {tab === 'spec' && <SpecificationForm />}
        {tab === 'callback' && <CallbackForm />}
      </div>
    </div>
  );
}
