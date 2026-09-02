import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SlidingSubTypes({ subTypes }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  if (!subTypes || subTypes.length === 0) return null;

  return (
    <div ref={ref} className="bg-black-charcoal border-y border-gray-luxury/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-24">

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1.5px] bg-pink/70" />
            <span className="text-pink/70 text-[9px] tracking-[0.42em] uppercase font-medium">
              Glazing & Door Finishes
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h4
              className="font-display font-light text-white leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)' }}
            >
              Choose Your{' '}
              <span className="text-pink/90 italic">Perfect Finish</span>
            </h4>
            <p className="text-white/40 text-[0.85rem] leading-[1.8] max-w-sm md:text-right font-light">
              Explore our curated selection of premium wardrobe door finishes. 
              Each material is precision-engineered for durability and effortless aesthetic appeal.
            </p>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 h-px bg-gradient-to-r from-pink/20 via-pink/5 to-transparent"
          />
        </motion.div>

        {/* ── Cards Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-luxury/10 border border-gray-luxury/10 rounded-xl overflow-hidden">
          {subTypes.map((type, i) => (
            <motion.div
              key={type.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.07 }}
              className="group relative bg-black px-8 py-10 overflow-hidden
                hover:bg-black-deep transition-colors duration-400 cursor-default"
            >
              {/* Hover top-line accent */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-pink to-blue
                group-hover:w-full transition-all duration-500" />

              {/* Index number — oversized decorative */}
              <div
                className="absolute bottom-2 right-4 font-display font-bold text-white/[0.02]
                  leading-none select-none pointer-events-none group-hover:text-white/[0.05]
                  transition-all duration-500"
                style={{ fontSize: '6rem' }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Small index pill */}
                <span className="inline-block mb-6 text-[9px] tracking-[0.38em] uppercase
                  text-pink/40 group-hover:text-pink/80 transition-colors duration-300 font-medium">
                  Finish {String(i + 1).padStart(2, '0')}
                </span>

                {/* Finish name */}
                <h5 className="font-display font-light text-white/90 group-hover:text-white
                  transition-colors duration-300 leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)' }}
                >
                  {type.name}
                </h5>

                {/* Animated pink rule */}
                <div className="w-0 group-hover:w-10 h-[1.5px] bg-pink/70 mb-5
                  transition-all duration-500" />

                {/* Description */}
                <p className="text-white/40 group-hover:text-white/60 text-sm leading-[1.8]
                  transition-colors duration-400 font-light pr-4">
                  {type.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footer note ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="text-white/20 text-[10px] tracking-[0.28em] uppercase font-light">
            All finishes available in custom dimensions
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border-b border-pink/30 pb-1.5
              hover:border-pink/70 transition-colors duration-300 w-max group/link"
          >
            <span className="text-pink/70 group-hover/link:text-pink text-[10px] tracking-[0.32em] uppercase font-medium transition-colors duration-300">
              Request a finish sample
            </span>
            <span className="text-pink/70 group-hover/link:text-pink text-sm group-hover/link:translate-x-1
              transition-all duration-300">→</span>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
