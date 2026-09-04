import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CATEGORIES = [
  {
    id: 'walk-in',
    title: 'Walk-in Closets',
    description: 'The pinnacle of luxury storage. Expansive interiors featuring integrated island counters, ambient sensor lighting, and panoramic organization systems for the ultimate dressing experience.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=100&w=2500',
  },
  {
    id: 'sliding',
    title: 'Sliding Systems',
    description: 'Seamless architectural elegance. Our sliding systems feature ultra-slim profiles, soft-close German mechanisms, and stunning geometric glass divisions that maximize your spatial efficiency.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=100&w=2500',
  },
  {
    id: 'hinged',
    title: 'Classic Hinged',
    description: 'Timeless sophistication. Beautifully crafted fluted doors and rich timber accents mounted on premium silent hinges, delivering a traditional yet highly refined aesthetic for modern homes.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=100&w=2500',
  }
];

export default function WardrobeShowcase() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-32 lg:py-48 bg-[#03070E] relative overflow-hidden">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-16 lg:mb-24">
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
          Custom Wardrobe <br className="hidden sm:block" />
          <span className="italic text-white/50">Collections</span>
        </motion.h2>
      </div>

      {/* Hover Accordion Showcase */}
      <div className="max-w-[1800px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 h-[80vh] lg:h-[75vh] min-h-[600px]">
          {CATEGORIES.map((cat, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={cat.id}
                onHoverStart={() => setActive(i)}
                onClick={() => setActive(i)}
                initial={false}
                animate={{ flex: isActive ? 6 : 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-2xl cursor-pointer group bg-[#0A111F]"
              >
                {/* Background Image */}
                <motion.img 
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover origin-center"
                  initial={false}
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />

                {/* Dark Gradient Overlay */}
                <div 
                  className={`absolute inset-0 transition-all duration-700 ${isActive ? 'bg-gradient-to-t from-[#03070E] via-[#03070E]/30 to-transparent opacity-95' : 'bg-black/60 group-hover:bg-black/40'}`} 
                />

                {/* Content Container */}
                <div className="absolute inset-0 p-6 lg:p-12 flex flex-col justify-end pointer-events-none">
                  
                  {/* Rotated Title for Inactive State (Desktop Only) */}
                  <div className={`hidden lg:flex absolute inset-0 items-end pb-12 justify-center transition-all duration-500 delay-100 ${isActive ? 'opacity-0 blur-sm translate-y-4' : 'opacity-100 blur-0 translate-y-0'}`}>
                    <h3 className="text-white/60 text-xl font-display tracking-widest whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      {cat.title}
                    </h3>
                  </div>

                  {/* Mobile Inactive Title */}
                  <div className={`lg:hidden absolute bottom-6 left-6 transition-all duration-500 delay-100 ${isActive ? 'opacity-0 blur-sm translate-y-2' : 'opacity-100 blur-0 translate-y-0'}`}>
                    <h3 className="text-white/80 text-lg font-display tracking-wide">{cat.title}</h3>
                  </div>

                  {/* Active State Content */}
                  <motion.div 
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                    transition={{ duration: 0.6, delay: isActive ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 max-w-xl"
                  >
                    <div className="text-[#DF4C73] text-[10px] lg:text-xs tracking-[0.4em] uppercase font-bold mb-4 drop-shadow-md">
                      0{i + 1} // Signature
                    </div>
                    <h3 className="text-3xl lg:text-6xl font-display text-white mb-4 lg:mb-6 leading-tight drop-shadow-lg">
                      {cat.title}
                    </h3>
                    {/* Hide description on mobile to save space if needed, but flex-6 is huge so it's fine */}
                    <p className="text-white/70 text-sm lg:text-lg font-light leading-relaxed drop-shadow-md">
                      {cat.description}
                    </p>
                    
                    <div className="mt-8">
                      <span className="inline-flex items-center gap-3 text-white text-xs lg:text-sm tracking-widest uppercase pb-1 border-b border-[#DF4C73]/30">
                        Explore Collection <span className="text-[#DF4C73] group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
