import PageTransition from '../components/PageTransition';
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
