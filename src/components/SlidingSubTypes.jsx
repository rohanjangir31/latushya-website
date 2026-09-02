import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function EditorialSubTypeCard({ type, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const isImageLeft = index % 2 === 0;
  
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
      {/* Image Column */}
      <div className="w-full lg:w-[45%] relative overflow-hidden rounded-xl border border-white/5 shadow-[0_0_0_rgba(223,76,115,0)] group-hover:shadow-[0_0_40px_rgba(223,76,115,0.15)] transition-all duration-700">
        <div className="block w-full overflow-hidden relative">
          {/* We link directly to the image file so users can view it in high-res, 
              or we could just make it open a modal. A simple link to the image is requested by "want to access the photo" */}
          <a href={type.image} target="_blank" rel="noopener noreferrer">
            <img 
              src={type.image}
              alt={type.name}
              className="w-full h-auto object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-transform duration-1000 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700 pointer-events-none" />
          </a>
        </div>
      </div>
      
      {/* Text Column */}
      <div className="w-full lg:w-[45%] flex flex-col items-start text-left">
        {/* Index Counter with integrated line */}
        <div className="flex items-center gap-[12px] mb-6">
          <div className="w-[18px] h-[1px] bg-gradient-to-r from-pink to-blue/40" />
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-white/30">
            Finish {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="font-display font-light text-4xl lg:text-5xl text-white mb-6 group-hover:text-pink transition-colors duration-500 leading-tight">
          {type.name}
        </h3>

        <p className="font-sans text-[0.9375rem] font-light leading-[1.95] text-white/50 mb-8 max-w-sm">
          {type.description}
        </p>

        <a 
          href={type.image} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 text-white text-[0.65rem] font-medium tracking-[0.2em] uppercase group-hover:bg-pink group-hover:border-pink group-hover:text-white transition-all duration-500"
        >
          View High-Res Photo
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-500" />
        </a>
      </div>
    </motion.div>
  );
}

export default function SlidingSubTypes({ subTypes }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  if (!subTypes || subTypes.length === 0) return null;

  return (
    <div className="w-full bg-black pt-16 lg:pt-32 pb-32">
      {/* ── Section header ──────────────────────────────── */}
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
            className="text-white/40 text-[0.95rem] max-w-[400px] leading-[1.8] lg:text-right font-light"
          >
            Explore our curated selection of premium wardrobe door finishes. 
            Click on any finish to view the high-resolution photo in detail.
          </motion.p>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={headerInView ? { width: '100%' } : {}}
          transition={{ duration: 1.1, delay: 0.35 }}
          className="mt-12 h-px bg-gradient-to-r from-pink/30 via-pink/5 to-transparent"
        />
      </div>

      {/* ── Editorial Style Rows ─────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col">
        {subTypes.map((type, i) => (
          <EditorialSubTypeCard key={type.id || i} type={type} index={i} />
        ))}
      </div>
    </div>
  );
}
