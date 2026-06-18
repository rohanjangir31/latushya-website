import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader, AnimatedSection } from '../utils/animations';

// Before/After comparison slider component
function ComparisonSlider({ beforeSrc, afterSrc, beforeLabel = 'Before', afterLabel = 'After', caption }) {
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

  return (
    <div className="flex flex-col">
      <div
        ref={containerRef}
        className="relative select-none overflow-hidden cursor-ew-resize"
        style={{ height: '420px' }}
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
        <div className="absolute top-4 right-4 bg-gold/90 text-black-deep text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 z-10">
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
            style={{ width: `${10000 / sliderPos}%`, maxWidth: 'none' }}
            draggable={false}
          />
          {/* Before label */}
          <div className="absolute top-4 left-4 bg-black-charcoal/90 text-white/80 text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 z-10 whitespace-nowrap">
            {beforeLabel}
          </div>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-gold z-20"
          style={{ left: `${sliderPos}%` }}
        />

        {/* Drag handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 z-30 flex items-center justify-center"
          style={{ left: `${sliderPos}%`, transform: 'translate(-50%, -50%)' }}
        >
          <motion.div
            className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-gold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 4L1 8L5 12M11 4L15 8L11 12" stroke="#0F0F0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>

        {/* Overlay gradient on edges */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border border-gold/10" />
        </div>
      </div>

      {caption && (
        <div className="mt-4 text-center">
          <p className="text-gray-subtle text-sm">{caption}</p>
        </div>
      )}
    </div>
  );
}

// Placeholder version when real photos aren't available
function PlaceholderComparison() {
  return (
    <div className="relative border border-dashed border-gold/20 bg-black-card/30 h-[420px] flex flex-col items-center justify-center">
      <div className="text-center px-8">
        <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        </div>
        <h4 className="font-display text-xl text-white/60 mb-3">Before & After Coming Soon</h4>
        <p className="text-gray-light/40 text-sm leading-relaxed max-w-sm">
          We're photographing our completed wardrobe transformations. Real before & after comparisons will be added here.
        </p>
      </div>
    </div>
  );
}

// This data will be replaced with real before/after project photos.
// Set isPlaceholder: false and add real image URLs to activate the slider.
const BEFORE_AFTER_PROJECTS = [
  {
    id: 1,
    caption: 'Custom Wardrobe Transformation — Bangalore',
    beforeLabel: 'Empty Space',
    afterLabel: 'Latushya Wardrobe',
    // These are illustration placeholders — replace with real before/after photos
    beforeSrc: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    isPlaceholder: true,
  },
  {
    id: 2,
    caption: 'Walk-In Wardrobe Transformation — Bangalore',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeSrc: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
    isPlaceholder: true,
  },
];

export default function BeforeAfter() {
  const allPlaceholders = BEFORE_AFTER_PROJECTS.every(p => p.isPlaceholder);

  return (
    <section id="before-after" className="py-32 bg-black-charcoal relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader
          label="Transformations"
          title={<>Before <span className="italic text-gold">&</span> After</>}
          subtitle="Drag the slider to see how Latushya transforms an ordinary space into a precision-crafted wardrobe."
        />

        {allPlaceholders ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlaceholderComparison />
            <PlaceholderComparison />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="inline-block border border-gold/20 bg-black-card px-8 py-4">
              <p className="text-gray-subtle text-sm">
                📸 Real before & after photos will be added once our completed projects are photographed.
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
