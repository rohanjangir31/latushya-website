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

        {/* ── Header ── */}
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

        {/* ── Main Layout: sidebar + content, same height ── */}
        {/* On desktop: ultra-compact 340px height to perfectly match the 5 topics */}
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[340px]">

          {/* Left — Tab sidebar: full height */}
          <div className="flex flex-row lg:flex-col gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:w-[230px] xl:w-[260px] shrink-0 scroll-hidden lg:h-full">

            {/* Tab buttons */}
            <div className="flex flex-row lg:flex-col gap-2 lg:gap-1 flex-shrink-0">
              {SERVICES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`relative group text-left px-4 py-3 lg:py-3 rounded-2xl transition-all duration-300 whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink border overflow-hidden
                    ${active === i
                      ? 'bg-white/[0.07] border-[#DF4C73]/30 text-white'
                      : 'bg-transparent border-transparent text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
                    }`}
                >
                  {/* Active pill highlight */}
                  {active === i && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-2xl bg-white/[0.05]"
                      transition={{ type: 'spring', stiffness: 400, damping: 38 }}
                    />
                  )}

                  <div className="relative flex items-center gap-3 z-10">
                    <span
                      className={`text-[10px] font-bold tracking-widest transition-colors duration-300 w-5 shrink-0
                        ${active === i ? 'text-[#DF4C73]' : 'text-white/20 group-hover:text-[#DF4C73]/50'}`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans font-medium text-[13px] leading-snug">
                      {s.title}
                    </span>
                  </div>

                  {/* Left active bar */}
                  {active === i && (
                    <motion.div
                      layoutId="tab-bar"
                      className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-[#DF4C73]"
                      transition={{ type: 'spring', stiffness: 400, damping: 38 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Inquire Now — placed naturally below tabs */}
            <div className="hidden lg:flex mt-5 pl-4 pb-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-[#DF4C73]/70 hover:text-[#DF4C73] text-[10px] tracking-[0.3em] uppercase font-semibold border-b border-[#DF4C73]/30 hover:border-[#DF4C73] pb-1 transition-all duration-300"
              >
                Inquire Now →
              </Link>
            </div>
          </div>

          {/* Right — Content: photo + info, equal height */}
          <div className="flex-1 min-w-0 lg:h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full items-stretch"
              >

                {/* Photo — stretches to full height of grid row */}
                <div className="relative rounded-3xl overflow-hidden h-[340px] md:h-full">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Tagline watermark */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-[1px] bg-white/40" />
                      <span className="text-white/50 text-[8px] tracking-[0.35em] uppercase">
                        {service.tagline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info panel — same height as photo */}
                <div className="flex flex-col rounded-3xl bg-white/[0.04] border border-white/[0.07] p-6 lg:p-7 h-full">

                  {/* Top: counter + title + rule */}
                  <div>
                    <span className="text-[#DF4C73]/50 text-[10px] tracking-[0.45em] uppercase font-semibold mb-2 block">
                      {String(active + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
                    </span>

                    <h3
                      className="font-display font-light text-white leading-tight mb-2"
                      style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)' }}
                    >
                      {service.title}
                    </h3>

                    <div className="w-10 h-[2px] bg-gradient-to-r from-[#DF4C73] to-[#5AB9EA] mb-4 rounded-full" />
                  </div>

                  {/* Middle: bullet points — flex-1 so they expand to fill space */}
                  <ul className="flex flex-col gap-2.5 flex-1">
                    {service.bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                        className="flex items-start gap-3 group/bullet"
                      >
                        <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-[#DF4C73] flex-shrink-0 opacity-80 group-hover/bullet:opacity-100 group-hover/bullet:scale-125 transition-all duration-200" />
                        <span className="text-white/65 text-[13px] leading-snug font-light group-hover/bullet:text-white/90 transition-colors duration-200">
                          {bullet}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Bottom: CTA pinned to bottom */}
                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-[#DF4C73]/70 hover:text-[#DF4C73] text-[10px] tracking-[0.3em] uppercase font-semibold border-b border-[#DF4C73]/30 hover:border-[#DF4C73] pb-1 transition-all duration-300"
                    >
                      Inquire Now →
                    </Link>

                    {/* Navigation arrows */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActive(i => Math.max(0, i - 1))}
                        disabled={active === 0}
                        className="w-7 h-7 rounded-full border border-white/10 hover:border-[#DF4C73]/50 flex items-center justify-center text-white/30 hover:text-white/80 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-xs"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => setActive(i => Math.min(SERVICES.length - 1, i + 1))}
                        disabled={active === SERVICES.length - 1}
                        className="w-7 h-7 rounded-full border border-white/10 hover:border-[#DF4C73]/50 flex items-center justify-center text-white/30 hover:text-white/80 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-xs"
                      >
                        →
                      </button>
                    </div>
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
