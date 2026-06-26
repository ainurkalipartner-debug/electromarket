import { useSeo } from '../hooks/useSeo';
import { SITE } from '../data/siteConfig';
import Hero from '../components/home/Hero';
import AdvantagesStrip from '../components/home/AdvantagesStrip';
import PopularCategories from '../components/home/PopularCategories';
import ServicesTeaser from '../components/home/ServicesTeaser';
import ProjectsTeaser from '../components/home/ProjectsTeaser';
import WhyUs from '../components/home/WhyUs';
import Faq from '../components/home/Faq';
import CtaBanner from '../components/home/CtaBanner';

export default function Home() {
  useSeo({
    title: 'Электрооборудование 0,4–10 кВ в Атырау',
    description:
      'Поставка кабельной арматуры, оборудования 10 кВ, трансформаторов, щитового оборудования, автоматики и комплектующих по всему Казахстану. Под заказ, запрос цены и КП.',
    canonical: 'https://electromarket.kz/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.name,
      telephone: SITE.phone,
      address: { '@type': 'PostalAddress', streetAddress: SITE.address, addressCountry: 'KZ' },
    },
  });

  return (
    <>
      <Hero />
      <AdvantagesStrip />
      <PopularCategories />
      <ServicesTeaser />
      <ProjectsTeaser />
      <WhyUs />
      <Faq />
      <CtaBanner />
    </>
  );
}
