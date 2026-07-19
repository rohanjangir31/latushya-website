import PageTransition from '../components/PageTransition';
import AboutComponent from '../components/About';
import CredibilityBand from '../components/Statistics';

export default function About() {
  return (
    <PageTransition>
      <AboutComponent />
      <CredibilityBand />
    </PageTransition>
  );
}
