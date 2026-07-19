import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { PROJECTS } from '../data/content';
import ImageReveal from './ImageReveal';

// ─────────────────────────────────────────────────────────────────────────
// PORTFOLIO V3 — Editorial Architecture-Firm Layout
//
// Visual hierarchy:
//   1. Featured lead   → full-width cinematic image, caption below
//   2. Split Left      → image 62% | text block 38%, text centered in col
//   3. Split Right     → text block 38% | image 62%  (alternates)
//
// Rules:
//   • Image always dominates — text is service, never decoration on image
//   • 140px between projects — space is the luxury signal
//   • Title 36px Cormorant · Location 12px gold caps · Description 3 lines max
//   • "View Project →" text link — underline appears on hover only
//   • Hover: scale 1.02 + very subtle dark wash, nothing else
// ─────────────────────────────────────────────────────────────────────────

const EASE = [0.25, 0.46, 0.45, 0.94];

// Font tokens — keep consistent throughout
const DISPLAY = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";

// Distinct wardrobe images for each placeholder slot
const SLOT_IMAGES = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80',
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80',
  'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
];

// ── PLACEHOLDER OVERLAY ───────────────────────────────────────────────────
// Renders the image dimly, with a reserved-space marker at center.
function PlaceholderOverlay({ index, imageHeight, hovered }) {
  const src = SLOT_IMAGES[index % SLOT_IMAGES.length];
  return (
    <>
      {/* Background image — dimmed but visible */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        loading="lazy"
        decoding="async"
      />
      {/* Dark overlay — lightened 12% so wardrobe detail shows */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? 'rgba(8,6,4,0.64)'
            : 'rgba(8,6,4,0.72)',
          transition: 'background 0.6s ease',
        }}
      />
      {/* Reserved marker */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div style={{
          width: '40px', height: '40px',
          border: '1px solid rgba(212,175,55,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: DISPLAY, fontSize: '1.1rem',
            fontWeight: 300, color: 'rgba(212,175,55,0.4)',
          }}>L</span>
        </div>
        <span style={{
          fontFamily: SANS, fontSize: '0.5rem',
          letterSpacing: '0.45em', textTransform: 'uppercase',
          color: 'rgba(212,175,55,0.35)',
        }}>Photography Pending</span>
      </div>
    </>
  );
}

// ── LIVE IMAGE ────────────────────────────────────────────────────────────
function LiveImage({ project, hovered }) {
  return (
    <>
      <img
        src={project.image}
        alt={project.projectType || project.category}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        loading="lazy"
        decoding="async"
      />
      {/* Subtle overlay that deepens on hover */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0)',
          transition: 'background 0.7s ease',
        }}
      />
    </>
  );
}

// ── TEXT LINK — "View Project →" ──────────────────────────────────────────
function ViewLink({ id }) {
  const [h, setH] = useState(false);
  return (
    <a
      href="#contact"
      id={id}
      onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: SANS,
        fontSize: '0.6875rem',
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: h ? '#D4AF37' : 'rgba(212,175,55,0.65)',
        textDecoration: 'none',
        paddingBottom: '3px',
        borderBottom: h ? '1px solid rgba(212,175,55,0.6)' : '1px solid transparent',
        transition: 'color 0.35s ease, border-color 0.35s ease',
        cursor: 'pointer',
      }}
    >
      <span>View Project</span>
      <span style={{ fontSize: '0.75rem', letterSpacing: 0 }}>→</span>
    </a>
  );
}

// ── TEXT BLOCK — shared by all split layouts ──────────────────────────────
function TextBlock({ project, delay, inView, align = 'left' }) {
  const isPlaceholder = project.isPlaceholder;

  // Short description — kept to 2–3 lines max
  const description = isPlaceholder
    ? "Installation photography will be added as each wardrobe project is completed and signed off."
    : (project.description || "A bespoke wardrobe installation designed and built for this client's home in Bangalore.");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={{ textAlign: align }}
    >
      {/* Location — 12px, gold, uppercase */}
      <p style={{
        fontFamily: SANS,
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'rgba(212,175,55,0.72)',
        marginBottom: '14px',
      }}>
        {project.location || 'Bangalore'}
      </p>

      {/* Category label — very quiet */}
      <p style={{
        fontFamily: SANS,
        fontSize: '0.5625rem',
        letterSpacing: '0.36em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.28)',
        marginBottom: '10px',
      }}>
        {project.category}
      </p>

      {/* Title — 36px Cormorant */}
      <h3 style={{
        fontFamily: DISPLAY,
        fontSize: '36px',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        color: isPlaceholder ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.9)',
        marginBottom: '20px',
      }}>
        {isPlaceholder ? 'Coming Soon' : project.title}
      </h3>

      {/* Thin gold rule */}
      <div style={{
        width: '32px',
        height: '1px',
        background: 'rgba(212,175,55,0.3)',
        marginBottom: '20px',
        marginLeft: align === 'right' ? 'auto' : 0,
        marginRight: align === 'left' ? 'auto' : 0,
      }} />

      {/* Description — 3 lines max */}
      <p style={{
        fontFamily: SANS,
        fontSize: '0.9375rem',
        fontWeight: 300,
        lineHeight: 1.95,
        color: 'rgba(255,255,255,0.50)',
        maxWidth: '420px',
        marginBottom: '28px',
        marginLeft: align === 'right' ? 'auto' : 0,
        marginRight: align === 'left' ? 'auto' : 0,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {description}
      </p>

      {/* View Project → */}
      {!isPlaceholder && (
        <ViewLink id={`project-link-${project.id}`} />
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// LAYOUT PATTERNS
// ─────────────────────────────────────────────────────────────────────────

// ── 1. FEATURED LEAD — full-width, caption below ─────────────────────────
function FeaturedProject({ project, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, delay: 0.15, ease: EASE }}
    >
      {/* Image — full width, ~58vh */}
      <ImageReveal delay={0.15}>
        <div
          data-cursor="view"
          className="relative overflow-hidden w-full"
          style={{ height: 'clamp(340px, 58vh, 680px)', cursor: 'none', borderRadius: '12px' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {project.isPlaceholder ? (
            <PlaceholderOverlay index={0} hovered={hovered} />
          ) : (
            <LiveImage project={project} hovered={hovered} />
          )}
        </div>
      </ImageReveal>

      {/* Caption — left-aligned, beneath image, max 480px */}
      <div style={{ paddingTop: '32px', maxWidth: '520px' }}>

        {/* Index + location row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <span style={{
            fontFamily: SANS, fontSize: '0.5625rem',
            letterSpacing: '0.42em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.22)',
          }}>01</span>
          <div style={{ width: '24px', height: '1px', background: 'rgba(212,175,55,0.3)' }} />
          <span style={{
            fontFamily: SANS, fontSize: '0.75rem',
            fontWeight: 500, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'rgba(212,175,55,0.72)',
          }}>
            {project.location || 'Bangalore'}
          </span>
        </div>

        {/* Category */}
        <p style={{
          fontFamily: SANS, fontSize: '0.5625rem',
          letterSpacing: '0.36em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)', marginBottom: '10px',
        }}>
          {project.category}
        </p>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          style={{
            fontFamily: DISPLAY, fontSize: '36px',
            fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1,
            color: project.isPlaceholder ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.9)',
            marginBottom: '18px',
          }}
        >
          {project.isPlaceholder ? 'Coming Soon' : project.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.48, ease: EASE }}
          style={{
            fontFamily: SANS, fontSize: '0.9375rem', fontWeight: 300,
            lineHeight: 1.95, color: 'rgba(255,255,255,0.48)',
            marginBottom: '24px',
            maxWidth: '420px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.isPlaceholder
            ? 'Installation photography will be added as each interior project is completed and handed over to our clients.'
            : (project.description || 'A bespoke interior installation, designed around the client\'s lifestyle and aesthetic vision.')}
        </motion.p>

        {!project.isPlaceholder && <ViewLink id="portfolio-cta-featured" />}
      </div>
    </motion.div>
  );
}

// ── 2. SPLIT PROJECT — image left, text right  OR  text left, image right ─
// imageLeft = true  → [image 62%] [text 38%]
// imageLeft = false → [text 38%] [image 62%]
function SplitProject({ project, index, inView, delay, imageLeft = true }) {
  const [hovered, setHovered] = useState(false);

  const imgNumber = String(index + 1).padStart(2, '0');

  const ImageCol = (
    <div className="lg:col-span-8">
      <ImageReveal delay={delay}>
        <div
          data-cursor="view"
          className="relative overflow-hidden"
          style={{ height: 'clamp(300px, 44vw, 560px)', cursor: 'none', borderRadius: '12px' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {project.isPlaceholder ? (
            <PlaceholderOverlay index={index} hovered={hovered} />
          ) : (
            <LiveImage project={project} hovered={hovered} />
          )}
        </div>
      </ImageReveal>
    </div>
  );

  const TextCol = (
    <div className="lg:col-span-4 flex items-center">
      <div style={{
        paddingLeft: imageLeft ? '40px' : 0,
        paddingRight: imageLeft ? 0 : '40px',
        width: '100%',
      }}>
        {/* Index counter */}
        <p style={{
          fontFamily: SANS, fontSize: '0.5rem',
          letterSpacing: '0.5em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.18)', marginBottom: '28px',
        }}>
          {imgNumber}
        </p>
        <TextBlock
          project={project}
          delay={delay + 0.15}
          inView={inView}
          align="left"
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-0">
      {imageLeft ? (
        <>{ImageCol}{TextCol}</>
      ) : (
        <>{TextCol}{ImageCol}</>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-50px' });

  const allPlaceholder = PROJECTS.every(p => p.isPlaceholder);
  const [p0, p1, p2, p3, p4] = PROJECTS;

  return (
    <section
      id="portfolio"
      style={{
        background: '#111111',
        paddingTop: '130px',
        paddingBottom: '150px',
      }}
    >
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-8 lg:px-16"
      >

        {/* ── SECTION HEADER ───────────────────────────────────────────── */}
        <div style={{ marginBottom: '88px' }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}
          >
            <div style={{ width: '18px', height: '1px', background: 'rgba(212,175,55,0.65)' }} />
            <span style={{
              fontFamily: SANS, fontSize: '0.5625rem',
              letterSpacing: '0.38em', textTransform: 'uppercase',
              color: 'rgba(212,175,55,0.65)',
            }}>Design Masterpieces</span>
          </motion.div>

          {/* Headline */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px' }}>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.08, ease: EASE }}
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                fontWeight: 300,
                letterSpacing: '-0.015em',
                lineHeight: 1.05,
                color: '#ffffff',
              }}
            >
              Spaces We've{' '}
              <em style={{ fontStyle: 'italic', color: '#D4AF37' }}>Transformed</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{
                fontFamily: SANS, fontSize: '0.75rem',
                lineHeight: 1.8, color: 'rgba(255,255,255,0.3)',
                maxWidth: '220px', flexShrink: 0,
              }}
            >
              Real photography added as each installation is completed.
            </motion.p>
          </div>

          {/* Ruled line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            style={{
              height: '1px',
              background: 'linear-gradient(to right, rgba(212,175,55,0.22), rgba(212,175,55,0.05) 55%, transparent)',
              transformOrigin: 'left',
              marginTop: '36px',
            }}
          />
        </div>

        {/* ── PROJECT 1 — FEATURED LEAD (full width) ─────────────────────
            The single most prominent piece. Full container width.
            Caption lives below, left-aligned, maximum 520px.
        ────────────────────────────────────────────────────────────────── */}
        {p0 && <FeaturedProject project={p0} inView={inView} />}

        {/* ── PROJECT 2 — SPLIT LEFT (image 62% | text 38%) ──────────────
            First split entry. Image dominates left two-thirds.
        ────────────────────────────────────────────────────────────────── */}
        {p1 && (
          <div style={{ marginTop: '188px' }}>
            <SplitProject
              project={p1}
              index={1}
              inView={inView}
              delay={0.12}
              imageLeft={true}
            />
          </div>
        )}

        {/* ── PROJECT 3 — SPLIT RIGHT (text 38% | image 62%) ─────────────
            Mirror. Text on left, image on right.
        ────────────────────────────────────────────────────────────────── */}
        {p2 && (
          <div style={{ marginTop: '188px' }}>
            <SplitProject
              project={p2}
              index={2}
              inView={inView}
              delay={0.10}
              imageLeft={false}
            />
          </div>
        )}

        {/* ── PROJECT 4 — SPLIT LEFT ──────────────────────────────────────
        ────────────────────────────────────────────────────────────────── */}
        {p3 && (
          <div style={{ marginTop: '188px' }}>
            <SplitProject
              project={p3}
              index={3}
              inView={inView}
              delay={0.10}
              imageLeft={true}
            />
          </div>
        )}

        {/* ── PROJECT 5 — SPLIT RIGHT ─────────────────────────────────────
        ────────────────────────────────────────────────────────────────── */}
        {p4 && (
          <div style={{ marginTop: '188px' }}>
            <SplitProject
              project={p4}
              index={4}
              inView={inView}
              delay={0.10}
              imageLeft={false}
            />
          </div>
        )}

        {/* ── PLACEHOLDER NOTICE ───────────────────────────────────────── */}
        {allPlaceholder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              marginTop: '96px',
              paddingLeft: '18px',
              borderLeft: '1px solid rgba(212,175,55,0.15)',
            }}
          >
            <p style={{
              fontFamily: SANS, fontSize: '0.8125rem',
              lineHeight: 1.85, color: 'rgba(255,255,255,0.28)',
            }}>
              Our completed installations are being professionally photographed.{' '}
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>
                Project images arriving soon.
              </span>
            </p>
          </motion.div>
        )}

        {/* ── SECTION CTA ──────────────────────────────────────────────────
            One quiet line, centered. No button.
        ────────────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          style={{ marginTop: '100px', textAlign: 'center' }}
        >
          {/* Thin decorative line before CTA */}
          <div style={{
            width: '1px', height: '48px',
            background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.3))',
            margin: '0 auto 24px',
          }} />

          <a
            href="#contact"
            id="portfolio-cta"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: SANS,
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(212,175,55,0.7)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#D4AF37';
              e.currentTarget.querySelector('span.label').style.borderBottomColor = 'rgba(212,175,55,0.65)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(212,175,55,0.7)';
              e.currentTarget.querySelector('span.label').style.borderBottomColor = 'transparent';
            }}
          >
            <span
              className="label"
              style={{
                borderBottom: '1px solid transparent',
                paddingBottom: '2px',
                transition: 'border-color 0.35s ease',
              }}
            >
              View Complete Portfolio
            </span>
            <span style={{ fontSize: '0.8rem', letterSpacing: 0 }}>→</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
