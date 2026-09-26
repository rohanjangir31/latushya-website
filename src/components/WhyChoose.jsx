import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// WHY CHOOSE US V3 — Editorial Capabilities List
//
// Visual language: Poliform / Molteni&C / Minotti
// Structure:
//   Section header (eyebrow + 48px heading + intro + hairline rule)
//   72px gap
//   Six full-width rows, each separated by a hairline divider
//   Each row: [72px ordinal] [32px title + 18px description] [whitespace]
//
// Hover: number brightens · heading +4px · divider brightens · no scale
// ─────────────────────────────────────────────────────────────────────────────

const EASE = [0.25, 0.46, 0.45, 0.94];
const DISPLAY = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const SANS    = "'Inter', system-ui, sans-serif";

const CAPABILITIES = [
  {
    num: '01',
    title: 'Built for your space',
    description:
      'We measure your actual room and design around those exact numbers. Nothing is pulled from a catalogue or resized to fit.',
  },
  {
    num: '02',
    title: 'CenturyPly & Greenply boards',
    description:
      'The core of all our work is made from ISI-certified boards that hold screws well, resist moisture, and stay flat for years.',
  },
  {
    num: '03',
    title: 'Fitted to the millimetre',
    description:
      'Our carpenters have done this hundreds of times. Everything is checked on-site before we leave, and we do not move on until it is right.',
  },
  {
    num: '04',
    title: 'Häfele, Hettich & Blum hardware',
    description:
      'These are the brands serious furniture makers use globally. Soft-close, silent runners, and fittings that genuinely last — not just for the first year.',
  },
  {
    num: '05',
    title: 'We come back if something is off',
    description:
      'After installation we do a walkthrough with you. If something is not sitting right, we fix it. That is not a policy — it is just how we work.',
  },
  {
    num: '06',
    title: 'One person, start to finish',
    description:
      'You will not be passed between departments. The same person you meet at the first visit is the one managing your project through to handover.',
  },
];

// ── Single capability row ─────────────────────────────────────────────────────
function CapabilityRow({ item, index, totalInView }) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef(null);
  const rowInView = useInView(rowRef, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 16 }}
      animate={rowInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.07, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', cursor: 'default' }}
    >
      {/* Top divider — brightens on hover */}
      <div
        style={{
          height: '1px',
          background: hovered
            ? 'rgba(223, 76, 115,0.25)'
            : 'rgba(223, 76, 115,0.11)',
          transition: 'background 350ms ease',
        }}
      />

      {/* Row body */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--row-cols, 120px 1fr)',
          alignItems: 'center',
          paddingTop: '32px',
          paddingBottom: '32px',
          gap: '0',
        }}
        className="[--row-cols:80px_1fr] md:[--row-cols:120px_1fr]"
      >
        {/* ── Left: ordinal number ─────────────────────────────────────── */}
        <div style={{ alignSelf: 'flex-start', paddingTop: '6px' }}>
          <span
            style={{
              fontFamily: DISPLAY,
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: hovered ? 'rgba(223, 76, 115,0.55)' : 'rgba(223, 76, 115,0.20)',
              transition: 'color 350ms ease',
              userSelect: 'none',
              display: 'block',
            }}
            className="text-5xl md:text-[72px]"
          >
            {item.num}
          </span>
        </div>

        {/* ── Right: title + description ───────────────────────────────── */}
        <div>
          <motion.h3
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.35, ease: [0.0, 0.0, 0.2, 1] }}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              letterSpacing: '-0.015em',
              lineHeight: 1.1,
              color: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.88)',
              marginBottom: '10px',
              transition: 'color 350ms ease',
            }}
            className="text-2xl md:text-[32px]"
          >
            {item.title}
          </motion.h3>

          <p
            style={{
              fontFamily: SANS,
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.62)',
              maxWidth: '500px',
            }}
            className="text-sm md:text-lg"
          >
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function WhyChoose() {
  const headerRef = useRef(null);
  const inView     = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section
      id="why-choose"
      style={{
        background: '#050B14',
      }}
      className="py-16 lg:pt-12 lg:pb-20"
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 4vw, 64px)',
          paddingRight: 'clamp(24px, 4vw, 64px)',
        }}
      >

        {/* ── SECTION HEADER ──────────────────────────────────────────────── */}
        <div ref={headerRef} style={{ marginBottom: '72px' }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}
          >
            <div
              style={{
                width: '18px',
                height: '1px',
                background: 'linear-gradient(to right, #DF4C73, #5AB9EA)',
              }}
            />
            <span
              style={{
                fontFamily: SANS,
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: 'rgba(223, 76, 115,0.65)',
              }}
            >
              Why Latushya
            </span>
          </motion.div>

          {/* Heading row: 48px title + intro text */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: '#ffffff',
              }}
            >
              What makes us{' '}
              <em style={{ fontStyle: 'italic', color: '#DF4C73' }}>different</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.75, delay: 0.28 }}
              style={{
                fontFamily: SANS,
                fontSize: '0.8125rem',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.30)',
                maxWidth: '220px',
                flexShrink: 0,
              }}
            >
              The way we work, explained plainly.
            </motion.p>
          </div>

          {/* Hairline rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.32, ease: EASE }}
            style={{
              height: '1px',
              background: 'linear-gradient(to right, rgba(90, 185, 234,0.22), rgba(223, 76, 115,0.05) 55%, transparent)',
              transformOrigin: 'left',
              marginTop: '36px',
            }}
          />
        </div>

        {/* ── CAPABILITIES LIST ────────────────────────────────────────────── */}
        <div>
          {CAPABILITIES.map((item, i) => (
            <CapabilityRow
              key={item.num}
              item={item}
              index={i}
              totalInView={inView}
            />
          ))}

          {/* Bottom divider — closes the list */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(to right, #DF4C73, #5AB9EA)',
            }}
          />
        </div>

      </div>
    </section>
  );
}
