import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SERVICES } from '../data/content';
import { TextReveal } from '../utils/animations';
import { Link } from 'react-router-dom';

function BentoCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  
  const getGridClasses = (i) => {
    switch(i) {
      case 0: return 'lg:col-span-2 lg:row-span-2 aspect-[4/5] lg:aspect-auto min-h-[400px] lg:min-h-[600px]'; // Big hero
      case 1: return 'lg:col-span-1 lg:row-span-1 aspect-[4/5] lg:aspect-square min-h-[300px]'; 
      case 2: return 'lg:col-span-1 lg:row-span-1 aspect-[4/5] lg:aspect-square min-h-[300px]';
      case 3: return 'lg:col-span-1 lg:row-span-1 aspect-[4/5] lg:aspect-[4/3] min-h-[300px]';
      case 4: return 'lg:col-span-2 lg:row-span-1 aspect-[4/5] lg:aspect-[21/9] min-h-[300px]';
      default: return 'lg:col-span-1 aspect-[4/5]';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-3xl bg-[#0a0f16] ${getGridClasses(index)} shadow-2xl`}
    >
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[0.16,1,0.3,1] group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Dark gradient base that's always there for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />
      
      {/* Additional dark gradient that fades in on hover for the description */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[0.16,1,0.3,1]" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10 pointer-events-none">
        <div className="relative z-10 w-full">
          
          {/* Always visible header */}
          <div className="transform transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-2">
            <span className="text-[#DF4C73] text-[10px] tracking-[0.3em] uppercase font-semibold block mb-2 drop-shadow-md">
              {service.tagline}
            </span>
            <h3 className="font-display text-3xl lg:text-4xl text-white font-light drop-shadow-lg leading-tight">
              {service.title}
            </h3>
          </div>
          
          {/* Expanding description container */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-[0.16,1,0.3,1] pointer-events-auto">
            <div className="overflow-hidden">
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 flex flex-col">
                <p className="text-white/80 text-sm leading-relaxed mb-5 max-w-[90%] font-light">
                  {service.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 text-white border-b border-white/30 hover:border-[#DF4C73] hover:text-[#DF4C73] pb-1 text-[10px] tracking-[0.25em] uppercase font-semibold transition-colors duration-300 w-max"
                >
                  Inquire Now <span className="text-lg leading-none">→</span>
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="services" className="bg-[#03070E] pt-28 pb-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        
        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px] bg-[#DF4C73]" style={{ boxShadow: '0 0 20px rgba(223, 76, 115, 0.4)' }} />
            <span className="text-[#DF4C73] text-xs tracking-[0.4em] uppercase font-semibold">
              Our Expertise
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <TextReveal
              text="Comprehensive _Interior Solutions_"
              className="font-display font-light text-white leading-[1.1]"
              style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)' }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="text-white/70 text-sm md:text-base max-w-[340px] leading-relaxed lg:text-right font-light"
            >
              Designed for your space. Crafted for your lifestyle. Discover our end-to-end luxury services.
            </motion.p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {SERVICES.map((service, i) => (
            <BentoCard key={service.id} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
