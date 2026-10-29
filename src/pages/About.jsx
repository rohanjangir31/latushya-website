import PageTransition from '../components/PageTransition';
import AboutComponent from '../components/About';
import SEO from '../components/SEO';

export default function About() {
  return (
    <PageTransition>
      <SEO
        title="About Latushya | Premium Bespoke Interior Design Studio Bangalore"
        description="Learn about Latushya: Bangalore's dedicated interior studio delivering on-site bespoke craftsmanship, transparent execution, and 500+ completed projects."
        canonicalUrl="https://www.latushya.com/about"
      />
      <AboutComponent />
    </PageTransition>
  );
}
