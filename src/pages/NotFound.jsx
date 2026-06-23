import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';

export default function NotFound() {
  useSeo({ title: 'Страница не найдена', description: 'Запрошенная страница не найдена.' });

  return (
    <div className="container" style={{ padding: '96px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>404</h1>
      <p style={{ marginBottom: 24, color: 'var(--color-text-secondary)' }}>Страница не найдена.</p>
      <Link to="/" className="btn btn-amber">На главную</Link>
    </div>
  );
}
