import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function Philosophy() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-black-deep overflow-hidden pt-32 pb-40 lg:pt-48 lg:pb-56"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left: Philosophy Text */}
        <div ref={textRef} className="w-full lg:w-5/12 flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-gold/50" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">Our Philosophy</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-light text-white leading-[1.1] mb-10"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            The Art of <br/>
            <span className="text-gray-light/40 italic">Living Well.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-gray-subtle text-sm lg:text-base leading-loose max-w-md"
          >
            We believe that true luxury is quiet. It is found in the perfect alignment of architectural lines, the tactile warmth of premium materials, and the seamless integration of form and function. At Latushya, every space we craft is an homage to timeless Italian design principles, tailored exclusively to your lifestyle.
          </motion.p>
        </div>

        {/* Right: Parallax Image */}
        <div className="w-full lg:w-7/12 h-[600px] lg:h-[800px] overflow-hidden relative group border border-gray-luxury/10">
          <motion.div 
            style={{ y, scale: 1.15 }}
            className="absolute inset-0 w-full h-full origin-bottom"
          >
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop" 
              alt="Minimalist luxury interior"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Dark gradient overlay for mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-black-deep/80 via-black-deep/20 to-transparent" />
          </motion.div>

          {/* Decorative Corner Accents */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
        
      </div>
    </section>
  );
}
