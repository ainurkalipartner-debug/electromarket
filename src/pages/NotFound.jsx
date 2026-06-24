import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { useTranslation } from '../i18n/LanguageContext';

export default function NotFound() {
  const { t } = useTranslation();
  useSeo({ title: 'Страница не найдена', description: 'Запрошенная страница не найдена.' });

  return (
    <div className="container" style={{ padding: '96px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>{t('notFound.title')}</h1>
      <p style={{ marginBottom: 24, color: 'var(--color-text-secondary)' }}>{t('notFound.text')}</p>
      <Link to="/" className="btn btn-amber">{t('notFound.backHome')}</Link>
    </div>
  );
}
