import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Header from './Header';
import CategoryNav from './CategoryNav';
import Footer from './Footer';
import WhatsAppFloatButton from './WhatsAppFloatButton';

export default function Layout() {
  return (
    <>
      <TopBar />
      <Header />
      <CategoryNav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  );
}
