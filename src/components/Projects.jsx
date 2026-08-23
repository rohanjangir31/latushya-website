import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
//   • Title 36px Cormorant · Location 12px pink caps · Description 3 lines max
//   • "View Project →" text link — underline appears on hover only
//   • Hover: scale 1.02 + very subtle dark wash, nothing else
// ─────────────────────────────────────────────────────────────────────────

const EASE = [0.25, 0.46, 0.45, 0.94];

// Font tokens — keep consistent throughout
const DISPLAY = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";



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
function ViewLink({ onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
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
        color: h ? '#DF4C73' : 'rgba(223, 76, 115,0.65)',
        textDecoration: 'none',
        paddingBottom: '3px',
        borderBottom: h ? '1px solid rgba(223, 76, 115,0.6)' : '1px solid transparent',
        transition: 'color 0.35s ease, border-color 0.35s ease',
        cursor: 'pointer',
      }}
    >
      <span>View Project</span>
      <span style={{ fontSize: '0.75rem', letterSpacing: 0 }}>→</span>
    </button>
  );
}

// ── TEXT BLOCK — shared by all split layouts ──────────────────────────────
function TextBlock({ project, delay, inView, align = 'left', onOpenGallery }) {
  const isPlaceholder = project.isPlaceholder;

  // Short description — kept to 2–3 lines max
  const description = isPlaceholder
    ? "Installation photography will be added as each wardrobe project is completed and signed off."
    : (project.description || "A custom wardrobe installation designed and built for this client's home in Bangalore.");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={{ textAlign: align }}
    >
      {/* Location — 12px, pink, uppercase */}
      <p style={{
        fontFamily: SANS,
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'rgba(223, 76, 115,0.72)',
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

      {/* Thin pink rule */}
      <div style={{
        width: '32px',
        height: '1px',
        background: 'linear-gradient(to right, #DF4C73, #5AB9EA)',
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
        <ViewLink onClick={onOpenGallery} />
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// LAYOUT PATTERNS
// ─────────────────────────────────────────────────────────────────────────

// ── 1. FEATURED LEAD — full-width, caption below ─────────────────────────
function FeaturedProject({ project, inView, onOpenGallery }) {
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
          style={{ height: 'clamp(260px, 50vh, 680px)', cursor: project.isPlaceholder ? 'default' : 'pointer', borderRadius: '12px' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => !project.isPlaceholder && onOpenGallery()}
        >
          <LiveImage project={project} hovered={hovered} />
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
          <div style={{ width: '24px', height: '1px', background: 'linear-gradient(to right, #DF4C73, #5AB9EA)' }} />
          <span style={{
            fontFamily: SANS, fontSize: '0.75rem',
            fontWeight: 500, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'rgba(223, 76, 115,0.72)',
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
            : (project.description || 'A custom interior installation, designed around the client\'s lifestyle and aesthetic vision.')}
        </motion.p>

        {!project.isPlaceholder && <ViewLink onClick={onOpenGallery} />}
      </div>
    </motion.div>
  );
}

// ── 2. SPLIT PROJECT — image left, text right  OR  text left, image right ─
// imageLeft = true  → [image 62%] [text 38%]
// imageLeft = false → [text 38%] [image 62%]
function SplitProject({ project, index, inView, delay, imageLeft = true, onOpenGallery }) {
  const [hovered, setHovered] = useState(false);

  const imgNumber = String(index + 1).padStart(2, '0');

  const ImageCol = (
    <div className="lg:col-span-8">
      <ImageReveal delay={delay}>
        <div
          data-cursor="view"
          className="relative overflow-hidden"
          style={{ height: 'clamp(260px, 44vw, 560px)', cursor: project.isPlaceholder ? 'default' : 'pointer', borderRadius: '12px' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => !project.isPlaceholder && onOpenGallery()}
        >
          <LiveImage project={project} hovered={hovered} />
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
          onOpenGallery={onOpenGallery}
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
export default function Projects({ 
  projectsData = [], 
  title = <>Spaces We've <em style={{ fontStyle: 'italic', color: '#DF4C73' }}>Transformed</em></>, 
  eyebrow = 'Design Masterpieces',
  description = 'Real photography added as each installation is completed.',
  paddingTop = '130px',
  paddingBottom = '150px',
}) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-50px' });

  const allPlaceholder = projectsData.every(p => p.isPlaceholder);

  // Gallery state
  const [activeProject, setActiveProject] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = (project) => {
    if (!project || !project.gallery || project.gallery.length === 0) return;
    setActiveProject(project);
    setGalleryIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setActiveProject(null);
    document.body.style.overflow = '';
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setGalleryIndex((i) => (i - 1 + activeProject.gallery.length) % activeProject.gallery.length);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setGalleryIndex((i) => (i + 1) % activeProject.gallery.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeProject) return;
      if (e.key === 'ArrowLeft')  setGalleryIndex((i) => (i - 1 + activeProject.gallery.length) % activeProject.gallery.length);
      if (e.key === 'ArrowRight') setGalleryIndex((i) => (i + 1) % activeProject.gallery.length);
      if (e.key === 'Escape')     closeGallery();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  return (
    <section
      id="portfolio"
      style={{
        background: '#050B14',
        paddingTop,
        paddingBottom,
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
            <div style={{ width: '18px', height: '1px', background: 'linear-gradient(to right, #DF4C73, #5AB9EA)' }} />
            <span style={{
              fontFamily: SANS, fontSize: '0.5625rem',
              letterSpacing: '0.38em', textTransform: 'uppercase',
              color: 'rgba(223, 76, 115,0.65)',
            }}>{eyebrow}</span>
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
              {title}
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
              {description}
            </motion.p>
          </div>

          {/* Ruled line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            style={{
              height: '1px',
              background: 'linear-gradient(to right, rgba(90, 185, 234,0.22), rgba(223, 76, 115,0.05) 55%, transparent)',
              transformOrigin: 'left',
              marginTop: '36px',
            }}
          />
        </div>

        {/* ── DYNAMIC PROJECT MAPPING ─────────────────────────
            Project 0 is Featured Lead (full width).
            Subsequent projects alternate Split Left and Split Right.
        ────────────────────────────────────────────────────────────────── */}
        {projectsData.map((project, index) => {
          if (index === 0) {
            return (
              <FeaturedProject 
                key={project.id || index} 
                project={project} 
                inView={inView} 
                onOpenGallery={() => openGallery(project)} 
              />
            );
          }
          
          const isImageLeft = index % 2 !== 0; // 1 -> true, 2 -> false, 3 -> true...
          
          return (
            <div key={project.id || index} style={{ marginTop: '188px' }}>
              <SplitProject
                project={project}
                index={index}
                inView={inView}
                delay={0.10}
                imageLeft={isImageLeft}
                onOpenGallery={() => openGallery(project)}
              />
            </div>
          );
        })}


      </div>

      {/* ── LIGHTBOX ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeGallery}
            role="dialog"
            aria-modal="true"
            aria-label="Project gallery lightbox"
          >
            {/* Prev */}
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-pink text-white p-2 lg:p-3 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 z-50 shadow-2xl"
            >
              <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={2} />
            </button>

            {/* Next */}
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-pink text-white p-2 lg:p-3 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 z-50 shadow-2xl"
            >
              <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={2} />
            </button>

            {/* Image Wrapper */}
            <AnimatePresence mode="wait">
              <motion.div
                key={galleryIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute flex flex-col items-center justify-center w-[100vw] lg:w-[90vw] h-[80vh] px-8 lg:px-0"
              >
                <div 
                  className="relative inline-flex flex-col items-center max-w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button Attached to Photo Corner */}
                  <button
                    onClick={(e) => { e.stopPropagation(); closeGallery(); }}
                    aria-label="Close lightbox"
                    className="absolute -top-3 -right-3 lg:-top-6 lg:-right-6 bg-white hover:bg-pink text-black hover:text-white p-2 lg:p-2.5 rounded-full shadow-2xl transition-all duration-300 z-50"
                  >
                    <X className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={3} />
                  </button>

                  <img
                    src={activeProject.gallery[galleryIndex].src}
                    alt={activeProject.gallery[galleryIndex].caption || activeProject.title}
                    className="max-w-[90vw] max-h-[80vh] object-contain drop-shadow-2xl rounded-sm"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Cinematic Caption & Counter (Fixed at bottom) */}
            <div className="absolute bottom-4 lg:bottom-8 left-0 right-0 flex flex-col items-center justify-center pointer-events-none px-4 z-50">
              <span className="text-pink text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-1.5 font-medium drop-shadow-lg text-center">
                {activeProject.location || activeProject.title}
              </span>
              <div className="flex items-center gap-3 text-white/90">
                <span className="text-[10px] tracking-[0.2em] text-white/60 font-mono">
                  {String(galleryIndex + 1).padStart(2, '0')} / {String(activeProject.gallery.length).padStart(2, '0')}
                </span>
                {activeProject.gallery[galleryIndex].caption && (
                  <>
                    <span className="w-6 h-[1px] bg-white/30"></span>
                    <p className="text-sm font-light tracking-wide text-white/90 drop-shadow-md">
                      {activeProject.gallery[galleryIndex].caption}
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
