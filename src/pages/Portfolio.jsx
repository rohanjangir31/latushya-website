import PageTransition from '../components/PageTransition';
import Projects from '../components/Projects';
import BeforeAfter from '../components/BeforeAfter';
import Gallery from '../components/Gallery';

export default function Portfolio() {
  return (
    <PageTransition>
      <Projects />
      <BeforeAfter />
      <Gallery />
    </PageTransition>
  );
}
