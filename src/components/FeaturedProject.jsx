import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedProject() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[80vh] min-h-[600px] max-h-[1000px] overflow-hidden bg-black-deep flex items-end lg:items-center"
    >
      {/* Background Parallax Image */}
      <motion.div 
        style={{ y, scale: 1.1 }}
        className="absolute inset-0 w-full h-full origin-bottom"
      >
        <img 
          src="/projects/featured_dining.jpg" 
          alt="Featured luxury dining interior"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradients to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-transparent to-black-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black-deep/80 via-transparent to-transparent lg:w-2/3" />
      </motion.div>

      {/* Floating Info Box */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-0">
        <motion.div 
          ref={textRef}
          initial={{ opacity: 0, x: -30 }}
          animate={isTextInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full lg:w-[480px] p-8 lg:p-14 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group"
        >
          {/* Subtle gradient accent line at the top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink to-blue/40 opacity-70" />

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-6 bg-gradient-to-r from-pink to-blue/60" />
            <span className="text-pink text-[10px] tracking-[0.25em] uppercase font-medium">
              Featured Atmosphere
            </span>
          </div>
          
          <h3 className="font-display font-light text-white text-4xl lg:text-5xl mb-2 leading-tight">
            The Dining Room
          </h3>
          <span className="font-display italic text-white/60 text-2xl lg:text-3xl mb-6 block">
            Signature Space
          </span>
          
          <p className="text-white/50 text-[0.9rem] leading-relaxed mb-10 font-light max-w-[90%]">
            A masterful blend of warmth and elegance. We designed this inviting dining space with deep atmospheric tones, ambient statement lighting, and rich wood textures to create the perfect setting for everyday living and entertaining.
          </p>
          
          <Link 
            to="/portfolio"
            className="inline-flex items-center gap-3 text-white text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 hover:text-pink"
          >
            <span className="relative">
              Explore Portfolio
              <span className="absolute left-0 right-0 -bottom-2 h-px bg-white/20" />
              <span className="absolute left-0 right-0 -bottom-2 h-px bg-pink scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
