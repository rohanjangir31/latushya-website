import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WARDROBE_COLLECTIONS } from '../data/collections';
import PageTransition from '../components/PageTransition';

function EditorialHubCard({ item, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const isImageLeft = index % 2 === 0;
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 cursor-pointer`}
      style={{ marginTop: index === 0 ? '0' : '180px' }}
    >
      {/* Image Column */}
      <div className="w-full lg:w-[45%] relative overflow-hidden bg-[#0a0a0c] rounded-2xl border border-white/5 shadow-[0_0_0_rgba(223,76,115,0)] group-hover:shadow-[0_0_40px_rgba(223,76,115,0.15)] transition-all duration-700">
        <Link to={`/collections/${item.id}`} className="block w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden relative">
          <img 
            src={item.image}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-contain p-4 opacity-80 group-hover:opacity-100 transition-transform duration-1000 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
        </Link>
      </div>
      
      {/* Text Column */}
      <div className="w-full lg:w-[50%] flex flex-col items-start text-left">
        <Link to={`/collections/${item.id}`} className="contents">
          {/* Index Counter with integrated line */}
          <div className="flex items-center gap-[12px] mb-6">
            <div className="w-[18px] h-[1px] bg-gradient-to-r from-pink to-blue/40" />
            <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-white/30">
              Collection {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="font-display font-light text-4xl lg:text-5xl text-white mb-6 group-hover:text-pink transition-colors duration-500 leading-tight">
            {item.name}
          </h3>

          <p className="font-sans text-[0.9375rem] font-light leading-[1.95] text-white/50 mb-8 max-w-sm">
            {item.intro || item.desc}
          </p>

          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 text-white text-[0.65rem] font-medium tracking-[0.2em] uppercase group-hover:bg-pink group-hover:border-pink group-hover:text-white transition-all duration-500">
            Explore Collection
            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-500" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

export default function WardrobesHub() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <main className="bg-black min-h-screen pt-[120px]">
        {/* Hub Header - Perfectly matching Portfolio.jsx */}
        <section className="relative px-8 lg:px-16 max-w-7xl mx-auto mb-[88px]">
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-[12px] mb-[18px]"
          >
            <div className="w-[18px] h-[1px] bg-gradient-to-r from-pink to-blue/40" />
            <span className="font-sans text-[0.5625rem] tracking-[0.38em] uppercase text-pink/65">
              The Wardrobe Portfolio
            </span>
          </motion.div>
          
          <div className="flex flex-wrap items-end justify-between gap-[20px]">
            <motion.h1 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display font-light text-white tracking-[-0.015em] leading-[1.05]"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
            >
              Signature <em className="italic text-pink">Collections</em>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-sans text-[0.75rem] leading-[1.8] text-white/30 max-w-[220px] shrink-0 lg:text-left"
            >
              Discover our bespoke approach to storage. From architectural sliding systems to expansive master walk-ins, every collection is tailored to elevate your personal sanctuary.
            </motion.p>
          </div>

          {/* Ruled line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              height: '1px',
              background: 'linear-gradient(to right, rgba(90, 185, 234,0.22), rgba(223, 76, 115,0.05) 55%, transparent)',
              transformOrigin: 'left',
              marginTop: '36px',
            }}
          />
        </section>

        {/* Collections Editorial Layout */}
        <section className="pb-40 px-6 lg:px-12 max-w-[1600px] mx-auto">
          <div className="flex flex-col">
            {WARDROBE_COLLECTIONS.map((item, index) => (
              <EditorialHubCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
