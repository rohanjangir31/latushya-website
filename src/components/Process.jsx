import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PROCESS_STEPS } from '../data/content';
import { TextReveal } from '../utils/animations';

// ─────────────────────────────────────────────────────────────────────────────
// PROCESS V2 — Premium Vertical Timeline
//
// Visual language: Apple · Poliform · Molteni&C
//
// Structure:
//   Section header (eyebrow + 48px heading + intro + hairline rule)
//   Vertical timeline — left-anchored connecting line
//   Each step: 64px gold ordinal · 32px title · 18px description (3 lines max)
//   Timeline line reveals from top to bottom as section scrolls into view
//
// Hover: ordinal brightens · no cards · no scale · no borders around content
// ─────────────────────────────────────────────────────────────────────────────

const EASE   = [0.25, 0.46, 0.45, 0.94];
const DISPLAY = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const SANS    = "'Inter', system-ui, sans-serif";

// ── Single timeline step ──────────────────────────────────────────────────────
function TimelineStep({ step, index, isLast }) {
  const stepRef = useRef(null);
  const inView  = useInView(stepRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.1, ease: EASE }}
      style={{
        display: 'grid',
        // Desktop: [dot col] [content col]
        // The dot column is 1px wide — the actual dot/node is positioned there
        gridTemplateColumns: '40px 1fr',
        gap: '0 40px',
        position: 'relative',
      }}
    >
      {/* ── Left: dot node on the line ──────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* The dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3, ease: EASE }}
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: 'rgba(212,175,55,0.55)',
            flexShrink: 0,
            // Align the dot with the baseline of the 64px ordinal number
            marginTop: '22px',
          }}
        />
        {/* Connecting line segment — full height of this step's content */}
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: '1px',
              background: 'linear-gradient(to bottom, rgba(212,175,55,0.18), rgba(212,175,55,0.06))',
              marginTop: '12px',
            }}
          />
        )}
      </div>

      {/* ── Right: ordinal + title + description ────────────────────────── */}
      <div style={{ paddingBottom: isLast ? 0 : '80px' }}>
        {/* Ordinal — 64px gold */}
        <span
          style={{
            fontFamily: DISPLAY,
            fontSize: '64px',
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'rgba(212,175,55,0.22)',
            display: 'block',
            marginBottom: '20px',
            userSelect: 'none',
          }}
        >
          {step.step}
        </span>

        {/* Title — 32px */}
        <h3
          style={{
            fontFamily: DISPLAY,
            fontSize: '32px',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            lineHeight: 1.1,
            color: 'rgba(255,255,255,0.90)',
            marginBottom: '16px',
          }}
        >
          {step.title}
        </h3>

        {/* Thin gold rule */}
        <div
          style={{
            width: '28px',
            height: '1px',
            background: 'rgba(212,175,55,0.30)',
            marginBottom: '16px',
          }}
        />

        {/* Description — 18px, 3 lines max */}
        <p
          style={{
            fontFamily: SANS,
            fontSize: '18px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.42)',
            maxWidth: '500px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Animated vertical line that reveals top-to-bottom ────────────────────────
function RevealLine({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '19px',          // center of the 40px dot column
        top: 0,
        bottom: 0,
        width: '1px',
        background: 'linear-gradient(to bottom, rgba(212,175,55,0.25), rgba(212,175,55,0.05) 85%, transparent)',
        transformOrigin: 'top',
        scaleY,
        pointerEvents: 'none',
      }}
    />
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Process() {
  const headerRef   = useRef(null);
  const listRef     = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section
      id="process"
      style={{
        background: '#111111',
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
        <div ref={headerRef} style={{ marginBottom: '96px' }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
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
              How We Work
            </span>
          </motion.div>

          {/* Heading row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <TextReveal
              text="Our _Process_"
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: '#ffffff',
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.75, delay: 0.28 }}
              style={{
                fontFamily: SANS,
                fontSize: '0.8125rem',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.30)',
                maxWidth: '240px',
                flexShrink: 0,
              }}
            >
              A seamless six-step journey from first meeting to final handover — designed around you.
            </motion.p>
          </div>

          {/* Hairline rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.32, ease: EASE }}
            style={{
              height: '1px',
              background: 'linear-gradient(to right, rgba(212,175,55,0.22), rgba(212,175,55,0.05) 55%, transparent)',
              transformOrigin: 'left',
              marginTop: '36px',
            }}
          />
        </div>

        {/* ── VERTICAL TIMELINE ────────────────────────────────────────────── */}
        {/*
          Two-column grid on desktop: timeline left (max 680px) | empty right
          Single column on mobile.
        */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 680px) 1fr',
            gap: '0',
          }}
          className="process-timeline-grid"
        >
          <div ref={listRef} style={{ position: 'relative' }}>
            {/* Scroll-driven reveal line */}
            <RevealLine containerRef={listRef} />

            {/* Steps */}
            {PROCESS_STEPS.map((step, i) => (
              <TimelineStep
                key={step.step}
                step={step}
                index={i}
                isLast={i === PROCESS_STEPS.length - 1}
              />
            ))}
          </div>

          {/* Right column intentionally empty — whitespace is the luxury signal */}
          <div />
        </div>

      </div>

      {/* Responsive override — single column on tablet/mobile */}
      <style>{`
        @media (max-width: 900px) {
          .process-timeline-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
