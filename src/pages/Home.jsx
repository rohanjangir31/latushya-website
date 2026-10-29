import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import WhyChoose from '../components/WhyChoose';
import CredibilityBand from '../components/Statistics';
import Philosophy from '../components/Philosophy';
import FeaturedProject from '../components/FeaturedProject';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <PageTransition>
      <SEO
        title="Latushya — Custom Wardrobes & Luxury Turnkey Interiors | Bangalore"
        description="Latushya crafts bespoke floor-to-ceiling sliding wardrobes, walk-in closets, modular kitchens, and luxury turnkey interiors on-site across Bangalore. Book a free consultation."
        canonicalUrl="https://latushya.com/"
      />
      <Hero />
      <Philosophy />
      <div className="section-divider" />
      <WhyChoose />
      <div className="section-divider" />
      <CredibilityBand />
      <div className="section-divider" />
      <FeaturedProject />
      <div className="section-divider" />
      <Testimonials />
      <CTASection />
    </PageTransition>
  );
}
