import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WARDROBE_COLLECTIONS } from '../data/collections';

function MinimalCard({ item, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 lg:gap-24 pb-16 lg:pb-32 border-b border-white/5 last:border-0 last:pb-0`}
    >
      {/* Image */}
      <Link to={`/collections/${item.id}`} className="w-full md:w-1/2 lg:w-7/12 aspect-[4/3] lg:aspect-[16/9] overflow-hidden relative block rounded-2xl border border-white/5 shadow-[0_0_0_rgba(223,76,115,0)] group-hover:shadow-[0_0_40px_rgba(223,76,115,0.15)] transition-all duration-700">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover origin-center transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
      </Link>
      
      {/* Content */}
      <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col items-start max-w-md">
        <span className="text-pink text-[0.55rem] tracking-[0.4em] uppercase font-medium block mb-3 lg:mb-4">
          Selected Design
        </span>
        <h3 className="font-display font-light text-white text-3xl lg:text-4xl leading-tight mb-4 group-hover:text-pink transition-colors duration-500">
          {item.name}
        </h3>
        <div className="w-12 h-px bg-gradient-to-r from-pink to-blue/40 mb-4 lg:mb-6" />
        <p className="font-sans text-[0.85rem] lg:text-[0.95rem] font-light leading-[2.1] text-white/50 mb-8 max-w-sm">
          {item.desc}
        </p>
        <Link 
          to={`/collections/${item.id}`}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-white text-[0.6rem] tracking-[0.2em] uppercase hover:bg-pink hover:border-pink transition-all duration-500"
        >
          Explore Collection
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
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
