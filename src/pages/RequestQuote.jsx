import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { useQuoteList } from '../context/QuoteListContext';
import { useTranslation } from '../i18n/LanguageContext';
import Breadcrumbs from '../components/catalog/Breadcrumbs';
import RequestQuoteForm from '../components/forms/RequestQuoteForm';
import ConsultationForm from '../components/forms/ConsultationForm';
import SpecificationForm from '../components/forms/SpecificationForm';
import CallbackForm from '../components/forms/CallbackForm';
import styles from './RequestQuote.module.scss';

export default function RequestQuote() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'spec' ? 'spec' : 'quote';
  const [tab, setTab] = useState(initialTab);
  const { items } = useQuoteList();
  const { t } = useTranslation();

  const TABS = [
    { key: 'quote', label: t('requestQuote.tabQuote') },
    { key: 'consultation', label: t('requestQuote.tabConsultation') },
    { key: 'spec', label: t('requestQuote.tabSpec') },
    { key: 'callback', label: t('requestQuote.tabCallback') },
  ];

  const item = searchParams.get('item');
  const defaultEquipment = item || (items.length ? items.map((i) => `${i.name}${i.sku ? ` (${i.sku})` : ''}`).join('\n') : '');

  useSeo({
    title: 'Запросить коммерческое предложение',
    description: 'Оставьте заявку на консультацию, коммерческое предложение или отправьте спецификацию для расчёта.',
    canonical: 'https://electromarket.kz/request-quote',
  });

  return (
    <div className={styles.wrap}>
      <Breadcrumbs items={[{ label: t('requestQuote.breadcrumb') }]} />

      {tab === 'quote' && items.length > 0 && (
        <div className={styles.quoteListNote}>
          {t('requestQuote.quoteListNote', {
            count: items.length,
            noun: items.length === 1 ? t('requestQuote.quoteListNounOne') : t('requestQuote.quoteListNounMany'),
          })}
        </div>
      )}

      <div className={styles.tabs}>
        {TABS.map((tabItem) => (
          <button
            key={tabItem.key}
            type="button"
            className={`${styles.tab} ${tab === tabItem.key ? styles.tabActive : ''}`}
            onClick={() => setTab(tabItem.key)}
          >
            {tabItem.label}
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
