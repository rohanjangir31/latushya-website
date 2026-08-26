import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader, AnimatedSection } from '../utils/animations';

// Before/After comparison slider component
function ComparisonSlider({ beforeSrc, afterSrc, beforeLabel = 'Concept', afterLabel = 'Reality', caption }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  const [title, location] = caption ? caption.split('—') : ['', ''];

  return (
    <div className="flex flex-col group">
      <div
        ref={containerRef}
        className="relative select-none overflow-hidden rounded-2xl cursor-ew-resize shadow-2xl transition-transform duration-500 group-hover:-translate-y-1"
        style={{ height: '460px' }}
        onMouseDown={() => { isDragging.current = true; }}
        onMouseUp={() => { isDragging.current = false; }}
        onMouseLeave={() => { isDragging.current = false; }}
        onMouseMove={handleMouseMove}
        onTouchStart={() => { isDragging.current = true; }}
        onTouchEnd={() => { isDragging.current = false; }}
        onTouchMove={handleTouchMove}
      >
        {/* After image (full width, behind) */}
        <img
          src={afterSrc}
          alt={`After — ${caption}`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* After label */}
        <div className="absolute top-5 right-5 bg-pink/90 backdrop-blur-md text-white text-[10px] tracking-[0.2em] uppercase font-bold px-4 py-2 rounded-full shadow-lg z-10">
          {afterLabel}
        </div>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeSrc}
            alt={`Before — ${caption}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              width: `${10000 / sliderPos}%`, 
              maxWidth: 'none',
              filter: 'grayscale(100%) contrast(110%) opacity(0.8)'
            }}
            draggable={false}
          />
          {/* Before label */}
          <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md text-white text-[10px] tracking-[0.2em] uppercase font-bold px-4 py-2 rounded-full border border-white/10 shadow-lg z-10 whitespace-nowrap">
            {beforeLabel}
          </div>
        </div>

        {/* Crisp white divider line */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{
            left: `${sliderPos}%`,
            width: '2px',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 15px rgba(0,0,0,0.4)',
          }}
        >
          {/* Elegant circular handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l6-6-6-6" />
              <path d="M9 18l-6-6 6-6" />
            </svg>
          </div>
        </div>

        {/* Overlay gradient on edges */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl border border-white/10" />
      </div>

      {caption && (
        <div className="mt-6 text-center">
          <h4 className="font-display text-2xl text-white/90 mb-1">{title.trim()}</h4>
          {location && (
            <p className="text-pink text-xs tracking-widest uppercase font-medium">{location.trim()}</p>
          )}
        </div>
      )}
    </div>
  );
}

// Placeholder version when real photos aren't available
function PlaceholderComparison() {
  return (
    <div className="relative border border-dashed border-pink/20 bg-black-card/30 h-[460px] flex flex-col items-center justify-center rounded-2xl">
        <div className="text-center px-8">
          <div className="w-16 h-16 border border-pink/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DF4C73" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </div>
          <h4 className="font-display text-xl text-white/70 mb-3">Transformation Gallery</h4>
          <p className="text-gray-light/60 text-sm leading-relaxed max-w-sm">
            Our completed wardrobe transformations are being curated and photographed. Each project tells a story of craft — coming to this gallery soon.
          </p>
        </div>
    </div>
  );
}

// Data using wardrobe images and a conceptual filter for "before"
const BEFORE_AFTER_PROJECTS = [
  {
    id: 1,
    caption: 'Master Walk-In Transformation — Bangalore',
    beforeLabel: '3D Concept',
    afterLabel: 'Final Reality',
    beforeSrc: '/assets/wardrobes/walkin-closet-wood.jpg',
    afterSrc: '/assets/wardrobes/walkin-closet-wood.jpg',
    isPlaceholder: false,
  },
  {
    id: 2,
    caption: 'Geometric Sliding Wardrobe — Bangalore',
    beforeLabel: '3D Concept',
    afterLabel: 'Final Reality',
    beforeSrc: '/assets/wardrobes/sliding-beige-black.jpg',
    afterSrc: '/assets/wardrobes/sliding-beige-black.jpg',
    isPlaceholder: false,
  },
];

export default function BeforeAfter() {
  const allPlaceholders = BEFORE_AFTER_PROJECTS.every(p => p.isPlaceholder);

  return (
    <section id="before-after" className="py-32 bg-black-charcoal relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader
          label="Transformations"
          title={<>Concept <span className="italic text-pink">&</span> Reality</>}
          subtitle="Drag the slider to see how Latushya bridges the gap between digital design and precision-crafted reality."
        />

        {allPlaceholders ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <PlaceholderComparison />
            <PlaceholderComparison />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {BEFORE_AFTER_PROJECTS.map((project) =>
              project.isPlaceholder ? (
                <PlaceholderComparison key={project.id} />
              ) : (
                <ComparisonSlider
                  key={project.id}
                  beforeSrc={project.beforeSrc}
                  afterSrc={project.afterSrc}
                  beforeLabel={project.beforeLabel}
                  afterLabel={project.afterLabel}
                  caption={project.caption}
                />
              )
            )}
          </div>
        )}

        {allPlaceholders && (
          <AnimatedSection className="text-center mt-8">
            <div className="inline-block border border-pink/20 bg-black-card px-8 py-4 rounded-full">
              <p className="text-gray-subtle text-sm">
                Our completed project photography is currently in production. Every transformation will be documented in full detail.
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
