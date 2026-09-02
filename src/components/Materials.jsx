import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MATERIALS } from '../data/content';
import { TextReveal } from '../utils/animations';
import { ArrowUpRight } from 'lucide-react';

const EASE   = [0.25, 0.46, 0.45, 0.94];
const DISPLAY = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const SANS    = "'Inter', system-ui, sans-serif";

function MaterialCard({ mat, index, isPink }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: 0.1 * index, ease: EASE }}
      className="group relative p-8 md:p-10 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 hover:border-pink/40 hover:bg-[#111] transition-all duration-700 overflow-hidden rounded-2xl shadow-2xl"
    >
      {/* Subtle background glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink/20 to-blue/20 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-1000 pointer-events-none" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <span className="block mb-2 text-3xl md:text-4xl text-white font-display font-light group-hover:text-pink transition-colors duration-500">
            {mat.name}
          </span>
          <span className="text-[0.65rem] tracking-[0.3em] uppercase text-white/40 font-medium">
            {mat.origin}
          </span>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-pink/40 group-hover:bg-pink/10 group-hover:scale-110 group-hover:rotate-45 transition-all duration-700 shrink-0 shadow-lg">
          <ArrowUpRight size={16} className="text-white/40 group-hover:text-pink transition-colors duration-500" />
        </div>
      </div>
      
      <p className="font-sans text-[0.95rem] text-white/50 leading-relaxed mb-8 relative z-10 group-hover:text-white/70 transition-colors duration-500 max-w-lg">
        {mat.description}
      </p>

      {mat.qualities && mat.qualities.length > 0 && (
        <div className="flex flex-wrap gap-2.5 relative z-10">
          {mat.qualities.map((quality, i) => (
            <span 
              key={i} 
              className="px-4 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-white/60 rounded-full group-hover:border-pink/30 group-hover:text-white/90 group-hover:bg-pink/5 transition-all duration-500 shadow-sm"
            >
              {quality}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function MaterialsSection() {
  const hardware = MATERIALS.filter(m => m.category === 'Hardware');
  const substrate = MATERIALS.filter(m => m.category === 'Substrate');

  return (
    <section 
      id="materials" 
      className="py-24 lg:py-32 relative overflow-hidden bg-black"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* SECTION HEADER */}
        <div className="mb-24 lg:mb-40 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-pink/60" />
            <span className="text-pink/80 text-[0.65rem] tracking-[0.4em] uppercase font-bold">
              The Foundation
            </span>
            <div className="w-12 h-px bg-pink/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-light text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-8"
          >
            Material <em className="italic text-pink">Integrity</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-[1rem] lg:text-[1.1rem] text-white/50 leading-relaxed max-w-2xl font-light"
          >
            An architectural space is only as timeless as the materials that construct it. We partner exclusively with industry-leading manufacturers to ensure absolute precision, silence, and longevity.
          </motion.p>
        </div>

        {/* MATERIAL CATEGORY 1: HARDWARE (Sticky Layout) */}
        <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-20 mb-32 lg:mb-48">
          
          {/* Sticky Image Left */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-32 h-[50vh] lg:h-[75vh] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10 shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: EASE }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="absolute inset-0 bg-black/20 z-10" />
              <img 
                src="/projects/media__1784490387392.jpg" 
                alt="Hardware Detail" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 hover:scale-105 transition-all duration-1000"
              />
            </motion.div>
          </div>
          
          {/* Scrolling Content Right */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center pt-8 lg:pt-16">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-12 lg:mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/30 text-[0.6rem] tracking-[0.3em] uppercase font-bold">Category 01</span>
                <div className="w-6 h-px bg-white/20" />
              </div>
              <h3 className="font-display font-light text-4xl lg:text-5xl text-white mb-6">Precision Engineering</h3>
              <p className="font-sans text-[1rem] text-white/50 leading-relaxed max-w-xl">
                Every hinge, track, and handle is engineered for silent, flawless operation. We utilize Austrian and German-engineered mechanisms to guarantee a lifetime of effortless movement.
              </p>
            </motion.div>
            
            <div className="flex flex-col gap-6">
              {hardware.map((mat, i) => (
                <MaterialCard key={mat.id} mat={mat} index={i} isPink={true} />
              ))}
            </div>
          </div>

        </div>

        {/* MATERIAL CATEGORY 2: SUBSTRATE (Sticky Layout) */}
        <div className="relative flex flex-col lg:flex-row-reverse gap-12 lg:gap-20">
          
          {/* Sticky Image Right */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-32 h-[50vh] lg:h-[75vh] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10 shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: EASE }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="absolute inset-0 bg-black/20 z-10" />
              <img 
                src="/projects/media__1784490387517.jpg" 
                alt="Raw Wood Grain" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 hover:scale-105 transition-all duration-1000"
              />
            </motion.div>
          </div>

          {/* Scrolling Content Left */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center pt-8 lg:pt-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-12 lg:mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/30 text-[0.6rem] tracking-[0.3em] uppercase font-bold">Category 02</span>
                <div className="w-6 h-px bg-white/20" />
              </div>
              <h3 className="font-display font-light text-4xl lg:text-5xl text-white mb-6">Structural Cores</h3>
              <p className="font-sans text-[1rem] text-white/50 leading-relaxed max-w-xl">
                The hidden layers dictate the lifespan of your interiors. We exclusively use marine-grade, high-density substrates that resist moisture, impact, and time.
              </p>
            </motion.div>
            
            <div className="flex flex-col gap-6">
              {substrate.map((mat, i) => (
                <MaterialCard key={mat.id} mat={mat} index={i} isPink={false} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
