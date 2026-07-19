import PageTransition from '../components/PageTransition';
import FAQ from '../components/FAQ';
import ContactComponent from '../components/Contact';

export default function Contact() {
  return (
    <PageTransition>
      <FAQ />
      <ContactComponent />
    </PageTransition>
  );
}
