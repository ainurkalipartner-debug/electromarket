import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QuoteListProvider } from './context/QuoteListContext';
import { LanguageProvider } from './i18n/LanguageContext';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home.jsx'));
const Catalog = lazy(() => import('./pages/Catalog.jsx'));
const Category = lazy(() => import('./pages/Category.jsx'));
const Product = lazy(() => import('./pages/Product.jsx'));
const Search = lazy(() => import('./pages/Search.jsx'));
const Manufacturers = lazy(() => import('./pages/Manufacturers.jsx'));
const ManufacturerDetail = lazy(() => import('./pages/ManufacturerDetail.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Delivery = lazy(() => import('./pages/Delivery.jsx'));
const Contacts = lazy(() => import('./pages/Contacts.jsx'));
const RequestQuote = lazy(() => import('./pages/RequestQuote.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  return (
    <LanguageProvider>
      <QuoteListProvider>
        <Suspense fallback={<div style={{ padding: 64, textAlign: 'center' }}>Загрузка…</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:categorySlug" element={<Category />} />
              <Route path="/product/:productSlug" element={<Product />} />
              <Route path="/search" element={<Search />} />
              <Route path="/manufacturers" element={<Manufacturers />} />
              <Route path="/manufacturers/:manufacturerSlug" element={<ManufacturerDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/request-quote" element={<RequestQuote />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </QuoteListProvider>
    </LanguageProvider>
  );
}
