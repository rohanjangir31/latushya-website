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

            {/* Gallery Pro Split Layout */}
            <div className="relative w-full max-w-[1500px] mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 pb-12">
              
              {/* Main Image Display Frame (Left) */}
              <motion.div 
                className="w-full lg:flex-1 relative flex justify-center items-center cursor-grab active:cursor-grabbing touch-pan-y group bg-gradient-to-br from-white/[0.03] to-transparent rounded-3xl border border-white/5 p-4 md:p-8 lg:p-12 min-h-[50vh] lg:min-h-[75vh] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"
                onPanEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    handleNext();
                  } else if (swipe > swipeConfidenceThreshold) {
                    handlePrev();
                  }
                }}
              >
                <div className="relative flex justify-center items-center w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentDesign.id}
                      initial={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                      src={currentDesign.image}
                      alt={currentDesign.name}
                      className="max-w-full max-h-[65vh] lg:max-h-[70vh] w-auto h-auto object-contain block rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 opacity-95 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      draggable={false}
                    />
                  </AnimatePresence>
                </div>

                {/* Prev Overlay Area */}
                {designs.length > 1 && (
                  <button
                    onClick={handlePrev}
                    className="absolute inset-y-0 left-0 w-24 md:w-32 cursor-pointer z-10 flex items-center justify-start pl-4 md:pl-8 group/left"
                    aria-label="Previous image"
                  >
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-black-deep/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover/left:translate-x-0 transition-all duration-500 hover:bg-white hover:text-black hover:scale-110 shadow-2xl">
                      <ArrowLeft size={20} />
                    </div>
                  </button>
                )}

                {/* Next Overlay Area */}
                {designs.length > 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute inset-y-0 right-0 w-24 md:w-32 cursor-pointer z-10 flex items-center justify-end pr-4 md:pr-8 group/right"
                    aria-label="Next image"
                  >
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-black-deep/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover/right:translate-x-0 transition-all duration-500 hover:bg-pink hover:border-pink hover:text-white hover:scale-110 shadow-2xl">
                      <ArrowRight size={20} />
                    </div>
                  </button>
                )}
              </motion.div>

              {/* Design Info (Right, Sticky) */}
              <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 bg-transparent lg:border-l border-white/10 lg:pl-12 flex flex-col items-start text-left lg:sticky lg:top-32">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`info-${currentDesign.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
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
