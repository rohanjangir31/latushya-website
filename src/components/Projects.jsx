import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { PROJECTS } from '../data/content';

// ── ASPIRATIONAL PLACEHOLDER IMAGES ──────────────────────────
// Each slot gets a UNIQUE tinted wardrobe image so it reads as
// "exclusive unrevealed project" rather than "content missing."
// Heavy dark overlay preserves the placeholder intent while
// maintaining visual aspiration and variety.
const SLOT_IMAGES = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=65',
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=65',
  'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=65',
  'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=65',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=65',
];

// ── PLACEHOLDER CARD ─────────────────────────────────────────
// Aspirational: unique background image, heavy overlay, gold lettermark.
// Reads as "reserved exhibition space" not "broken content."
function PlaceholderCard({ index, category, className = '' }) {
  const img = SLOT_IMAGES[index % SLOT_IMAGES.length];

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {/* Tinted wardrobe image in background */}
      <img
        src={img}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-[1.04] group-hover:scale-100 transition-transform duration-1000"
        loading="lazy"
        decoding="async"
      />
      {/* Heavy dark overlay — keeps it clearly "unrevealed" */}
      <div className="absolute inset-0 bg-black-deep/86" />
      {/* Subtle gold tint */}
      <div className="absolute inset-0 bg-gold/[0.025]" />

      {/* Corner markers */}
      <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-gold/22" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-gold/22" />
      <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-gold/22" />
      <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-gold/22" />

      {/* Thin ruled lines */}
      <div className="absolute top-[3.25rem] left-4 right-4 h-px bg-gold/10" />
      <div className="absolute bottom-[3.25rem] left-4 right-4 h-px bg-gold/10" />

      {/* Centred content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border border-gold/25 flex items-center justify-center">
          <span className="font-display text-lg text-gold/40 font-light">L</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className="text-gold/45 text-[7px] tracking-[0.45em] uppercase">
            {category || 'Wardrobe Project'}
          </span>
          <div className="w-4 h-px bg-gold/18" />
          <span className="text-white/20 text-[7px] tracking-[0.4em] uppercase">
            Photography Pending
          </span>
        </div>
      </div>
    </div>
  );
}

// ── LIVE PROJECT CARD ─────────────────────────────────────────
function ProjectCard({ project, className = '' }) {
  const [hovered, setHovered] = useState(false);

  if (project.isPlaceholder) {
    return (
      <PlaceholderCard
        index={project.id - 1}
        category={project.category}
        className={className}
      />
    );
  }

  return (
    <motion.div
      className={`relative group overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={project.image}
        alt={`${project.wardrobeType || ''} — ${project.location || ''}`}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black-deep/92 via-black-deep/15 to-transparent" />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-black-deep/40"
      />
      {/* Hover bracket */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.94 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-4 border border-gold/22 pointer-events-none"
      />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="text-gold/70 text-[8px] tracking-[0.35em] uppercase block mb-1.5">
          {project.category}
        </span>
        <h3 className="font-display text-lg text-white font-light leading-snug">
          {project.title}
        </h3>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.35 }}
          className="mt-2.5 space-y-1"
        >
          {project.location && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-px bg-gold/50" />
              <span className="text-gray-subtle text-xs tracking-widest">{project.location}</span>
            </div>
          )}
          {project.wardrobeType && (
            <span className="text-gold/60 text-[9px] tracking-widest uppercase block">
              {project.wardrobeType}
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────────
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const allPlaceholder = PROJECTS.every(p => p.isPlaceholder);
  const [featured, ...rest] = PROJECTS;

  // Deliberate height variation — breaks the uniform rectangle grid
  const supportHeights = [
    'h-[240px] md:h-[262px]',
    'h-[240px] md:h-[308px]',
    'h-[240px] md:h-[262px]',
    'h-[240px] md:h-[298px]',
  ];

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-black-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Header ──────────────────────────────────────── */}
        <div ref={ref} className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-5"
          >
            <div className="w-5 h-px bg-gold" />
            <span className="text-gold text-[9px] tracking-[0.35em] uppercase font-medium">
              Our Portfolio
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display font-light text-white leading-[1.05]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
            >
              Wardrobes We've{' '}
              <span className="italic text-gold">Created</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-subtle text-sm max-w-[260px] leading-relaxed lg:text-right font-light"
            >
              Real photography added as each installation is completed.
            </motion.p>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ duration: 1.2, delay: 0.38 }}
            className="mt-8 h-px bg-gradient-to-r from-gold/30 via-gold/8 to-transparent"
          />
        </div>

        {/* ── Asymmetric grid ──────────────────────────────────
            Featured (left, 2 rows tall) + 4 supporting (2×2 right)
            Each placeholder has a UNIQUE tinted background image.
        ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {/* Featured — 2-row span */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.2 }}
            className="md:row-span-2 h-[340px] md:h-auto"
          >
            <ProjectCard
              project={featured || PROJECTS[0]}
              className="w-full h-full min-h-[340px] md:min-h-[582px]"
            />
          </motion.div>

          {/* 4 supporting — varied heights */}
          {rest.slice(0, 4).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.28 + i * 0.08 }}
              className={supportHeights[i] || 'h-[260px]'}
            >
              <ProjectCard project={project} className="w-full h-full" />
            </motion.div>
          ))}
        </div>

        {/* ── Placeholder notice ─────────────────────────────── */}
        {allPlaceholder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-5 flex items-center gap-5 px-6 py-4 border-l-2 border-gold/20 bg-black-deep/25"
          >
            <div className="w-6 h-6 border border-gold/22 flex items-center justify-center flex-shrink-0">
              <span className="font-display text-xs text-gold/38 font-light">L</span>
            </div>
            <p className="text-gray-subtle text-sm leading-relaxed font-light">
              Our completed installations are being professionally photographed.{' '}
              <span className="text-white/55">Project images arriving soon.</span>
            </p>
          </motion.div>
        )}

        {/* ── CTA ─────────────────────────────────────────── */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-gold"
            id="portfolio-cta"
          >
            <span>Start Your Wardrobe Project</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-gray-subtle text-[9px] tracking-[0.3em] uppercase hover:text-gold transition-colors duration-300 border-b border-gray-subtle/25 pb-px hover:border-gold/50"
          >
            Send an enquiry
          </a>
        </div>
      </div>
    </section>
  );
}
