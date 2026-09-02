import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   EditorialSubTypeCard — one finish, with multi-image badge
───────────────────────────────────────────────────────────── */
function EditorialSubTypeCard({ type, index, onOpenGallery }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const isImageLeft = index % 2 === 0;
  const images = type.images || (type.image ? [type.image] : []);
  const coverImage = images[0];
  const photoCount = images.length;

  return (
    <motion.div
      ref={cardRef}
      id={type.id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
      style={{ marginTop: index === 0 ? '0' : '180px' }}
    >
      {/* ── Image Column ── */}
      <div
        className="w-full lg:w-[45%] relative overflow-hidden rounded-xl border border-white/5
          shadow-[0_0_0_rgba(223,76,115,0)] group-hover:shadow-[0_0_50px_rgba(223,76,115,0.18)]
          transition-all duration-700 cursor-pointer"
        onClick={() => onOpenGallery(images, type.name, 0)}
      >
        <div className="relative overflow-hidden">
          <img
            src={coverImage}
            alt={type.name}
            className="w-full h-auto object-cover rounded-xl opacity-80
              group-hover:opacity-100 group-hover:scale-[1.03]
              transition-all duration-1000"
            loading="lazy"
          />
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0
            transition-colors duration-700 rounded-xl pointer-events-none" />

          {/* Photo count badge — top right */}
          {photoCount > 1 && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5
              bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full
              border border-white/10 pointer-events-none">
              <div className="w-3 h-3 text-white/60">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="m3 9 4-4 4 4 4-4 4 4"/>
                </svg>
              </div>
              <span className="text-white/70 text-[9px] tracking-[0.2em] font-medium">
                {photoCount} Photos
              </span>
            </div>
          )}

          {/* View gallery hint on hover */}
          <div className="absolute inset-0 flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <div className="flex items-center gap-3 px-6 py-3 bg-black/50 backdrop-blur-xl
              rounded-full border border-white/20 text-white text-[0.65rem]
              tracking-[0.2em] uppercase font-medium">
              <span>View Gallery</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </div>

        {/* Thumbnail strip — show if more than 1 photo */}
        {photoCount > 1 && (
          <div className="flex gap-1.5 p-2.5 bg-black-charcoal border-t border-white/5 rounded-b-xl">
            {images.map((img, i) => (
              <div
                key={i}
                className="flex-1 h-12 overflow-hidden rounded-lg opacity-50
                  hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); onOpenGallery(images, type.name, i); }}
              >
                <img src={img} alt={`${type.name} ${i + 1}`}
                  className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Text Column ── */}
      <div className="w-full lg:w-[45%] flex flex-col items-start text-left">
        {/* Index pill */}
        <div className="flex items-center gap-[12px] mb-6">
          <div className="w-[18px] h-[1px] bg-gradient-to-r from-pink to-blue/40" />
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-white/30">
            Finish {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="font-display font-light text-4xl lg:text-5xl text-white mb-6
          group-hover:text-pink transition-colors duration-500 leading-tight">
          {type.name}
        </h3>

        <p className="font-sans text-[0.9375rem] font-light leading-[1.95] text-white/50 mb-8 max-w-sm">
          {type.description}
        </p>

        {/* Photo count label */}
        {photoCount > 1 && (
          <span className="inline-block mb-5 text-[0.65rem] tracking-[0.2em] uppercase text-white/30 font-light">
            {photoCount} reference photos available
          </span>
        )}

        <button
          onClick={() => onOpenGallery(images, type.name, 0)}
          className="inline-flex items-center gap-4 px-8 py-4 rounded-full
            border border-white/20 text-white text-[0.65rem] font-medium
            tracking-[0.2em] uppercase group-hover:bg-pink group-hover:border-pink
            hover:bg-pink hover:border-pink hover:text-white
            transition-all duration-500 cursor-pointer"
        >
          Explore Finish
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-500" />
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GalleryLightbox — full-screen gallery with arrow navigation
───────────────────────────────────────────────────────────── */
function GalleryLightbox({ images, title, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, onClose]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '8%' : '-8%', opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-8%' : '8%', opacity: 0, scale: 0.97 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center
        bg-black/90 backdrop-blur-xl cursor-zoom-out"
      onClick={onClose}
    >
      {/* ── Top bar ── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between
          px-6 md:px-12 py-5 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title + counter */}
        <div className="flex items-center gap-5">
          <div className="w-[14px] h-[1px] bg-pink/60" />
          <div>
            <span className="text-white font-display font-light text-lg leading-none">
              {title}
            </span>
            <div className="text-white/40 text-[0.6rem] tracking-[0.35em] uppercase mt-0.5">
              {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-white/20 bg-white/5
            hover:bg-white/15 hover:border-white/40 flex items-center justify-center
            transition-all duration-300 cursor-pointer"
        >
          <X size={16} className="text-white/70" />
        </button>
      </div>

      {/* ── Main image area ── */}
      <div
        className="relative w-full h-full flex items-center justify-center px-20 py-24"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            src={images[current]}
            alt={`${title} — ${current + 1}`}
            className="max-w-full max-h-full w-auto h-auto object-contain
              rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10
              select-none"
            draggable={false}
          />
        </AnimatePresence>

        {/* ── Prev Arrow ── */}
        {images.length > 1 && (
          <button
            onClick={goPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2
              w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl
              flex items-center justify-center text-white
              hover:bg-pink hover:border-pink hover:scale-110
              transition-all duration-300 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* ── Next Arrow ── */}
        {images.length > 1 && (
          <button
            onClick={goNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2
              w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl
              flex items-center justify-center text-white
              hover:bg-pink hover:border-pink hover:scale-110
              transition-all duration-300 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* ── Dot indicators ── */}
      {images.length > 1 && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`rounded-full transition-all duration-300 cursor-pointer
                ${i === current
                  ? 'w-6 h-1.5 bg-pink'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
            />
          ))}
        </div>
      )}

      {/* ── Thumbnail strip at bottom ── */}
      {images.length > 1 && (
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer
                ${i === current ? 'border-pink scale-110' : 'border-white/20 hover:border-white/50 opacity-60 hover:opacity-100'}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────────────── */
export default function SlidingSubTypes({ subTypes }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  const [gallery, setGallery] = useState(null); // { images, title, startIndex }

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = gallery ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [gallery]);

  if (!subTypes || subTypes.length === 0) return null;

  return (
    <div className="w-full bg-black pt-16 lg:pt-32 pb-32 relative">

      {/* ── Section header ── */}
      <div ref={headerRef} className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-5"
        >
          <div className="w-12 h-[2px] bg-pink/70" />
          <span className="text-pink/70 text-[10px] tracking-[0.4em] uppercase font-medium">
            Glazing Options
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display font-light text-white leading-[1.1]"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}
          >
            Door <span className="text-pink italic">Finishes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-white/40 text-[0.95rem] max-w-[420px] leading-[1.8] lg:text-right font-light"
          >
            Explore our curated selection of premium wardrobe door finishes.
            Click any finish to open its photo gallery.
          </motion.p>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={headerInView ? { width: '100%' } : {}}
          transition={{ duration: 1.1, delay: 0.35 }}
          className="mt-12 h-px bg-gradient-to-r from-pink/30 via-pink/5 to-transparent"
        />
      </div>

      {/* ── Finish cards ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col">
        {subTypes.map((type, i) => (
          <EditorialSubTypeCard
            key={type.id || i}
            type={type}
            index={i}
            onOpenGallery={(images, name, startIndex) =>
              setGallery({ images, title: name, startIndex })
            }
          />
        ))}
      </div>

      {/* ── Gallery Lightbox ── */}
      <AnimatePresence>
        {gallery && (
          <GalleryLightbox
            images={gallery.images}
            title={gallery.title}
            startIndex={gallery.startIndex}
            onClose={() => setGallery(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
