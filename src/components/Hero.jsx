import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { COMPANY } from '../data/content';
import { ChevronDown, Shield, Star, Wrench } from 'lucide-react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.4 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const handleConsult = () => {
    if (COMPANY.whatsapp) {
      window.open(`https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I'm%20interested%20in%20a%20custom%20wardrobe.`, '_blank');
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90"
          alt="Luxury custom wardrobe by Latushya Bangalore"
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black-deep via-black-deep/75 to-black-deep/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black-deep/80 via-transparent to-black-deep/30" />
      </motion.div>

      {/* Decorative gold vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute left-16 top-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-gold to-transparent origin-top hidden lg:block z-10"
      />

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Brand Label */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">{COMPANY.specialty}</span>
          </motion.div>

          {/* Headline — SEO: Modular Wardrobes Bangalore */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.05] mb-6"
          >
            Luxury Wardrobes
            <br />
            <span className="italic text-gold">Crafted</span> For You
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="text-gray-subtle text-base md:text-lg leading-relaxed max-w-xl mb-10 font-light"
          >
            {COMPANY.subTagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleConsult}
              className="btn-gold inline-block text-center"
              id="hero-cta-consult"
            >
              <span>Book Free Consultation</span>
            </button>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline inline-block text-center"
              id="hero-cta-portfolio"
            >
              <span>View Our Work</span>
            </a>
          </motion.div>

          {/* Trust signals — real, non-numeric */}
          <motion.div variants={itemVariants} className="mt-14 flex flex-wrap gap-6">
            {[
              { Icon: Shield,  label: 'Custom Designed' },
              { Icon: Wrench,  label: 'Häfele & Hettich Hardware' },
              { Icon: Star,    label: 'Free Home Consultation' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-7 h-7 border border-gold/40 flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-gold" />
                </div>
                <span className="text-gray-subtle text-xs tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-gray-light text-[10px] tracking-ultra uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-gold" />
        </motion.div>
      </motion.div>

      {/* Corner decorative text — updated to wardrobe focus */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 writing-vertical text-[10px] tracking-widest text-gray-light/40 uppercase hidden xl:block z-10"
      >
        Custom Wardrobes — Bangalore, Karnataka
      </motion.div>
    </section>
  );
}
