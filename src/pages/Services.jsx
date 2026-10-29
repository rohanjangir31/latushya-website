import PageTransition from '../components/PageTransition';
import ServicesOverview from '../components/Services';
import SEO from '../components/SEO';

export default function Services() {
  return (
    <PageTransition>
      <SEO
        title="Interior Design & Modular Kitchen Services Bangalore | Latushya"
        description="Comprehensive interior services in Bangalore: luxury turnkey home interiors, modular kitchens, custom wardrobes, and curated living room architecture."
        canonicalUrl="https://www.latushya.com/services"
      />
      <ServicesOverview />
    </PageTransition>
  );
}
