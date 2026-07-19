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
          title={<>Spaces That <span className="italic text-gold">Inspire</span></>}
          subtitle="A visual journey through our interior work — every image tells a story of craftsmanship and precision."
        />

        {/* Gallery grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {GALLERY_IMAGES.map((image, i) => (
            <motion.div
              key={image.id}
              variants={fadeUpVariant}
              className={`relative group overflow-hidden cursor-pointer ${
                i === 0 || i === 4 ? 'col-span-2 row-span-2' : ''
              }`}
              style={{ height: (i === 0 || i === 4) ? '400px' : '195px' }}
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
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ease-out"
                  loading="lazy"
                  decoding="async"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-3">
                    <ZoomIn size={24} className="text-gold" />
                    <span className="text-white text-xs tracking-widest uppercase">{image.category}</span>
                  </div>
                </div>

                {/* Category tag */}
                <div className="absolute top-3 left-3 bg-black-deep/70 backdrop-blur-sm px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="text-gold text-[10px] tracking-widest uppercase">{image.category}</span>
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-500 pointer-events-none z-10" />
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
              className="absolute top-6 right-6 w-10 h-10 border border-gray-luxury/40 hover:border-gold/60 flex items-center justify-center text-gray-subtle hover:text-gold transition-all duration-300 z-10"
            >
              <X size={18} />
            </button>

            {/* Prev */}
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-4 lg:left-6 w-12 h-12 border border-gray-luxury/40 hover:border-gold/60 flex items-center justify-center text-gray-subtle hover:text-gold transition-all duration-300 z-10"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-4 lg:right-6 w-12 h-12 border border-gray-luxury/40 hover:border-gold/60 flex items-center justify-center text-gray-subtle hover:text-gold transition-all duration-300 z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                className="max-w-5xl max-h-[80vh] relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={GALLERY_IMAGES[lightboxIndex].src}
                  alt={GALLERY_IMAGES[lightboxIndex].alt}
                  className="max-w-full max-h-[80vh] object-contain"
                  loading="eager"
                />
                <div className="absolute inset-0 border border-gold/10 pointer-events-none" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black-deep to-transparent">
                  <span className="section-label text-[10px]">{GALLERY_IMAGES[lightboxIndex].category}</span>
                  <p className="text-white/80 text-sm mt-1">{GALLERY_IMAGES[lightboxIndex].alt}</p>
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
