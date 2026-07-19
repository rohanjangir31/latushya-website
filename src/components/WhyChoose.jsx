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
    title: 'Bespoke Design',
    description:
      'Every space is conceived from scratch around your dimensions, lifestyle, and interior palette — no templates, no compromise.',
  },
  {
    num: '02',
    title: 'Premium Materials',
    description:
      'Century Ply and Greenply substrates paired with premium laminates and finishes, selected for structural integrity and lasting beauty.',
  },
  {
    num: '03',
    title: 'Precision Craftsmanship',
    description:
      'Millimetre-accurate joinery and installation by our experienced in-house carpentry team, verified at every stage.',
  },
  {
    num: '04',
    title: 'Installation Excellence',
    description:
      'Häfele and Hettich German hardware — soft-close mechanisms, silent runners, and fittings built to outlast decades of daily use.',
  },
  {
    num: '05',
    title: 'Lifetime Support',
    description:
      'Post-installation support included as standard. We return to adjust, refine, or repair — because your home should perform indefinitely.',
  },
  {
    num: '06',
    title: 'Personal Consultation',
    description:
      'Your project begins with an in-home visit. We listen, measure precisely, and design only after we understand your home and your habits.',
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
            ? 'rgba(212,175,55,0.25)'
            : 'rgba(212,175,55,0.11)',
          transition: 'background 350ms ease',
        }}
      />

      {/* Row body */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '120px 1fr',
          alignItems: 'center',
          paddingTop: '48px',
          paddingBottom: '48px',
          gap: '0',
        }}
      >
        {/* ── Left: ordinal number ─────────────────────────────────────── */}
        <div style={{ alignSelf: 'flex-start', paddingTop: '6px' }}>
          <span
            style={{
              fontFamily: DISPLAY,
              fontSize: '72px',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: hovered ? 'rgba(212,175,55,0.55)' : 'rgba(212,175,55,0.20)',
              transition: 'color 350ms ease',
              userSelect: 'none',
              display: 'block',
            }}
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
              fontSize: '32px',
              fontWeight: 400,
              letterSpacing: '-0.015em',
              lineHeight: 1.1,
              color: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.88)',
              marginBottom: '14px',
              transition: 'color 350ms ease',
            }}
          >
            {item.title}
          </motion.h3>

          <p
            style={{
              fontFamily: SANS,
              fontSize: '18px',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.62)',
              maxWidth: '500px',
            }}
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
        background: '#0F0F0F',
        paddingTop: '160px',
        paddingBottom: '160px',
      }}
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
                background: 'rgba(212,175,55,0.65)',
              }}
            />
            <span
              style={{
                fontFamily: SANS,
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: 'rgba(212,175,55,0.65)',
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
              Six Reasons to{' '}
              <em style={{ fontStyle: 'italic', color: '#D4AF37' }}>Choose Us</em>
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
              The principles behind every wardrobe we design and build for Bangalore homes.
            </motion.p>
          </div>

          {/* Hairline rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.32, ease: EASE }}
            style={{
              height: '1px',
              background: 'linear-gradient(to right, rgba(212,175,55,0.22), rgba(212,175,55,0.05) 55%, transparent)',
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
              background: 'rgba(212,175,55,0.11)',
            }}
          />
        </div>

      </div>
    </section>
  );
}
