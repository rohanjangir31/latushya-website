import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { WARDROBE_COLLECTIONS } from '../data/collections';
import PageTransition from '../components/PageTransition';

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

        {/* Carousel Showcase */}
        {designs.length > 0 && (
          <section className="max-w-[1600px] mx-auto px-6 lg:px-12">
            
            {/* Counter */}
            <div className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-white/30 text-center mb-8">
              {String(currentIndex + 1).padStart(2, '0')} <span className="text-pink mx-2">/</span> {String(designs.length).padStart(2, '0')}
            </div>

            {/* Gallery Editorial Overlay Layout */}
            <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center pb-12">
              
              {/* Main Image */}
              <motion.div 
                className="w-full relative overflow-hidden rounded-xl shadow-2xl shadow-black/50 group border border-white/5 cursor-grab active:cursor-grabbing touch-pan-y"
                onPanEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    handleNext();
                  } else if (swipe > swipeConfidenceThreshold) {
                    handlePrev();
                  }
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentDesign.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    src={currentDesign.image}
                    alt={currentDesign.name}
                    className="w-full h-auto object-cover block rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    draggable={false}
                  />
                </AnimatePresence>

                {/* Prev Overlay Area */}
                {designs.length > 1 && (
                  <button
                    onClick={handlePrev}
                    className="absolute inset-y-0 left-0 w-1/2 cursor-pointer z-10 group/left"
                    aria-label="Previous image"
                  >
                    <div className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/left:opacity-100 transform -translate-x-4 group-hover/left:translate-x-0 transition-all duration-500 hover:bg-white hover:text-black">
                      <ArrowLeft size={18} />
                    </div>
                  </button>
                )}

                {/* Next Overlay Area */}
                {designs.length > 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute inset-y-0 right-0 w-1/2 cursor-pointer z-10 group/right"
                    aria-label="Next image"
                  >
                    <div className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/right:opacity-100 transform translate-x-4 group-hover/right:translate-x-0 transition-all duration-500 hover:bg-pink hover:border-pink hover:text-white">
                      <ArrowRight size={18} />
                    </div>
                  </button>
                )}
              </motion.div>

              {/* Design Info (Shifted Glass Card) */}
              <div className="w-[95%] md:w-[85%] lg:w-[75%] bg-black/40 border border-white/10 p-8 lg:p-12 rounded-2xl relative z-20 mt-8 md:mt-12 md:self-end md:mr-8 lg:mr-12 shadow-2xl transition-all duration-700 flex flex-col items-start text-left">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`info-${currentDesign.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full"
                  >
                    <span className="text-pink text-[0.6rem] tracking-[0.4em] uppercase font-medium block mb-4 lg:mb-6">
                      Selected Design
                    </span>
                    <h3 className="text-2xl lg:text-3xl xl:text-4xl font-display font-light mb-4 lg:mb-6 text-white leading-tight">
                      {currentDesign.name}
                    </h3>
                    <div className="w-12 h-px bg-gradient-to-r from-pink to-blue/40 mb-4 lg:mb-6" />
                    <p className="font-sans text-[0.85rem] lg:text-[0.95rem] font-light leading-[2.1] text-white/60 pr-2">
                      {currentDesign.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

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
