import PageTransition from '../components/PageTransition';
import MaterialsComponent from '../components/Materials';
import SEO from '../components/SEO';

export default function Materials() {
  return (
    <PageTransition>
      <SEO
        title="Premium Interior Materials & German Hardware | Century Ply & Häfele | Latushya"
        description="Discover the materials behind Latushya interiors: Century BWP plywood, Greenply, Saint-Gobain glass, and Häfele & Hettich German fittings."
        canonicalUrl="https://latushya.com/materials"
      />
      <MaterialsComponent />
    </PageTransition>
  );
}
