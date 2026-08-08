import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/content';
import { StaggerContainer, fadeUpVariant, SectionHeader } from '../utils/animations';
import ImageReveal from './ImageReveal';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i + 1) % GALLERY_IMAGES.length);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (lightboxIndex === null) return;
    if (e.key === 'ArrowLeft')  setLightboxIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % GALLERY_IMAGES.length);
    if (e.key === 'Escape')     closeLightbox();
  };

  return (
    <section
      id="gallery"
      className="py-32 bg-black-deep"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader
          label="Our Gallery"
          title={<>Spaces That <span className="italic text-pink">Inspire</span></>}
          subtitle="A visual journey through our interior work — every image tells a story of craftsmanship and precision."
        />

        {/* Gallery Masonry Layout */}
        <StaggerContainer className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 mt-12">
          {GALLERY_IMAGES.map((image, i) => (
            <motion.div
              key={image.id}
              variants={fadeUpVariant}
              className="relative group overflow-hidden cursor-pointer rounded-2xl break-inside-avoid shadow-lg hover:shadow-2xl transition-shadow duration-500"
              onClick={() => openLightbox(i)}
              data-cursor="view"
              role="button"
              aria-label={`View ${image.category} — ${image.alt}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
            >
              <ImageReveal className="w-full h-full" delay={i * 0.05}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover transition-transform duration-1000 group-hover:scale-110 ease-[0.25,0.46,0.45,0.94]"
                  loading="lazy"
                  decoding="async"
                />

                {/* Cinematic Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Elegant Typography Reveal */}
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 pointer-events-none">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-[1px] bg-[#DF4C73]" />
                    <span className="text-[#DF4C73] text-[9px] tracking-[0.3em] uppercase">{image.category}</span>
                  </div>
                  <h4 className="text-white text-lg font-display tracking-wide font-light line-clamp-2">
                    {image.alt}
                  </h4>
                </div>

                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
              </ImageReveal>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black-deep/97 flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/50 hover:text-pink hover:scale-110 transition-all duration-300 z-50 mix-blend-difference"
            >
              <X size={32} strokeWidth={1} />
            </button>

            {/* Prev */}
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-pink hover:scale-110 transition-all duration-300 z-50 mix-blend-difference"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            {/* Next */}
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-pink hover:scale-110 transition-all duration-300 z-50 mix-blend-difference"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full h-full flex items-center justify-center p-4 lg:p-12 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={GALLERY_IMAGES[lightboxIndex].src}
                  alt={GALLERY_IMAGES[lightboxIndex].alt}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl"
                  loading="eager"
                />

                {/* Minimal Caption */}
                <div className="absolute bottom-8 left-12 right-12 text-center pointer-events-none">
                  <span className="text-pink/80 text-[10px] tracking-[0.3em] uppercase block mb-2">{GALLERY_IMAGES[lightboxIndex].category}</span>
                  <p className="text-white/60 text-sm font-light max-w-xl mx-auto">{GALLERY_IMAGES[lightboxIndex].alt}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-subtle text-xs tracking-widest">
              {String(lightboxIndex + 1).padStart(2, '0')} / {String(GALLERY_IMAGES.length).padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
