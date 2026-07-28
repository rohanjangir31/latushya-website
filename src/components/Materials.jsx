import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MATERIALS } from '../data/content';
import { TextReveal } from '../utils/animations';
import { ArrowUpRight } from 'lucide-react';

const EASE   = [0.25, 0.46, 0.45, 0.94];
const DISPLAY = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const SANS    = "'Inter', system-ui, sans-serif";

function MaterialCard({ mat, index, isGold }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.1 * index, ease: EASE }}
      className="group relative p-6 md:p-8 bg-white/[0.02] border border-white/5 hover:border-gold/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
    >
      {/* Subtle background glow effect on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <span style={{ fontFamily: DISPLAY, fontSize: '32px', color: isGold ? '#D4AF37' : '#fff' }} className="block mb-1 group-hover:translate-x-1 transition-transform duration-500">
            {mat.name}
          </span>
          <span style={{ fontFamily: SANS, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            {mat.origin}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/40 group-hover:bg-gold/10 transition-all duration-500 shrink-0">
          <ArrowUpRight size={14} className="text-white/40 group-hover:text-gold transition-colors duration-500" />
        </div>
      </div>
      
      <p style={{ fontFamily: SANS, fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }} className="mb-6 relative z-10 group-hover:text-white/75 transition-colors duration-500">
        {mat.description}
      </p>

      {/* Exposing the hidden 'qualities' data as premium pill tags */}
      {mat.qualities && mat.qualities.length > 0 && (
        <div className="flex flex-wrap gap-2 relative z-10">
          {mat.qualities.map((quality, i) => (
            <span 
              key={i} 
              className="px-3 py-1 text-[10px] uppercase tracking-widest bg-black-deep/50 border border-white/10 text-white/50 group-hover:border-gold/20 group-hover:text-gold/80 transition-all duration-500"
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
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-50px' });

  // Separate materials into categories
  const hardware = MATERIALS.filter(m => m.category === 'Hardware');
  const substrate = MATERIALS.filter(m => m.category === 'Substrate');

  return (
    <section 
      id="materials" 
      ref={sectionRef}
      style={{
        background: '#0a0a0a',
        paddingTop: '160px',
        paddingBottom: '160px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        
        {/* SECTION HEADER */}
        <div style={{ marginBottom: '100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}
          >
            <div style={{ width: '18px', height: '1px', background: 'rgba(212,175,55,0.65)' }} />
            <span style={{ fontFamily: SANS, fontSize: '12px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.65)' }}>
              The Foundation
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <TextReveal
              text="Material _Integrity_"
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: '#ffffff',
              }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.75, delay: 0.28 }}
              style={{
                fontFamily: SANS,
                fontSize: '0.8125rem',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.40)',
                maxWidth: '320px',
              }}
            >
              An architectural space is only as timeless as the materials that construct it. We partner exclusively with industry-leading manufacturers to ensure absolute precision and longevity.
            </motion.p>
          </div>
        </div>

        {/* MATERIAL CATEGORY 1: HARDWARE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32 items-center">
          <motion.div 
            className="lg:col-span-7 h-[60vh] lg:h-[75vh] relative overflow-hidden"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          >
            <img 
              src="/projects/media__1784490387392.jpg" 
              alt="Hardware Detail" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            >
              <h3 style={{ fontFamily: DISPLAY, fontSize: '40px', color: '#fff', marginBottom: '16px' }}>Precision Engineering</h3>
              <p style={{ fontFamily: SANS, fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '40px' }}>
                Every hinge, track, and handle is engineered for silent, flawless operation. We utilize Austrian and German-engineered mechanisms to guarantee a lifetime of effortless movement.
              </p>
              
              <div className="flex flex-col gap-4">
                {hardware.map((mat, i) => (
                  <MaterialCard key={mat.id} mat={mat} index={i} isGold={true} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* MATERIAL CATEGORY 2: SUBSTRATE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <h3 style={{ fontFamily: DISPLAY, fontSize: '40px', color: '#fff', marginBottom: '16px' }}>Structural Cores</h3>
              <p style={{ fontFamily: SANS, fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '40px' }}>
                The hidden layers dictate the lifespan of your interiors. We exclusively use marine-grade, high-density substrates that resist moisture, impact, and time.
              </p>
              
              <div className="flex flex-col gap-4">
                {substrate.map((mat, i) => (
                  <MaterialCard key={mat.id} mat={mat} index={i} isGold={false} />
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="lg:col-span-7 h-[60vh] lg:h-[75vh] relative overflow-hidden order-1 lg:order-2"
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          >
            <img 
              src="/projects/media__1784490387517.jpg" 
              alt="Raw Wood Grain" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
