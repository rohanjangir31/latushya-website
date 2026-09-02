import { motion } from 'framer-motion';
import { MATERIALS } from '../data/content';

const EASE = [0.25, 0.46, 0.45, 0.94];

const CATEGORY_LABELS = {
  Hardware: { num: '01', title: 'Precision Hardware', description: 'Every hinge, track, and handle is engineered for silent, flawless operation. We utilize Austrian and German-engineered mechanisms to guarantee a lifetime of effortless movement.' },
  Substrate: { num: '02', title: 'Structural Cores', description: 'The hidden layers dictate the lifespan of your interiors. We use marine-grade, high-density substrates that resist moisture, impact, and time.' },
};

function MinimalistRibbon({ mat }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group relative flex flex-col justify-center py-6 pl-8 cursor-default"
    >
      {/* ── Ribbon Lines ── */}
      {/* Base subtle line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 group-hover:bg-transparent transition-colors duration-500 rounded-full" />
      {/* Glowing active ribbon */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-pink via-pink/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-[0_0_12px_rgba(223,76,115,0.6)] rounded-full" />
      
      {/* ── Ambient Background Hover Wash ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink/5 via-pink/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* ── Content ── */}
      <div className="flex items-center gap-4 mb-3 relative z-10">
        <h4 className="font-display font-light text-3xl lg:text-4xl text-white/90 group-hover:text-pink transition-colors duration-500 tracking-wide">
          {mat.name}
        </h4>
        <div className="h-[1px] w-6 bg-white/10 group-hover:bg-pink/40 transition-colors duration-500" />
        <span className="text-[0.6rem] tracking-[0.35em] uppercase text-white/40 font-medium group-hover:text-pink/70 transition-colors duration-500">
          {mat.origin}
        </span>
      </div>
      
      <p className="font-sans text-[0.9rem] text-white/40 leading-relaxed max-w-lg group-hover:text-white/70 transition-colors duration-500 relative z-10 font-light">
        {mat.description}
      </p>

      {mat.qualities?.length > 0 && (
        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 relative z-10">
          {mat.qualities.map((quality, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-[0.55rem] uppercase tracking-[0.25em] text-white/30 group-hover:text-white/60 transition-colors duration-500"
            >
              <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-pink group-hover:shadow-[0_0_6px_rgba(223,76,115,0.8)] transition-all duration-500" />
              {quality}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CategorySection({ category, materials, image, reverse }) {
  const meta = CATEGORY_LABELS[category];
  
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 mb-32 lg:mb-40`}>
      
      {/* ── Photo (Brings Life) ── */}
      <div className="w-full lg:w-1/2">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE }}
          className="relative h-[60vh] lg:h-[75vh] w-full rounded-[2rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)] border border-white/5 group"
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000 z-10" />
          <img 
            src={image} 
            alt={meta.title}
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
          />
        </motion.div>
      </div>

      {/* ── Content & Ribbons ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-pink text-[0.6rem] tracking-[0.4em] uppercase font-bold">{meta.num}</span>
            <div className="w-12 h-[1px] bg-pink/40" />
          </div>
          <h3 className="font-display font-light text-4xl lg:text-5xl xl:text-6xl text-white mb-6 leading-tight">
            {meta.title}
          </h3>
          <p className="font-sans text-[0.95rem] text-white/40 leading-relaxed max-w-md font-light">
            {meta.description}
          </p>
        </motion.div>

        {/* Brand Ribbons */}
        <div className="flex flex-col gap-8">
          {materials.map((mat) => (
            <MinimalistRibbon key={mat.id} mat={mat} />
          ))}
        </div>

      </div>

    </div>
  );
}

export default function MaterialsSection() {
  const hardware = MATERIALS.filter(m => m.category === 'Hardware');
  const substrate = MATERIALS.filter(m => m.category === 'Substrate');

  return (
    <section id="materials" className="py-24 lg:py-36 relative overflow-hidden bg-[#030407]">

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(223,76,115,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="mb-24 lg:mb-40 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-pink/40" />
            <span className="text-pink/70 text-[0.6rem] tracking-[0.45em] uppercase font-bold">The Foundation</span>
            <div className="w-12 h-px bg-pink/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="font-display font-light text-5xl md:text-6xl lg:text-[5.5rem] text-white leading-[1.05] mb-6 tracking-[-0.02em]"
          >
            Material <em className="italic text-pink">Integrity</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="font-sans text-[1rem] lg:text-[1.05rem] text-white/40 leading-relaxed max-w-xl font-light"
          >
            An architectural space is only as timeless as the materials that construct it. We partner exclusively with industry-leading manufacturers to ensure absolute precision and longevity.
          </motion.p>
        </div>

        {/* ── HARDWARE CATEGORY ── */}
        <CategorySection 
          category="Hardware" 
          materials={hardware} 
          image="/projects/media__1784490387392.jpg" 
          reverse={false} 
        />

        {/* ── SUBSTRATE CATEGORY ── */}
        <CategorySection 
          category="Substrate" 
          materials={substrate} 
          image="/projects/media__1784490387517.jpg" 
          reverse={true} 
        />

      </div>
    </section>
  );
}
