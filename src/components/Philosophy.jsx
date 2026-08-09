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
            At Latushya, our philosophy extends far beyond visual aesthetics. While we craft breathtakingly beautiful interiors, our ultimate aim is to engineer spaces that provide profound, enduring comfort for decades to come. We believe your home should radiate a peaceful, welcoming energy. By blending premium materials with intelligent design, we create sanctuaries that don't just look spectacular but they also feel effortlessly right.
          </motion.p>
        </div>

        {/* Right: Parallax Image */}
        <div className="w-full lg:w-7/12 h-[500px] lg:h-[700px] overflow-hidden relative group rounded-[2rem] border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-[0_0_60px_rgba(223,76,115,0.12)] hover:border-white/10">
          
          {/* Background Image with Parallax */}
          <motion.div 
            style={{ y, scale: 1.15 }}
            className="absolute inset-0 w-full h-full origin-center transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.18]"
          >
            <img 
              src="/projects/moody_luxury_interior.jpg" 
              alt="Bespoke Wardrobe Design and Enduring Comfort"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Elegant dark gradient overlay to make text pop */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070E] via-[#03070E]/30 to-[#03070E]/10 opacity-90 transition-opacity duration-700" />
          </motion.div>

          {/* Staggered Text Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 lg:p-12 pointer-events-none">
            
            {/* Big Staggered Words */}
            <div className="flex flex-col justify-center h-full gap-8 lg:gap-12 mt-4">
              <span className="text-[#F9F9F9]/90 font-sans text-3xl lg:text-[2.75rem] font-normal tracking-wide self-start ml-[15%] lg:ml-[20%]">MORE</span>
              <span className="text-[#F9F9F9]/90 font-sans text-3xl lg:text-[2.75rem] font-normal tracking-wide self-end mr-[15%] lg:mr-[20%]">THAN</span>
              <span className="text-[#F9F9F9]/90 font-sans text-3xl lg:text-[2.75rem] font-normal tracking-wide self-start ml-[10%] lg:ml-[15%]">JUST</span>
              <span className="text-[#F9F9F9]/90 font-sans text-3xl lg:text-[2.75rem] font-normal tracking-wide self-end mr-[5%] lg:mr-[10%]">AESTHETICS.</span>
            </div>
            
            {/* Bottom Caption */}
            <p className="text-white/70 font-sans text-[8px] lg:text-[10px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-center font-normal pb-2">
              What you're really paying for when you invest in bespoke interiors
            </p>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
