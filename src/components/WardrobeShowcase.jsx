import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CATEGORIES = [
  {
    id: 'walk-in',
    title: 'Walk-in Closets',
    description: 'The pinnacle of luxury storage. Island counters, ambient lighting, and panoramic organization.',
    image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=900&q=80',
  },
  {
    id: 'sliding',
    title: 'Sliding Systems',
    description: 'Seamless geometric glass and rich laminates that glide silently, maximizing spatial efficiency.',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80',
  },
  {
    id: 'hinged',
    title: 'Classic Hinged',
    description: 'Timeless fluted doors with premium German hinges for a traditional yet highly refined aesthetic.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
  }
];

export default function WardrobeShowcase() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-32 lg:py-48 bg-[#03070E] relative overflow-hidden">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-20 lg:mb-28">
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-[2px] bg-[#DF4C73]" />
          <span className="text-[#DF4C73] text-xs tracking-[0.4em] uppercase font-semibold">
            Mastering Storage
          </span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display font-light text-white leading-[1.05]"
          style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)' }}
        >
          Bespoke Wardrobe <br className="hidden sm:block" />
          <span className="italic text-white/50">Collections</span>
        </motion.h2>
      </div>

      {/* Grid Showcase */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 + (i * 0.15), ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md mb-8">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-[0.25,0.46,0.45,0.94]"
                  loading="lazy"
                />
                
                {/* Overlay gradient for hover text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03070E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Number Indicator */}
                <div className="absolute top-6 left-6 text-white/40 font-sans text-xs tracking-[0.3em] font-medium z-10">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Text */}
              <div className="px-2">
                <h3 className="font-display text-2xl lg:text-3xl text-white mb-4 transition-colors duration-500 group-hover:text-[#DF4C73]">
                  {cat.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed font-light max-w-[280px]">
                  {cat.description}
                </p>
              </div>

              {/* Decorative line on hover */}
              <div className="absolute -bottom-8 left-2 w-0 h-[1px] bg-[#DF4C73]/50 transition-all duration-700 group-hover:w-16" />
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
