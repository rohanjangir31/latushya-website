import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layout, UtensilsCrossed, Sofa, PenTool } from 'lucide-react';
import { SERVICES, COMPANY } from '../data/content';
import { TextReveal } from '../utils/animations';
import { Link } from 'react-router-dom';

const DoorOpenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M13 4h3a2 2 0 0 1 2 2v14"/>
    <path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/>
    <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"/>
  </svg>
);

const iconMap = { Layout, UtensilsCrossed, Sofa, PenTool, DoorOpen: DoorOpenIcon };

function ServiceRow({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = iconMap[service.icon] || Layout;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      id={service.id}
      className={`group relative overflow-hidden border-b border-gray-luxury/[0.1] last:border-b-0
        grid grid-cols-1 lg:grid-cols-[3fr_2fr] min-h-[500px] scroll-mt-[80px]`}
    >
      {/* ── IMAGE — takes 60% on desktop ─────────────────── */}
      <div
        className={`relative overflow-hidden h-[300px] lg:h-auto
          ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          initial={{ scale: 1.1 }}
          animate={inView ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Directional gradient — fades toward the text panel */}
        <div
          className={`absolute inset-0 ${
            isEven
              ? 'bg-gradient-to-r from-transparent to-black-deep/60'
              : 'bg-gradient-to-l from-transparent to-black-deep/60'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black-deep/50 to-transparent" />

        {/* Photo caption — editorial style, bottom of image */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className={`absolute bottom-5 flex items-center gap-3 z-10
            ${isEven ? 'left-5' : 'right-5 flex-row-reverse'}`}
        >
          <div className="w-8 h-px bg-gold/35" />
          <span className="text-white/30 text-[8px] tracking-[0.32em] uppercase">
            Bangalore · Custom Made
          </span>
        </motion.div>
      </div>

      {/* ── TEXT — takes 40% on desktop ──────────────────── */}
      <div
        className={`relative flex flex-col justify-center px-8 py-12 lg:px-14 lg:py-16
          bg-black-deep overflow-hidden
          ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
      >
        {/* ── OVERSIZED DECORATIVE NUMERAL ─────────────────
            Bleeds off the right (or left) edge of the text panel.
            Creates spatial depth and breaks the "content box" feel. */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 font-display font-bold
            text-white/[0.035] leading-none select-none pointer-events-none
            transition-all duration-700 group-hover:text-white/[0.055]
            ${isEven ? '-right-6' : '-left-6'}`}
          style={{ fontSize: 'clamp(7rem, 13vw, 12rem)' }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Hover top-line — but only on the text panel, not the image */}
        <div className={`absolute top-0 w-0 h-0.5 bg-gold transition-all duration-700 group-hover:w-full
          ${isEven ? 'left-0' : 'right-0'}`}
        />

        {/* Hover bg shift */}
        <div className="absolute inset-0 bg-black-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Icon row */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -16 : 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-9 h-9 border border-gold/25 group-hover:border-gold/60 group-hover:bg-gold/[0.08] flex items-center justify-center transition-all duration-400 flex-shrink-0">
              <Icon className="text-gold" />
            </div>
            <span className="text-gold/70 text-[8px] tracking-[0.38em] uppercase font-medium">
              {service.tagline}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-light text-white group-hover:text-gold/90
              transition-colors duration-400 leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.8rem)' }}
          >
            {service.title}
          </motion.h3>

          {/* Animated gold rule — grows in on scroll */}
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '2.5rem' } : {}}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="h-px bg-gold/45 mb-6"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.44 }}
            className="text-gray-subtle text-sm leading-[1.85] max-w-[300px] mb-9 font-light"
          >
            {service.description}
          </motion.p>

          {/* CTA — styled like the reference image, now routing to /contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.58 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 border-b border-gold/40 pb-1.5 group/link
                hover:border-gold/90 transition-colors duration-300 w-max cursor-pointer"
            >
              <span className="text-gold text-[10px] tracking-[0.32em] uppercase font-medium">
                Inquire Now
              </span>
              <span className="text-gold text-sm group-hover/link:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="services" className="bg-black-deep">

      {/* ── Section header ──────────────────────────────── */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-5"
        >
          <div className="w-5 h-px bg-gold" />
          <span className="text-gold text-[9px] tracking-[0.35em] uppercase font-medium">
            Our Expertise
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <TextReveal
            text="Comprehensive _Interior Solutions_"
            className="font-display font-light text-white leading-[1.05]"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-gray-subtle text-sm max-w-[280px] leading-relaxed lg:text-right font-light"
          >
            Designed for your space. Crafted for your lifestyle.
          </motion.p>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={headerInView ? { width: '100%' } : {}}
          transition={{ duration: 1.1, delay: 0.35 }}
          className="mt-10 h-px bg-gradient-to-r from-gold/35 via-gold/8 to-transparent"
        />
      </div>

      {/* ── Service rows ─────────────────────────────────── */}
      {/* Full-bleed — no max-w container so rows touch viewport edges */}
      <div className="border-t border-b border-gray-luxury/[0.08]">
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* ── Bottom CTA strip ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-14
        flex flex-col sm:flex-row items-center justify-between gap-5
        border-t border-gray-luxury/[0.1]">
        <p className="text-gray-subtle text-sm font-light">
          Ready to transform your space?{' '}
          <span className="text-white">We'll help you decide — for free.</span>
        </p>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn-outline flex-shrink-0"
          id="services-cta"
        >
          <span>Book Free Consultation</span>
        </a>
      </div>
    </section>
  );
}
