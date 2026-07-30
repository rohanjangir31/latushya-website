import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import WhyChoose from '../components/WhyChoose';
import CredibilityBand from '../components/Statistics';
import Philosophy from '../components/Philosophy';
import WardrobeShowcase from '../components/WardrobeShowcase';
import FeaturedProject from '../components/FeaturedProject';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Philosophy />
      <WardrobeShowcase />
      <WhyChoose />
      <CredibilityBand />
      <FeaturedProject />
      <Testimonials />
      <CTASection />
    </PageTransition>
  );
}
