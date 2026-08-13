import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WARDROBE_COLLECTIONS } from '../data/collections';

function MinimalCard({ item, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative group flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-32 pb-24 lg:pb-40 border-b border-white/5 last:border-0 last:pb-0`}
    >
      {/* Background Watermark Number */}
      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} text-[12rem] lg:text-[18rem] leading-none font-display font-light text-white/[0.02] select-none pointer-events-none -z-10 tracking-tighter`}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Image Column */}
      <div className="w-full md:w-[45%] lg:w-[40%] relative">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink/30 to-blue/30 opacity-0 group-hover:opacity-100 blur-[80px] transition-opacity duration-1000 rounded-full" />
        
        <Link to={`/collections/${item.id}`} className="block relative overflow-hidden rounded-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] group-hover:border-white/20 transition-all duration-700 z-10 bg-[#050505]">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={isInView ? { scale: 1 } : { scale: 1.1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full h-full"
          >
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-auto object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105 opacity-90 group-hover:opacity-100"
              loading="lazy"
            />
          </motion.div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        </Link>
      </div>
      
      {/* Content Column */}
      <div className="w-full md:w-[55%] lg:w-[50%] flex flex-col items-start relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-4 mb-6 lg:mb-8"
        >
          <div className="w-8 h-px bg-pink" />
          <span className="text-pink text-[0.6rem] tracking-[0.3em] uppercase font-medium">
            Selected Design
          </span>
        </motion.div>

        <motion.h3 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display font-light text-white text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6 lg:mb-8 tracking-tight"
        >
          {item.name}
        </motion.h3>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-sans text-[0.95rem] font-light leading-[1.9] text-white/50 mb-10 max-w-md"
        >
          {item.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link 
            to={`/collections/${item.id}`}
            className="group/btn inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 text-white text-[0.65rem] font-medium tracking-[0.2em] uppercase overflow-hidden relative"
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-pink translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 rounded-full" />
            
            <span className="relative z-10 transition-colors duration-500">Explore Collection</span>
            
            <div className="relative z-10 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white transition-colors duration-500">
              <ArrowRight size={12} className="text-white group-hover/btn:text-pink transform group-hover/btn:-rotate-45 transition-all duration-500" />
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SignatureCollections() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section id="collections" className="py-24 lg:py-32 bg-black relative overflow-hidden">
      
      <div className="absolute top-1/3 left-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-pink/5 to-transparent opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 lg:mb-24 flex flex-col items-center text-center max-w-2xl mx-auto"
        >
          <span className="text-pink text-[0.6rem] tracking-[0.4em] uppercase font-medium block mb-4 lg:mb-6">
            Signature Series
          </span>
          <h2 className="font-display font-light text-white text-4xl lg:text-6xl mb-6">
            Wardrobe <em className="italic text-pink">Collections</em>
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-pink to-blue/40 mb-6 lg:mb-8" />
          <p className="font-sans text-[0.95rem] lg:text-[1.05rem] font-light leading-[2.1] text-gray-subtle">
            Explore our range of bespoke wardrobes, designed for different spaces, styles and lifestyles.
          </p>
        </motion.div>

        {/* Minimal List Layout */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {WARDROBE_COLLECTIONS.filter(item => item.id !== 'bedroom').map((item, index) => (
            <MinimalCard key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
