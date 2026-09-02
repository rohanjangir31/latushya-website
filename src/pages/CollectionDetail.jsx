import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { WARDROBE_COLLECTIONS } from '../data/collections';
import PageTransition from '../components/PageTransition';
import SlidingSubTypes from '../components/SlidingSubTypes';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function CollectionDetail() {
  const { id } = useParams();
  const collectionIndex = WARDROBE_COLLECTIONS.findIndex(c => c.id === id);
  const collection = WARDROBE_COLLECTIONS[collectionIndex];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentIndex(0); // Reset carousel when collection changes
  }, [id]);

  if (!collection) {
    return <Navigate to="/#collections" replace />;
  }

  const nextCollection = WARDROBE_COLLECTIONS[(collectionIndex + 1) % WARDROBE_COLLECTIONS.length];

  const designs = collection.designs || [];
  const currentDesign = designs[currentIndex];


  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % designs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + designs.length) % designs.length);
  };

  // Splitting the title for styling (e.g. "Walk-in Wardrobes" -> "Walk-in" and "Wardrobes")
  const nameParts = collection.name.split(' ');
  const firstPart = nameParts[0];
  const restPart = nameParts.slice(1).join(' ');

  const nextNameParts = nextCollection.name.split(' ');

  return (
    <PageTransition>
      <main className="bg-black text-white min-h-screen pt-[140px] pb-32">
        
        {/* Header */}
        <section className="max-w-5xl mx-auto px-6 lg:px-12 mb-20 lg:mb-32 text-center">
          <div className="flex items-center justify-center gap-4 text-[0.65rem] tracking-[0.3em] uppercase mb-12">
            <Link to="/wardrobes" className="text-white/40 hover:text-white transition-colors">Wardrobes</Link>
            <span className="text-pink">•</span>
            <span className="text-white font-medium">{collection.name}</span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-light text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-10"
          >
            {firstPart} <em className="italic text-pink">{restPart}</em>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="w-12 h-px bg-gradient-to-r from-pink to-blue/40 mx-auto mb-10 origin-center"
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-white/50 text-[1.05rem] font-light leading-[2] max-w-2xl mx-auto"
          >
            {collection.intro}
          </motion.p>
        </section>

        {/* ── Immersive Cinematic Catalogue Showcase ── */}
        {designs.length > 0 && (
          <section className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 mb-32">
            
            <div className="relative w-full h-[75vh] lg:h-[85vh] rounded-[2rem] overflow-hidden bg-black border border-white/10 flex flex-col group shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              
              {/* Dynamic Ambient Background */}
              <div className="absolute inset-0 z-0">
                <AnimatePresence>
                  <motion.img
                    key={`bg-${currentDesign.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.55 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    src={currentDesign.image}
                    className="absolute inset-0 w-full h-full object-cover blur-[60px] scale-110 saturate-[1.2]"
                  />
                </AnimatePresence>
                {/* Additional gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
              </div>

              {/* Main Image Stage (Top Portion) */}
              <div 
                className="relative z-10 flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
                onPanEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) handleNext();
                  else if (swipe > swipeConfidenceThreshold) handlePrev();
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentDesign.id}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    src={currentDesign.image}
                    alt={currentDesign.name}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-[1.5rem] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] select-none pointer-events-none"
                    style={{ imageRendering: 'high-quality' }}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {designs.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-pink/80 hover:border-pink hover:scale-110 transition-all duration-400 z-20 shadow-2xl"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-pink/80 hover:border-pink hover:scale-110 transition-all duration-400 z-20 shadow-2xl"
                    >
                      <ArrowRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Info Panel (Bottom Glassmorphism Area) */}
              <div className="relative z-20 w-full bg-black/50 backdrop-blur-2xl border-t border-white/10 p-6 lg:px-12 lg:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shrink-0">
                
                <div className="flex-1 max-w-4xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`text-${currentDesign.id}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Meta info */}
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-pink text-[0.65rem] tracking-[0.3em] uppercase font-bold">
                          {String(currentIndex + 1).padStart(2, '0')} / {String(designs.length).padStart(2, '0')}
                        </span>
                        <div className="w-8 h-[1px] bg-white/20" />
                        <span className="text-white/40 text-[0.6rem] tracking-[0.25em] uppercase">
                          Signature Collection
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-display font-light text-2xl md:text-3xl lg:text-4xl text-white mb-3 leading-tight">
                        {currentDesign.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="font-sans text-[0.9rem] lg:text-[1rem] font-light text-white/60 leading-relaxed line-clamp-2 md:line-clamp-none">
                        {currentDesign.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress Indicators (Dots) */}
                <div className="flex items-center gap-2 shrink-0 pt-4 md:pt-0">
                  {designs.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`transition-all duration-500 rounded-full cursor-pointer ${
                        idx === currentIndex 
                          ? 'w-10 h-1.5 bg-pink shadow-[0_0_12px_rgba(223,76,115,0.6)]' 
                          : 'w-2 h-1.5 bg-white/20 hover:bg-white/50'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>
              
            </div>
          </section>
        )}

        {/* Sliding Door Finishes Section (Specific to Sliding Wardrobes) */}
        {collection.id === 'sliding-wardrobes' && collection.slidingSubTypes && (
          <section className="mb-8">
            <SlidingSubTypes subTypes={collection.slidingSubTypes} />
          </section>
        )}

        {/* Next Collection Pathway - Thumbnail Minimalist */}
        <section className="mt-16 lg:mt-24 max-w-6xl mx-auto px-6 lg:px-12 border-t border-white/10 pt-16 pb-20">
          <Link 
            to={`/collections/${nextCollection.id}`} 
            className="group flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 text-center md:text-left"
          >
            {/* Small elegant thumbnail */}
            <div className="w-32 h-20 lg:w-40 lg:h-24 rounded-2xl overflow-hidden border border-white/10 shrink-0 shadow-[0_0_0_rgba(223,76,115,0)] group-hover:shadow-[0_0_30px_rgba(223,76,115,0.15)] group-hover:border-pink/30 transition-all duration-500">
              <img 
                src={nextCollection.image} 
                alt={nextCollection.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
              />
            </div>

            {/* Text */}
            <div className="flex flex-col items-center md:items-start">
              <span className="text-white/40 group-hover:text-pink transition-colors duration-500 text-[0.6rem] tracking-[0.4em] uppercase font-medium block mb-2 lg:mb-3">
                Up Next
              </span>
              <div className="flex items-center gap-4">
                <h2 className="font-display font-light text-2xl lg:text-3xl text-white transition-colors duration-500 group-hover:text-white/90">
                  {nextNameParts[0]} <em className="italic">{nextNameParts.slice(1).join(' ')}</em>
                </h2>
                <ArrowRight size={20} className="text-white/30 group-hover:text-pink transform group-hover:translate-x-2 transition-all duration-500" />
              </div>
            </div>
          </Link>
        </section>

      </main>
    </PageTransition>
  );
}
