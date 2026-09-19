import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../data/content';
import { Link } from 'react-router-dom';

const EASE = [0.16, 1, 0.3, 1];

export default function Services() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const [active, setActive] = useState(0);

  const service = SERVICES[active];

  return (
    <section id="services" className="bg-[#03070E] pt-24 pb-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">

        {/* ── Header ─────────────────────────────── */}
        <div ref={headerRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-10 h-[2px] bg-[#DF4C73]" />
            <span className="text-[#DF4C73] text-[10px] tracking-[0.4em] uppercase font-semibold">
              Our Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="font-display font-light text-white leading-[1.05]"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}
          >
            Comprehensive{' '}
            <em className="not-italic text-[#DF4C73]">Interior Solutions</em>
          </motion.h2>
        </div>

        {/* ── Main Layout ─────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-stretch">

          {/* Left — Tab list */}
          <div className="flex flex-row lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:w-[260px] shrink-0 scroll-hidden">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`relative group text-left px-4 py-3 lg:py-4 rounded-2xl transition-all duration-300 whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink border
                  ${active === i
                    ? 'bg-white/[0.07] border-[#DF4C73]/40 text-white'
                    : 'bg-transparent border-transparent text-white/45 hover:text-white/75 hover:bg-white/[0.04]'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-semibold tracking-widest transition-colors duration-300
                      ${active === i ? 'text-[#DF4C73]' : 'text-white/25 group-hover:text-[#DF4C73]/60'}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans font-medium text-sm leading-snug">
                    {s.title}
                  </span>
                </div>

                {/* Active indicator bar */}
                {active === i && (
                  <motion.div
                    layoutId="service-tab-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-1/2 rounded-full bg-[#DF4C73]"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}

            {/* CTA below tabs on desktop */}
            <div className="hidden lg:block mt-6 pl-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-[#DF4C73] text-[10px] tracking-[0.3em] uppercase font-semibold border-b border-[#DF4C73]/40 hover:border-[#DF4C73] pb-1 transition-colors duration-300"
              >
                Inquire Now →
              </Link>
            </div>
          </div>

          {/* Right — Content panel */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full"
              >
                {/* Photo */}
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto md:min-h-[480px]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Subtle bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Tagline badge on photo */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-white/60 text-[9px] tracking-[0.35em] uppercase">
                      {service.tagline}
                    </span>
                  </div>
                </div>

                {/* Info panel */}
                <div className="flex flex-col justify-center rounded-3xl bg-white/[0.04] border border-white/[0.07] p-8 lg:p-10">
                  
                  {/* Service number */}
                  <span className="text-[#DF4C73]/50 text-[11px] tracking-[0.4em] uppercase font-semibold mb-4 block">
                    {String(active + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-display font-light text-white leading-tight mb-2"
                    style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)' }}
                  >
                    {service.title}
                  </h3>

                  {/* Pink rule */}
                  <div className="w-10 h-[2px] bg-gradient-to-r from-[#DF4C73] to-[#5AB9EA] mb-8 rounded-full" />

                  {/* Bullet points */}
                  <ul className="flex flex-col gap-4">
                    {service.bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                        className="flex items-start gap-3 group/bullet"
                      >
                        <span className="mt-[5px] w-[6px] h-[6px] rounded-full bg-[#DF4C73] flex-shrink-0 group-hover/bullet:scale-110 transition-transform duration-200" />
                        <span className="text-white/70 text-[13px] md:text-sm leading-snug font-light group-hover/bullet:text-white/90 transition-colors duration-200">
                          {bullet}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Mobile CTA */}
                  <div className="mt-10 lg:hidden">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-[#DF4C73] text-[10px] tracking-[0.3em] uppercase font-semibold border-b border-[#DF4C73]/40 hover:border-[#DF4C73] pb-1 transition-colors duration-300"
                    >
                      Inquire Now →
                    </Link>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
