import PageTransition from '../components/PageTransition';
import Projects from '../components/Projects';
import BeforeAfter from '../components/BeforeAfter';
import Gallery from '../components/Gallery';
import SEO from '../components/SEO';
import { INTERIOR_PROJECTS_DATA } from '../data/content';

export default function Portfolio() {
  return (
    <PageTransition>
      <SEO
        title="Interior Design & Wardrobe Portfolio Bangalore | Real Projects | Latushya"
        description="Browse real completed interior design and custom wardrobe installations across Bangalore, including Prestige Golfshire, Sobha City, and Assetz Marq."
        canonicalUrl="https://www.latushya.com/portfolio"
      />
      <Projects 
        projectsData={INTERIOR_PROJECTS_DATA}
        eyebrow="Portfolio"
        title={<>Interior <em style={{ fontStyle: 'italic', color: '#DF4C73' }}>Architecture</em></>}
        description="Explore our collection of comprehensive turnkey luxury interiors, spanning spatial design to custom furnishings."
        paddingTop="120px"
      />
      <BeforeAfter />
      <Gallery />
    </PageTransition>
  );
}
