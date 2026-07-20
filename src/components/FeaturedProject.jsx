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
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop" 
          alt="Featured luxury interior project"
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
          className="w-full lg:w-[450px] p-8 lg:p-12 bg-black-charcoal/95 backdrop-blur-md border border-gray-luxury/15"
        >
          <span className="text-gold text-[10px] tracking-widest uppercase font-semibold mb-4 block">
            Featured Atmosphere
          </span>
          
          <h3 className="font-display font-light text-white text-3xl lg:text-4xl mb-4 leading-tight">
            The Lavelle Road <br/><i className="text-gray-light/60">Penthouse</i>
          </h3>
          
          <p className="text-gray-subtle text-sm leading-loose mb-8">
            A masterclass in modern minimalism. We designed and executed a fully bespoke interior utilizing rich walnut veneers, fluted glass, and invisible hardware to create a seamless living experience.
          </p>
          
          <Link 
            to="/portfolio"
            className="inline-flex items-center gap-3 text-white text-xs tracking-widest uppercase hover:text-gold transition-colors duration-300 group"
          >
            <span className="relative">
              Explore Portfolio
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-gold/30 group-hover:bg-gold transition-colors duration-300" />
            </span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
