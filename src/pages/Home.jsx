import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import WhyChoose from '../components/WhyChoose';
import TrustBand from '../components/TrustBand';
import CredibilityBand from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <WhyChoose />
      <TrustBand />
      <div className="section-divider" />
      <CredibilityBand />
      <Testimonials />
      <CTASection />
    </PageTransition>
  );
}
