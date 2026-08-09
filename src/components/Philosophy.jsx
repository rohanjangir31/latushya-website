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
      className="relative w-full bg-black overflow-hidden pt-32 pb-40 lg:pt-48 lg:pb-56"
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
            <div className="w-12 h-[2px] bg-gradient-to-r from-pink to-blue opacity-80" />
            <span className="text-pink text-xs tracking-[0.3em] uppercase font-semibold">Our Philosophy</span>
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
            We believe that true luxury is functional. It is found in the silent glide of a wardrobe shutter, the tactile warmth of premium laminates, and the seamless integration of intelligent storage. At Latushya, every bespoke interior we engineer is an homage to uncompromising quality, tailored exclusively to your daily routine.
          </motion.p>
        </div>

        {/* Right: Parallax Image */}
        <div className="w-full lg:w-7/12 h-[500px] lg:h-[700px] overflow-hidden relative group rounded-[2rem] border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-[0_0_60px_rgba(223,76,115,0.12)] hover:border-white/10">
          <motion.div 
            style={{ y, scale: 1.15 }}
            className="absolute inset-0 w-full h-full origin-center transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.18]"
          >
            <img 
              src="/projects/media__1784490387517.jpg" 
              alt="Bespoke Wardrobe Design"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Elegant dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070E] via-[#03070E]/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
