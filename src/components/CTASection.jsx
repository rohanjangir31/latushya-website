import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { COMPANY } from '../data/content';

// Full-viewport immersive CTA section
// Sits between Portfolio and Materials
export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleCTA = () => {
    if (COMPANY.whatsapp) {
      window.open(
        `https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I%27m%20interested%20in%20an%20interior%20consultation.`,
        '_blank'
      );
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28 overflow-hidden flex items-center"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/projects/interior-living-teal.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black-deep/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black-deep/70 via-transparent to-black-deep/70" />
      </div>

      {/* Pink ruled lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink/40 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-pink text-[9px] tracking-[0.32em] uppercase font-medium block mb-6"
        >
          The Design Concierge
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-white leading-tight mb-6"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          A lifestyle curated{' '}
          <span className="italic text-pink">for you.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-gray-subtle text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10"
        >
          Experience our tailored approach to interior architecture. From initial concept to flawless execution, our design experts provide a highly personalized, hand-held service.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCTA}
          className="relative overflow-hidden rounded-full inline-flex items-center justify-center text-white font-semibold bg-gradient-to-r from-pink to-pink-light shadow-[0_4px_15px_rgba(223,76,115,0.25)] px-8 py-3.5 tracking-widest text-[0.65rem] uppercase transition-all duration-300"
          id="cta-section-btn"
        >
          <span className="relative z-10">Request a Private Consultation</span>
        </motion.button>
      </div>
    </section>
  );
}
