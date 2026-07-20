import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import WhyChoose from '../components/WhyChoose';
import CredibilityBand from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <WhyChoose />
      <CredibilityBand />
      <Testimonials />
      <CTASection />
    </PageTransition>
  );
}
