import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Phone,
  Maximize2,
  X
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { COMPANY } from '../data/content';
import { trackWhatsAppConversion } from '../utils/analytics';

const CASE_STUDY_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.latushya.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": "https://www.latushya.com/portfolio"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Sobha City Thanisandra Sliding Wardrobe",
          "item": "https://www.latushya.com/portfolio/sobha-city-sliding-wardrobe"
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Sobha City Thanisandra: Custom Dual-Tone Sliding Wardrobe Case Study",
      "description": "A detailed case study of a bespoke floor-to-ceiling sliding wardrobe designed and installed at Sobha City, Thanisandra, Bangalore using beige and black lacquered glass and German hardware.",
      "image": "https://www.latushya.com/assets/wardrobes/sliding-beige-black.jpg",
      "author": {
        "@type": "Organization",
        "name": "Latushya",
        "url": "https://www.latushya.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Latushya",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.latushya.com/logo-2d.png"
        }
      },
      "datePublished": "2026-10-30",
      "mainEntityOfPage": "https://www.latushya.com/portfolio/sobha-city-sliding-wardrobe"
    }
  ]
};

const PROJECT_GALLERY = [
  {
    id: 'hero-view',
    src: '/assets/wardrobes/sliding-beige-black.jpg',
    title: 'Completed Installation at Sobha City',
    caption: 'Full-height dual-tone sliding wardrobe in neutral beige and deep black lacquered glass with matte black aluminium profiles.',
    alt: 'Custom floor to ceiling sliding wardrobe with dual-tone beige and black lacquered glass installed at Sobha City Thanisandra Bangalore'
  },
  {
    id: 'mullion-detail',
    src: '/assets/wardrobes/sliding-beige-horizontal-bands.jpg',
    title: 'Horizontal Division & Glass Profile Detail',
    caption: 'Precision-aligned horizontal architectural dividers creating balanced geometric proportions across the bedroom wall.',
    alt: 'Detail of horizontal aluminium mullion divider and high-gloss beige lacquered glass wardrobe panel'
  },
  {
    id: 'glide-mechanism',
    src: '/assets/wardrobes/sliding-beige-mirror.jpg',
    title: 'Integrated Mirror & Reflective Glide Surface',
    caption: 'Reflective glass panel integration designed to bounce natural daylight across the master bedroom.',
    alt: 'Reflective lacquered glass and mirror sliding wardrobe panel reflecting ambient daylight in bedroom'
  }
];

export default function SobhaCityCaseStudy() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleWhatsAppInquiry = () => {
    trackWhatsAppConversion();
    const message = encodeURIComponent(
      "Hello Latushya! I was reading your Sobha City Thanisandra sliding wardrobe case study and would like to discuss a similar custom wardrobe for my home."
    );
    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <PageTransition>
      <SEO
        title="Sobha City Thanisandra Sliding Wardrobe Case Study | Latushya Bangalore"
        description="Case study of a bespoke floor-to-ceiling sliding wardrobe at Sobha City, Thanisandra, Bangalore. Dual-tone lacquered glass with German Häfele & Hettich hardware."
        canonicalUrl="https://www.latushya.com/portfolio/sobha-city-sliding-wardrobe"
        ogImage="https://www.latushya.com/assets/wardrobes/sliding-beige-black.jpg"
        schemaData={CASE_STUDY_SCHEMA}
      />

      <article className="bg-[#03070E] text-[#E2E8F0] min-h-screen pt-28 lg:pt-36 pb-24 selection:bg-[#DF4C73]/30 selection:text-white">
        
        {/* ── BREADCRUMBS & EYEBROW ── */}
        <header className="max-w-5xl mx-auto px-6 lg:px-8 mb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-xs tracking-wider uppercase text-white/50 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#DF4C73] font-medium truncate">Sobha City Thanisandra</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#5AB9EA] tracking-wide mb-4">
            <MapPin size={13} className="text-[#DF4C73]" />
            <span>Sobha City, Thanisandra Main Road, North Bangalore</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-white tracking-tight leading-[1.15] mb-6">
            Dual-Tone Geometric Sliding Wardrobe: <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#DF4C73] to-[#5AB9EA]">Sobha City, Thanisandra</span>
          </h1>

          <p className="text-base md:text-lg text-white/70 max-w-3xl leading-relaxed font-sans font-light">
            An in-depth case study of an on-site custom installation engineered to maximize vertical bedroom volume in North Bangalore. Designed with monolithic beige and black lacquered glass panels and whisper-quiet German sliding motion hardware.
          </p>

          {/* Quick Facts Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-white/40 mb-1">Project Type</span>
              <span className="text-sm md:text-base font-medium text-white">Custom FTC Sliding</span>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-white/40 mb-1">Execution Time</span>
              <span className="text-sm md:text-base font-medium text-white flex items-center gap-1.5">
                <Clock size={14} className="text-[#DF4C73]" /> 18 Days On-Site
              </span>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-white/40 mb-1">Surface Finish</span>
              <span className="text-sm md:text-base font-medium text-white">Lacquered Glass</span>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-white/40 mb-1">Core Substrate</span>
              <span className="text-sm md:text-base font-medium text-white">Century Ply BWP</span>
            </div>
          </div>
        </header>

        {/* ── CINEMATIC HERO IMAGE ── */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-20">
          <div 
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#080f1a] group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            onClick={() => setSelectedPhoto(PROJECT_GALLERY[0])}
          >
            <div className="aspect-[16/10] md:aspect-[21/11] w-full overflow-hidden">
              <img 
                src={PROJECT_GALLERY[0].src} 
                alt={PROJECT_GALLERY[0].alt}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex items-end justify-between gap-4">
              <p className="text-xs md:text-sm text-white/80 max-w-xl backdrop-blur-sm bg-black/40 px-3.5 py-2 rounded-lg border border-white/10">
                {PROJECT_GALLERY[0].caption}
              </p>
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-xs text-white backdrop-blur-md">
                <Maximize2 size={13} /> Click to expand
              </span>
            </div>
          </div>
        </section>

        {/* ── THE DESIGN CHALLENGE ── */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 mb-20">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <div className="sticky top-28">
                <span className="text-xs tracking-[0.25em] uppercase text-[#DF4C73] font-semibold block mb-2">01. Spatial Context</span>
                <h2 className="text-2xl md:text-3xl font-display font-light text-white leading-tight">
                  The High-Rise Bedroom Challenge
                </h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#DF4C73] to-[#5AB9EA] mt-4" />
              </div>
            </div>

            <div className="md:col-span-8 space-y-6 text-white/70 text-base leading-relaxed font-light">
              <p>
                In high-rise residential developments like Sobha City in Thanisandra, master bedrooms typically present a ceiling height between 9.5 and 10 feet. Conventional factory-made modular wardrobes are manufactured in standard 7-foot or 8-foot modules. When installed, these catalog pieces leave an awkward 1.5-foot to 2-foot open cavity beneath the ceiling. This dead space gathers dust and breaks the architectural rhythm of the bedroom.
              </p>
              <p>
                Furthermore, standard hinged wardrobe doors require 600mm to 800mm of outward swing clearance. In contemporary master suites where a king-size bed and accompanying nightstands occupy central floor area, outward-opening doors routinely collide with furniture and severely restrict walking corridors.
              </p>
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 text-white/80">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#5AB9EA]" /> Key Architectural Constraints Identified:
                </h3>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-[#DF4C73] mt-0.5">•</span>
                    <span><strong>Vertical Fitment:</strong> Eliminating dust-trapping overhead voids with true continuous floor-to-ceiling alignment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DF4C73] mt-0.5">•</span>
                    <span><strong>Clearance Efficiency:</strong> Maintaining full pedestrian clearance beside the bed frame without door-swing collisions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#DF4C73] mt-0.5">•</span>
                    <span><strong>Visual Balance:</strong> Introducing bold, contemporary geometry without visually overwhelming the sleeping sanctuary.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE ARCHITECTURAL SOLUTION ── */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 mb-20">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <div className="sticky top-28">
                <span className="text-xs tracking-[0.25em] uppercase text-[#DF4C73] font-semibold block mb-2">02. Engineered Solution</span>
                <h2 className="text-2xl md:text-3xl font-display font-light text-white leading-tight">
                  Design Decisions & Materials
                </h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#DF4C73] to-[#5AB9EA] mt-4" />
              </div>
            </div>

            <div className="md:col-span-8 space-y-6 text-white/70 text-base leading-relaxed font-light">
              <p>
                To resolve both the clearance restriction and the vertical proportion challenge, Latushya designed a fully customized sliding wardrobe solution constructed directly around the room's laser-measured dimensions.
              </p>

              {/* Solution Pillars */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-xl bg-[#080f1a] border border-white/10">
                  <h3 className="text-base font-medium text-white mb-2">Asymmetric Geometric Composition</h3>
                  <p className="text-sm text-white/60 leading-normal">
                    Combining warm neutral beige panels with deep black glass accents creates a modern graphic focal point that grounds the bedroom without making it feel enclosed.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080f1a] border border-white/10">
                  <h3 className="text-base font-medium text-white mb-2">Ultra-Slim Black Profiles</h3>
                  <p className="text-sm text-white/60 leading-normal">
                    The structural framing uses anodized matte black aluminium profiles engineered to securely carry the structural weight of large glass shutters with minimal visible frame borders.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080f1a] border border-white/10">
                  <h3 className="text-base font-medium text-white mb-2">German Motion Hardware</h3>
                  <p className="text-sm text-white/60 leading-normal">
                    Top-hung heavy-duty tracks paired with German soft-close dampers (Häfele/Hettich) ensure shutters glide with finger-touch ease and close silently without rebounding.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080f1a] border border-white/10">
                  <h3 className="text-base font-medium text-white mb-2">Century Ply BWP Carcase</h3>
                  <p className="text-sm text-white/60 leading-normal">
                    Built entirely on calibrated Boiling Water Proof (BWP) plywood, resisting seasonal humidity fluctuations common during Bangalore's monsoon cycles.
                  </p>
                </div>
              </div>

              <p>
                Unlike generic sliding wardrobes that use separate overhead box shutters for the loft, this unit incorporates the upper storage behind continuous, full-height sliding doors. The monolithic facade creates a clean architectural elevation that visually raises the ceiling height.
              </p>
            </div>
          </div>
        </section>

        {/* ── PHOTO GALLERY GRID ── */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 mb-20">
          <div className="border-t border-white/10 pt-12">
            <span className="text-xs tracking-[0.25em] uppercase text-[#DF4C73] font-semibold block mb-2">03. Visual Documentation</span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-white mb-8">
              Project Photographs & Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {PROJECT_GALLERY.slice(1).map((item) => (
                <div 
                  key={item.id}
                  className="rounded-xl overflow-hidden border border-white/10 bg-[#080f1a] group cursor-pointer"
                  onClick={() => setSelectedPhoto(item)}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src={item.src} 
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECHNICAL SPECIFICATION TABLE ── */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 mb-20">
          <div className="border-t border-white/10 pt-12">
            <span className="text-xs tracking-[0.25em] uppercase text-[#DF4C73] font-semibold block mb-2">04. Technical Specifications</span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-white mb-8">
              Verified Material & Hardware Schedule
            </h2>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-left text-sm text-white/70">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-white border-b border-white/10 font-sans">
                  <tr>
                    <th scope="col" className="py-4 px-6">Component</th>
                    <th scope="col" className="py-4 px-6">Specification</th>
                    <th scope="col" className="py-4 px-6">Functional Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-light">
                  <tr>
                    <th scope="row" className="py-4 px-6 font-medium text-white">Carcase / Body</th>
                    <td className="py-4 px-6">Century Ply BWP-Grade Plywood</td>
                    <td className="py-4 px-6 text-white/60">Termite-proof, moisture-resistant core preventing door sagging</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-4 px-6 font-medium text-white">Shutter Facade</th>
                    <td className="py-4 px-6">Dual-Tone Lacquered Safety Glass</td>
                    <td className="py-4 px-6 text-white/60">High-gloss reflective beige and black finish; easy to clean, scratch-resistant</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-4 px-6 font-medium text-white">Frame Profiles</th>
                    <td className="py-4 px-6">Slim Anodized Aluminium</td>
                    <td className="py-4 px-6 text-white/60">Matte black finish; structural glass retention with minimum visual perimeter</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-4 px-6 font-medium text-white">Sliding Hardware</th>
                    <td className="py-4 px-6">German Soft-Close Mechanism</td>
                    <td className="py-4 px-6 text-white/60">Häfele / Hettich dampers preventing door bounce and ensuring silent closure</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-4 px-6 font-medium text-white">Internal Organizers</th>
                    <td className="py-4 px-6">Tandem Soft-Close Drawers & Rails</td>
                    <td className="py-4 px-6 text-white/60">Heavy-duty hanging rods for suits and full-extension utility drawers</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-4 px-6 font-medium text-white">Loft Integration</th>
                    <td className="py-4 px-6">Continuous Vertical Doors</td>
                    <td className="py-4 px-6 text-white/60">Loft storage concealed within primary doors; no separate top cabinets</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── PRACTICAL BENEFITS FOR HOMEOWNERS ── */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 mb-20">
          <div className="border-t border-white/10 pt-12">
            <span className="text-xs tracking-[0.25em] uppercase text-[#DF4C73] font-semibold block mb-2">05. Everyday Living</span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-white mb-6">
              Practical Living Benefits
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#080f1a] border border-white/10">
                <CheckCircle2 className="text-[#DF4C73] mb-4" size={24} />
                <h3 className="text-base font-medium text-white mb-2">Unrestricted Movement</h3>
                <p className="text-sm text-white/60 leading-relaxed font-light">
                  Sliding doors glide strictly along the wall axis, leaving the space between the wardrobe and the bed completely open even during active use.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#080f1a] border border-white/10">
                <CheckCircle2 className="text-[#5AB9EA] mb-4" size={24} />
                <h3 className="text-base font-medium text-white mb-2">Zero Dust Accumulation</h3>
                <p className="text-sm text-white/60 leading-relaxed font-light">
                  By sealing the wardrobe ceiling-to-floor, homeowners never need to clean dust off high wardrobe tops, common in standard modular units.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#080f1a] border border-white/10">
                <CheckCircle2 className="text-white/80 mb-4" size={24} />
                <h3 className="text-base font-medium text-white mb-2">Natural Light Bounce</h3>
                <p className="text-sm text-white/60 leading-relaxed font-light">
                  The gloss lacquered glass surface catches daylight entering through Thanisandra's open balconies, reflecting illumination into darker bedroom corners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW TO COMMISSION A SIMILAR PROJECT ── */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 mb-20">
          <div className="border-t border-white/10 pt-12">
            <span className="text-xs tracking-[0.25em] uppercase text-[#DF4C73] font-semibold block mb-2">06. Commissioning Process</span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-white mb-8">
              How to Commission a Custom Wardrobe for Your Home
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-2xl font-display text-[#DF4C73] block mb-2">Step 01</span>
                <h3 className="text-sm font-medium text-white mb-1">Spatial Consultation</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  We discuss your bedroom dimensions, storage requirements, and finish preferences in-person or on call.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-2xl font-display text-[#5AB9EA] block mb-2">Step 02</span>
                <h3 className="text-sm font-medium text-white mb-1">Laser Measurement</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Our team visits your home in Bangalore to take millimeter-precise floor-to-ceiling measurements.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-2xl font-display text-[#DF4C73] block mb-2">Step 03</span>
                <h3 className="text-sm font-medium text-white mb-1">3D Design & Quote</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  You receive an itemized proposal with clear material tiers, hardware specs, and transparent pricing.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-2xl font-display text-[#5AB9EA] block mb-2">Step 04</span>
                <h3 className="text-sm font-medium text-white mb-1">Direct Installation</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Our in-house carpenters execute on-site with zero middlemen, completing installation within 18–21 days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONVERSION CALL TO ACTION ── */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 mb-20">
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-gradient-to-br from-[#080f1a] via-[#050B14] to-[#03070E] border border-white/15 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DF4C73]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#5AB9EA]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs tracking-[0.25em] uppercase text-[#DF4C73] font-semibold block mb-3">
                Bangalore On-Site Consultation
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-light text-white mb-4 leading-tight">
                Plan a Custom Floor-to-Ceiling Wardrobe for Your Home
              </h2>
              <p className="text-sm md:text-base text-white/70 mb-8 font-light leading-relaxed">
                Whether you live in Thanisandra, Whitefield, Indiranagar, or HSR Layout, our design team can visit your site, assess your space, and provide a 3D layout plan with zero obligations.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DF4C73] to-[#F07595] text-white font-medium text-sm hover:shadow-[0_4px_25px_rgba(223,76,115,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href={`tel:${COMPANY.phone}`}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={15} />
                  <span>Call +91 97414 15887</span>
                </a>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full text-white/80 hover:text-white text-sm font-medium transition-colors"
                >
                  Book Online Consultation →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERNAL LINKING ARCHITECTURE ── */}
        <footer className="max-w-5xl mx-auto px-6 lg:px-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <span>Related Latushya Guides:</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <Link to="/wardrobes" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">
                Custom Wardrobes Bangalore
              </Link>
              <Link to="/collections/sliding-wardrobes" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">
                Sliding Wardrobes Collection
              </Link>
              <Link to="/materials" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">
                German Hardware & Materials
              </Link>
              <Link to="/services" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">
                Turnkey Home Interiors
              </Link>
            </div>
          </div>
        </footer>

        {/* ── LIGHTBOX MODAL ── */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <div 
                className="max-w-4xl max-h-[85vh] overflow-hidden rounded-xl border border-white/20 bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedPhoto.src} 
                  alt={selectedPhoto.alt}
                  className="w-full h-auto max-h-[75vh] object-contain mx-auto"
                />
                <div className="p-4 bg-[#080f1a] text-center border-t border-white/10">
                  <h4 className="text-sm font-medium text-white mb-1">{selectedPhoto.title}</h4>
                  <p className="text-xs text-white/60">{selectedPhoto.caption}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </article>
    </PageTransition>
  );
}
