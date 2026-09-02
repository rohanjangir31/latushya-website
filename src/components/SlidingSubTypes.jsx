import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function SubTypeRow({ type, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      id={type.id}
      className={`group relative overflow-hidden border-b border-gray-luxury/[0.08] last:border-b-0
        grid grid-cols-1 lg:grid-cols-[3fr_2fr] lg:h-[500px] scroll-mt-[80px] bg-black`}
    >
      {/* ── IMAGE — takes 60% on desktop ─────────────────── */}
      <div
        className={`relative overflow-hidden h-[350px] lg:h-auto
          ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <motion.img
          src={type.image}
          alt={type.name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          initial={{ scale: 1.1 }}
          animate={inView ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Subdued bottom gradient for caption legibility only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Decorative corner accent */}
        <div className={`absolute bottom-0 w-24 h-[1px] bg-pink/40 z-10 ${isEven ? 'left-0' : 'right-0'}`} />
      </div>

      {/* ── TEXT — takes 40% on desktop ──────────────────── */}
      <div
        className={`relative flex flex-col justify-center px-8 py-14 lg:px-16 lg:py-16
          bg-black-charcoal overflow-hidden
          ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
      >
        {/* OVERSIZED DECORATIVE NUMERAL */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 font-display font-bold
            text-white/[0.02] leading-none select-none pointer-events-none
            transition-all duration-700 group-hover:text-white/[0.04]
            ${isEven ? '-right-6' : '-left-6'}`}
          style={{ fontSize: 'clamp(8rem, 15vw, 14rem)' }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Hover top-line accent */}
        <div className={`absolute top-0 w-0 h-[2px] bg-gradient-to-r from-pink to-blue transition-all duration-700 group-hover:w-full
          ${isEven ? 'left-0' : 'right-0'}`}
        />

        <div className="relative z-10">
          {/* Index pill */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -16 : 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-pink/70 text-[9px] tracking-[0.4em] uppercase font-medium">
              Finish {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 h-[1px] bg-pink/10" />
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-light text-white group-hover:text-white/90
              transition-colors duration-400 leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
          >
            {type.name}
          </motion.h3>

          {/* Animated pink rule */}
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '2.5rem' } : {}}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="h-[2px] bg-pink/70 mb-7"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.44 }}
            className="text-white/50 text-[0.95rem] leading-[1.9] max-w-[340px] mb-10 font-light"
          >
            {type.description}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.58 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 border-b border-pink/30 pb-1.5 group/link
                hover:border-pink/80 transition-colors duration-300 w-max cursor-pointer"
            >
              <span className="text-pink/80 text-[9px] tracking-[0.32em] uppercase font-medium group-hover/link:text-pink transition-colors">
                Request This Finish
              </span>
              <ArrowRight size={14} className="text-pink/80 group-hover/link:translate-x-1 group-hover/link:text-pink transition-all duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function SlidingSubTypes({ subTypes }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  if (!subTypes || subTypes.length === 0) return null;

  return (
    <div className="w-full bg-black pt-16 lg:pt-24">
      {/* ── Section header ──────────────────────────────── */}
      <div ref={headerRef} className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-5"
        >
          <div className="w-12 h-[2px] bg-pink/70" />
          <span className="text-pink/70 text-[10px] tracking-[0.4em] uppercase font-medium">
            Door Finishes
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display font-light text-white leading-[1.1]"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}
          >
            Sliding System <span className="text-pink italic">Subtypes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-white/40 text-[0.95rem] max-w-[350px] leading-[1.8] lg:text-right font-light"
          >
            Explore our curated selection of premium wardrobe door finishes. 
            Each material is precision-engineered for durability and effortless aesthetic appeal.
          </motion.p>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={headerInView ? { width: '100%' } : {}}
          transition={{ duration: 1.1, delay: 0.35 }}
          className="mt-12 h-px bg-gradient-to-r from-pink/30 via-pink/5 to-transparent"
        />
      </div>

      {/* ── Full Bleed Alternating Rows ─────────────────── */}
      <div className="border-t border-b border-gray-luxury/[0.08]">
        {subTypes.map((type, i) => (
          <SubTypeRow key={type.id || i} type={type} index={i} />
        ))}
      </div>
    </div>
  );
}
