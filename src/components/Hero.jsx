import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { COMPANY } from '../data/content';

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
      className="relative h-screen min-h-[640px] overflow-hidden bg-[#0a0a0a]"
    >
      {/* ── FULL-BLEED BACKGROUND IMAGE / VIDEO ──────────────────
          On mobile, we place the video inside an aspect-video container with
          CSS mask-image to dissolve the top and bottom edges directly into #0a0a0a.
          This eliminates ALL sharp box edges on ANY DevTools or mobile screen size
          while guaranteeing 100% of the word "LATUSHYA" stays in bounds!
          On desktop, it switches to absolute inset-0 full-bleed object-cover. ── */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 z-0 will-change-transform bg-[#0a0a0a] flex flex-col justify-start lg:block pt-14 sm:pt-20 lg:pt-0"
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
            transparent by 55% width. Only the text zone is dark.
            Hidden on mobile so it doesn't black out the video. ── */}
        <div
          className="absolute inset-0 hidden lg:block pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(4,2,1,0.97) 0%, rgba(4,2,1,0.88) 22%, rgba(4,2,1,0.64) 38%, rgba(0,0,0,0.14) 56%, transparent 70%)',
          }}
        />

        {/* ── MOBILE SEAMLESS BACKGROUND BLEND ────────────────────
            Gently transitions the upper video area into the lower dark canvas where text sits ── */}
        <div
          className="absolute inset-0 lg:hidden pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, #0a0a0a 0%, transparent 15%, transparent 55%, rgba(10,10,10,0.85) 72%, #0a0a0a 88%, #0a0a0a 100%)',
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
        <div className="w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-16 pb-16 lg:pb-24">
          {/* Constrain text to left ~52% on desktop, full width on mobile */}
          <div className="max-w-[620px]">

            {/* ── EYEBROW LABEL ──────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="flex items-center gap-3 mb-6 lg:mb-7"
            >
              <div
                className="h-px w-6"
                style={{ background: 'rgba(212, 150, 195,0.7)' }}
              />
              <span
                className="uppercase font-medium"
                style={{
                  fontSize: '0.625rem',
                  letterSpacing: '0.32em',
                  color: 'rgba(212, 150, 195,0.75)',
                }}
              >
                {COMPANY.specialty}
              </span>
            </motion.div>

            {/* ── HEADLINE ─────────────────────────────────────────
                Four lines. Clear editorial cascade.
                Line 1: "Luxury" — entry, restrained weight
                Line 2: "Wardrobes" — VISUAL ANCHOR, largest type
                Lines 3–4: italic subtitle, tightly coupled gap
                All display / serif. Weight + size do the work. ── */}
            <div className="mb-7 lg:mb-9">

              {/* Line 1: Luxury — entry word, slightly smaller */}
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
                  Premium
                </motion.h1>
              </div>

              {/* Line 2: Wardrobes — THE VISUAL ANCHOR, biggest type */}
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
                  Interiors
                </motion.h1>
              </div>

              {/* Lines 3–4: italic subtitle — tightly coupled, 16px gap from Wardrobes */}
              {/* Line 3: Crafted Around */}
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
                  Crafted For
                </motion.h1>
              </div>

              {/* Line 4: Your Lifestyle — single pink accent */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.72, ease: EASE_OUT_EXPO }}
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 3.4rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.15,
                    color: '#D496C3',
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
                background: 'rgba(212, 150, 195,0.28)',
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
                maxWidth: '540px',
                marginBottom: 'clamp(1.8rem, 3vw, 2.6rem)',
              }}
            >
              {COMPANY.subTagline}
            </motion.p>

            {/* ── CTA BUTTONS ──────────────────────────────────
                Height: 64px. Gap: 24px. Desktop side-by-side.
                Mobile: stacked. ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 1.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row items-start"
              style={{ gap: '24px' }}
            >
              {/* Primary — Solid Pink */}
              <button
                onClick={handleConsult}
                id="hero-cta-consult"
                className="font-sans"
                style={{
                  height: '72px',
                  paddingLeft: '2.75rem',
                  paddingRight: '2.75rem',
                  background: '#D496C3',
                  color: '#0a0a0a',
                  fontWeight: 600,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background 0.4s ease, color 0.4s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E8CB6A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#D496C3';
                }}
              >
                Book Consultation
              </button>

              {/* Secondary — Ghost/Outline */}
              <a
                href="#portfolio"
                onClick={handlePortfolio}
                id="hero-cta-portfolio"
                className="font-sans"
                style={{
                  height: '64px',
                  paddingLeft: '2.25rem',
                  paddingRight: '2.25rem',
                  background: 'transparent',
                  color: 'rgba(212, 150, 195,0.90)',
                  fontWeight: 500,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(212, 150, 195,0.45)',
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
                  e.currentTarget.style.borderColor = 'rgba(212, 150, 195,0.85)';
                  e.currentTarget.style.color = '#D496C3';
                  e.currentTarget.style.background = 'rgba(212, 150, 195,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 150, 195,0.45)';
                  e.currentTarget.style.color = 'rgba(212, 150, 195,0.90)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                View Portfolio
              </a>
            </motion.div>

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
            background: 'linear-gradient(to bottom, rgba(212, 150, 195,0.55), rgba(212, 150, 195,0))',
          }}
        />
      </motion.div>
    </section>
  );
}
