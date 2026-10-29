import PageTransition from '../components/PageTransition';
import FAQ from '../components/FAQ';
import ContactComponent from '../components/Contact';
import SEO from '../components/SEO';

export default function Contact() {
  return (
    <PageTransition>
      <SEO
        title="Contact Latushya | Book Free 3D Design Consultation Bangalore"
        description="Schedule a consultation with Latushya for custom wardrobes, modular kitchens, or turnkey home interiors in Bangalore. Site visits and 3D quotes available."
        canonicalUrl="https://latushya.com/contact"
      />
      <FAQ />
      <ContactComponent />
    </PageTransition>
  );
}
