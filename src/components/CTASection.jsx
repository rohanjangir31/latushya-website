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
      className="relative h-[60vh] min-h-[420px] max-h-[600px] overflow-hidden flex items-center"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=85"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black-deep/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black-deep/70 via-transparent to-black-deep/70" />
      </div>

      {/* Gold ruled lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-gold text-[9px] tracking-[0.32em] uppercase font-medium block mb-6"
        >
          The Design Concierge
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-white leading-tight mb-8"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
        >
          A lifestyle curated{' '}
          <span className="italic text-gold">for you.</span>
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
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCTA}
          className="btn-gold text-sm"
          id="cta-section-btn"
        >
          <span>Request a Private Consultation</span>
        </motion.button>
      </div>
    </section>
  );
}
