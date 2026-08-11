import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../data/content';
import QuoteForm from './QuoteForm';

// ─────────────────────────────────────────────────────────────
// HERO V2  —  Editorial / Magazine-Cover Composition
//
// Design logic:
//   • Image pushed RIGHT via object-position: 70% center
//   • Left ~45% of canvas = near-dark breathing space
//   • Gradient ONLY behind text column, not across full image
//   • Typography: single display face, one clear hierarchy
//   • Content block anchored to lower-left third
//   • No watermark · No ghost text · No floating cards
// ─────────────────────────────────────────────────────────────

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Subtle parallax: image drifts slightly slower than scroll
  const imageY  = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  // Content fades and lifts gently as user scrolls away
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const handleConsult = () => {
    if (COMPANY.whatsapp) {
      window.open(
        `https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I'm%20interested%20in%20a%20consultation.`,
        '_blank'
      );
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePortfolio = (e) => {
    e.preventDefault();
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen min-h-[640px] overflow-hidden bg-[#03070E]"
    >
      {/* ── FULL-BLEED BACKGROUND IMAGE / VIDEO ──────────────────
          On mobile, we place the video inside an aspect-video container with
          CSS mask-image to dissolve the top and bottom edges directly into #03070E.
          This eliminates ALL sharp box edges on ANY DevTools or mobile screen size
          while guaranteeing 100% of the word "LATUSHYA" stays in bounds!
          On desktop, it switches to absolute inset-0 full-bleed object-cover. ── */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 z-0 will-change-transform bg-[#03070E] flex flex-col justify-start lg:block pt-14 sm:pt-20 lg:pt-0"
      >
        <div
          className="w-[140%] -left-[20%] relative lg:w-full lg:left-0 lg:absolute lg:inset-0 lg:h-full aspect-video lg:aspect-auto pointer-events-none"
          style={{
            WebkitMaskImage: 'var(--mobile-mask, none)',
            WebkitMaskComposite: 'source-in',
            maskImage: 'var(--mobile-mask, none)',
            maskComposite: 'intersect'
          }}
        >
          <style>{`
            @media (max-width: 1023px) {
              .aspect-video {
                --mobile-mask: linear-gradient(to bottom, transparent 0%, black 18%, black 75%, transparent 100%);
              }
            }
          `}</style>
          <video
            src="/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-100 lg:scale-[1.35] transition-all duration-700"
            style={{ objectPosition: 'center center' }}
          />
        </div>

        {/* Base darkening — very restrained */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.18)' }}
        />

        {/* ── DESKTOP PRIMARY TEXT GRADIENT ────────────────────
            Radial/linear gradient anchored at the LEFT that fades to
            transparent quickly. Light enough to see the video clearly. ── */}
        <div
          className="absolute inset-0 hidden lg:block pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(4,2,1,0.7) 0%, rgba(4,2,1,0.4) 25%, transparent 60%)',
          }}
        />

        {/* ── MOBILE SEAMLESS BACKGROUND BLEND ────────────────────
            Gently transitions the upper video area into the lower dark canvas where text sits ── */}
        <div
          className="absolute inset-0 lg:hidden pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, #03070E 0%, transparent 15%, transparent 55%, rgba(10,10,10,0.85) 72%, #03070E 88%, #03070E 100%)',
          }}
        />

        {/* Bottom gradient — grounds the composition */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(6,4,2,0.85) 0%, rgba(6,4,2,0.30) 25%, transparent 50%)',
          }}
        />
      </motion.div>

      {/* ── CONTENT BLOCK — lower-left third ─────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex items-end"
      >
        <div className="w-full max-w-[1600px] mx-auto px-5 md:px-8 lg:px-8 xl:px-12 pb-16 lg:pb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-8 pt-24 lg:pt-0">
          
          {/* Left Text Block */}
          <div className="max-w-[560px] w-full">

            {/* ── EYEBROW LABEL ──────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="flex items-center gap-3 mb-6 lg:mb-7"
            >
              <div
                className="h-px w-6"
                style={{ background: 'linear-gradient(to right, #DF4C73, #5AB9EA)' }}
              />
              <span
                className="uppercase font-medium"
                style={{
                  fontSize: '0.625rem',
                  letterSpacing: '0.32em',
                  color: 'rgba(223, 76, 115,0.75)',
                }}
              >
                {COMPANY.specialty}
              </span>
            </motion.div>

            {/* ── HEADLINE ───────────────────────────────────────── */}
            <div className="mb-7 lg:mb-9">

              {/* Line 1: Bespoke */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.42, ease: EASE_OUT_EXPO }}
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.8rem, 4.8vw, 4.2rem)',
                    fontWeight: 300,
                    letterSpacing: '0.04em',
                    lineHeight: 1.0,
                    color: 'rgba(255,255,255,0.78)',
                    textTransform: 'uppercase',
                  }}
                >
                  Bespoke
                </motion.h1>
              </div>

              {/* Line 2: Wardrobes */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.52, ease: EASE_OUT_EXPO }}
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2.8rem, 8.5vw, 7rem)',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 0.92,
                    color: '#ffffff',
                    marginBottom: '16px',
                  }}
                >
                  Wardrobes
                </motion.h1>
              </div>

              {/* Line 3: & Premium Interiors */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.62, ease: EASE_OUT_EXPO }}
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 3.4rem)',
                    fontWeight: 300,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.15,
                    color: 'rgba(255,255,255,0.68)',
                    fontStyle: 'italic',
                  }}
                >
                  & Premium Interiors
                </motion.h1>
              </div>

              {/* Line 4: crafted for */}
              <div className="overflow-hidden mt-2 lg:mt-3 mb-1">
                <motion.p
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.68, ease: EASE_OUT_EXPO }}
                  className="font-sans"
                  style={{
                    fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
                    fontWeight: 500,
                    letterSpacing: '0.25em',
                    textTransform: 'lowercase',
                    color: 'rgba(255,255,255,0.45)',
                  }}
                >
                  crafted for
                </motion.p>
              </div>

              {/* Line 5: Your Lifestyle */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.74, ease: EASE_OUT_EXPO }}
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 3.4rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.15,
                    color: '#DF4C73',
                    fontStyle: 'italic',
                  }}
                >
                  Your Lifestyle.
                </motion.h1>
              </div>
            </div>

            {/* ── THIN RULE ──────────────────────────────────── */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.0, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                height: '1px',
                width: '3rem',
                background: 'linear-gradient(to right, #DF4C73, #5AB9EA)',
                transformOrigin: 'left',
                marginBottom: 'clamp(1rem, 2vw, 1.6rem)',
              }}
            />

            {/* ── BODY COPY ──────────────────────────────────── */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-sans"
              style={{
                fontSize: 'clamp(0.875rem, 1.15vw, 1.0rem)',
                fontWeight: 300,
                lineHeight: 1.95,
                color: 'rgba(255,255,255,0.58)',
                maxWidth: '460px',
                marginBottom: 'clamp(1.8rem, 3vw, 2.6rem)',
              }}
            >
              {COMPANY.subTagline}
            </motion.p>

            {/* ── CTA BUTTONS ────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 1.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row items-center sm:items-start"
              style={{ gap: '16px' }}
            >
              <button
                onClick={handleConsult}
                id="hero-cta-consult"
                className="font-sans shadow-[0_4px_20px_rgba(223, 76, 115,0.3)]"
                style={{
                  height: '48px',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  background: 'linear-gradient(135deg, #DF4C73 0%, #F07595 100%)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background 0.4s ease, color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#5AB9EA';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(90, 185, 234,0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #DF4C73 0%, #F07595 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(223, 76, 115,0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Book Consultation
              </button>

              <Link
                to="/portfolio"
                id="hero-cta-portfolio"
                className="font-sans"
                style={{
                  height: '48px',
                  paddingLeft: '1.75rem',
                  paddingRight: '1.75rem',
                  background: 'transparent',
                  color: '#DF4C73',
                  fontWeight: 500,
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(90, 185, 234, 0.4)',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'border-color 0.4s ease, color 0.4s ease, background 0.4s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#5AB9EA';
                  e.currentTarget.style.color = '#5AB9EA';
                  e.currentTarget.style.background = 'rgba(90, 185, 234, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(223, 76, 115,0.45)';
                  e.currentTarget.style.color = '#5AB9EA';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                View Portfolio
              </Link>
            </motion.div>

          </div>

          {/* Right Floating Quote Form */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0 relative z-20 lg:-translate-y-32">
             <QuoteForm />
          </div>

        </div>
      </motion.div>

      {/* ── SCROLL INDICATOR — minimal, bottom-center ─────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.0 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        style={{ gap: '6px' }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '36px',
            background: 'linear-gradient(to bottom, rgba(223, 76, 115,0.55), rgba(223, 76, 115,0))',
          }}
        />
      </motion.div>
    </section>
  );
}
