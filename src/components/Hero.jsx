import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { COMPANY } from '../data/content';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY  = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleConsult = () => {
    if (COMPANY.whatsapp) {
      window.open(
        `https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I'm%20interested%20in%20a%20custom%20wardrobe.`,
        '_blank'
      );
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen min-h-[700px] overflow-hidden bg-black-deep"
    >
      {/* ── FULL-BLEED IMAGE — covers entire viewport ─────────
          This is the key difference from the previous two-column hero.
          The image is the canvas; text sits ON TOP of it.
          Approach: Poliform / Molteni&C — cinematic, not layout-based. ── */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90"
          alt="Luxury custom wardrobe — Latushya Bangalore"
          className="w-full h-full object-cover scale-[1.06]"
          loading="eager"
          fetchPriority="high"
        />
        {/* Heavy bottom gradient — where the text lives */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/30 to-transparent" style={{ background: 'linear-gradient(to top, #0F0F0F 0%, #0F0F0F 12%, rgba(15,15,15,0.65) 38%, rgba(15,15,15,0.08) 70%, rgba(15,15,15,0.35) 100%)' }} />
        {/* Left vignette */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,15,15,0.5) 0%, transparent 50%)' }} />
      </motion.div>

      {/* ── GHOST TEXT — "LATUSHYA" at 22vw opacity 2.4% ──────
          Sits behind the image gradient, creating typographic depth.
          Visible only where the gradient is lighter (upper-mid area). ── */}
      <div
        className="absolute inset-0 z-[1] overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute font-display font-bold text-white whitespace-nowrap leading-none"
          style={{
            fontSize: 'clamp(8rem, 24vw, 22rem)',
            opacity: 0.024,
            letterSpacing: '-0.03em',
            bottom: '28%',
            left: '-1vw',
          }}
        >
          LATUSHYA
        </motion.span>
      </div>

      {/* ── MAIN CONTENT — pinned to bottom third ─────────────
          Inspired by how luxury brand books caption their photographs:
          large editorial text at the foot of the image, not beside it. ── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute bottom-0 left-0 right-0 z-[2] pb-12 md:pb-16"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          {/* ── Specialty label ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 mb-5 md:mb-7"
          >
            <div className="w-5 h-px bg-gold" />
            <span className="text-gold text-[8px] md:text-[9px] tracking-[0.4em] uppercase font-medium">
              {COMPANY.specialty}
            </span>
            <div className="h-px bg-gray-luxury/25 w-10 hidden sm:block" />
            <span className="text-gray-light/30 text-[8px] tracking-[0.3em] uppercase hidden sm:block">
              Bangalore, India
            </span>
          </motion.div>

          {/* ── HEADLINE — each line clips up independently ── */}
          <div className="mb-7 md:mb-9">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-light text-white leading-[0.88] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(2.9rem, 8.5vw, 7.8rem)' }}
              >
                Luxury
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-light leading-[0.88] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(2.9rem, 8.5vw, 7.8rem)' }}
              >
                <em className="not-italic" style={{ fontStyle: 'italic', color: '#D4AF37' }}>Wardrobes,</em>
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.70, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-light leading-[0.88] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(2.9rem, 8.5vw, 7.8rem)', color: 'rgba(255,255,255,0.65)' }}
              >
                Crafted For You
              </motion.h1>
            </div>
          </div>

          {/* ── Thin full-width ruled separator ──────────────── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.95, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px bg-gold/20 origin-left mb-7 md:mb-8"
          />

          {/* ── Bottom info row: description left, CTAs right ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <p className="text-gray-subtle text-sm leading-relaxed max-w-[260px] font-light">
              {COMPANY.subTagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button onClick={handleConsult} className="btn-gold" id="hero-cta-consult">
                <span>Book Free Consultation</span>
              </button>
              <a
                href="#portfolio"
                onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-outline"
                id="hero-cta-portfolio"
              >
                <span>View Our Work</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── EDITORIAL CHROME ──────────────────────────────────── */}

      {/* Floating caption card — top right, hovers on the image */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute top-28 right-8 z-[3] hidden xl:block"
      >
        <div className="border border-gold/18 bg-black-deep/60 backdrop-blur-md px-5 py-4 min-w-[130px]">
          <div className="text-gold/60 text-[7px] tracking-[0.45em] uppercase mb-1.5">Specialists in</div>
          <div className="text-white/80 text-[8px] tracking-[0.28em] uppercase leading-relaxed">
            Sliding · Walk-In<br />Hinged · Luxury
          </div>
          <div className="mt-3 h-px bg-gold/20" />
          <div className="mt-2 text-gray-light/35 text-[7px] tracking-[0.32em] uppercase">Custom Built</div>
        </div>
      </motion.div>

      {/* Left vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute left-5 lg:left-8 top-[20%] bottom-[28%] w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent origin-top hidden lg:block z-[3]"
      />

      {/* Vertical caption text — right edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.9 }}
        className="absolute right-5 top-1/2 -translate-y-1/2 writing-vertical text-[8px] tracking-[0.38em] text-gray-light/22 uppercase z-[3] hidden xl:block"
      >
        Premium Wardrobe Specialists
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
      >
        <span className="text-gray-light/25 text-[8px] tracking-[0.38em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={12} className="text-gold/45" />
        </motion.div>
      </motion.div>
    </section>
  );
}
