import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../data/content';
import { Link, useLocation } from 'react-router-dom';

const EASE = [0.16, 1, 0.3, 1];

export default function Services() {
  const location = useLocation();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (location.hash) {
      const hashId = location.hash.replace('#', '');
      const idx = SERVICES.findIndex((s) => s.id === hashId);
      if (idx !== -1) {
        setActive(idx);
        const el = document.getElementById('services');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [location.hash]);

  const service = SERVICES[active];

  return (
    <section id="services" className="bg-[#03070E] pt-16 pb-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-5"
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

        {/* ── Mobile: Accordion-style stacked cards ── */}
        <div className="lg:hidden flex flex-col gap-4">
          {SERVICES.map((s, i) => {
            const isOpen = active === i;
            return (
              <motion.div
                key={s.id}
                layout
                onClick={() => setActive(i)}
                className="relative rounded-2xl overflow-hidden cursor-pointer border border-white/[0.07]"
                style={{ minHeight: isOpen ? 0 : 'auto' }}
              >
                {/* Background image always present, fades more when closed */}
                <div className="absolute inset-0">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      background: isOpen
                        ? 'linear-gradient(to top, rgba(3,7,14,0.97) 0%, rgba(3,7,14,0.7) 50%, rgba(3,7,14,0.3) 100%)'
                        : 'linear-gradient(to top, rgba(3,7,14,0.92) 0%, rgba(3,7,14,0.82) 100%)',
                    }}
                  />
                </div>

                {/* Tab header row */}
                <div className="relative z-10 flex items-center justify-between p-5">
                  <div className="flex items-center gap-3">
                    <span className={`font-display italic text-lg transition-colors duration-300 ${isOpen ? 'text-[#DF4C73]' : 'text-white/30'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`font-sans font-medium text-sm transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/50'}`}>
                      {s.title}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`w-5 h-5 flex items-center justify-center rounded-full border transition-colors duration-300 ${isOpen ? 'border-[#DF4C73]/50 text-[#DF4C73]' : 'border-white/20 text-white/30'}`}
                  >
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </motion.div>
                </div>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="relative z-10 overflow-hidden"
                    >
                      {/* Image strip */}
                      <div className="mx-5 rounded-xl overflow-hidden h-48 mb-5">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Tagline */}
                      <div className="px-5 mb-4 flex items-center gap-2">
                        <div className="w-5 h-[1px] bg-[#DF4C73]/50" />
                        <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase">{s.tagline}</span>
                      </div>

                      {/* Bullets */}
                      <ul className="px-5 flex flex-col gap-3 mb-6">
                        {s.bullets.map((b, bi) => (
                          <motion.li
                            key={bi}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: bi * 0.07, duration: 0.35, ease: EASE }}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-[8px] w-[5px] h-[5px] rounded-full bg-[#DF4C73] flex-shrink-0 shadow-[0_0_8px_rgba(223,76,115,0.6)]" />
                            <span className="text-white/85 text-[15px] font-normal leading-snug">{b}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="px-5 pb-5">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 text-[#DF4C73] text-[10px] tracking-[0.3em] uppercase font-semibold border-b border-[#DF4C73]/40 pb-1 hover:border-[#DF4C73] transition-all duration-300"
                        >
                          Inquire Now →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── Desktop: Full-bleed cinematic panel ── */}
        <div className="hidden lg:block">
          {/* Service selector strip — numbered list along top */}
          <div className="flex items-stretch gap-0 mb-8 border border-white/[0.06] rounded-2xl overflow-hidden">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="relative flex-1 flex flex-col items-start px-6 py-5 text-left overflow-hidden group transition-all duration-500"
              >
                {/* Active fill */}
                {active === i && (
                  <motion.div
                    layoutId="tab-fill"
                    className="absolute inset-0 bg-white/[0.05]"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}

                {/* Bottom active bar */}
                {active === i && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DF4C73] to-[#5AB9EA]"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}

                {/* Vertical separator */}
                {i < SERVICES.length - 1 && (
                  <div className="absolute right-0 top-4 bottom-4 w-[1px] bg-white/[0.07]" />
                )}

                <div className="relative z-10 flex flex-col gap-2 w-full">
                  <span
                    className={`font-display italic text-3xl xl:text-4xl leading-none transition-all duration-300 ${
                      active === i
                        ? 'text-[#DF4C73]'
                        : 'text-white/50 group-hover:text-white/70'
                    }`}
                    style={active === i ? {
                      textShadow: '0 0 24px rgba(223,76,115,0.55), 0 0 60px rgba(223,76,115,0.18)',
                    } : {}}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-sans font-medium text-[12px] xl:text-[13px] leading-snug transition-colors duration-300 ${
                      active === i ? 'text-white' : 'text-white/55 group-hover:text-white/80'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Main cinematic panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative rounded-3xl overflow-hidden"
              style={{ height: '520px' }}
            >
              {/* Full-bleed background image */}
              <motion.img
                key={`img-${active}`}
                initial={{ scale: 1.06, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Gradient overlays — left for text legibility, right lighter */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#03070E]/95 via-[#03070E]/60 to-[#03070E]/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03070E]/70 via-transparent to-transparent" />

              {/* Content — sits on the left side */}
              <div className="absolute inset-0 flex flex-col justify-between p-10 xl:p-14">
                {/* Top — tagline */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#DF4C73]/60" />
                  <span className="text-white/40 text-[9px] tracking-[0.4em] uppercase">{service.tagline}</span>
                </div>

                {/* Middle — main info block, max half-width so photo shows on right */}
                <div className="max-w-[480px]">
                  {/* Counter — editorial, glowing */}
                  <div className="relative mb-5">
                    {/* Ghost outline number behind — purely decorative depth */}
                    <span
                      className="absolute -top-2 -left-1 font-display italic leading-none select-none pointer-events-none"
                      style={{
                        fontSize: 'clamp(5rem, 10vw, 10rem)',
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(223,76,115,0.10)',
                        lineHeight: 1,
                      }}
                      aria-hidden="true"
                    >
                      {String(active + 1).padStart(2, '0')}
                    </span>

                    {/* Foreground number */}
                    <div className="relative flex items-baseline gap-3">
                      <span
                        className="font-display italic leading-none text-[#DF4C73]"
                        style={{
                          fontSize: 'clamp(3.5rem, 6vw, 7rem)',
                          lineHeight: 1,
                          textShadow: '0 0 30px rgba(223,76,115,0.60), 0 0 80px rgba(223,76,115,0.20)',
                        }}
                      >
                        {String(active + 1).padStart(2, '0')}
                      </span>
                      <div className="flex flex-col gap-[3px] pb-1">
                        <div className="w-5 h-[1px] bg-[#DF4C73]/40" />
                        <span className="text-white/30 text-[10px] font-sans tracking-widest">
                          {String(SERVICES.length).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display font-light text-white leading-tight mb-4"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
                  >
                    {service.title}
                  </h3>

                  {/* Pink rule */}
                  <div className="w-12 h-[2px] bg-gradient-to-r from-[#DF4C73] to-[#5AB9EA] mb-6 rounded-full" />

                  {/* Bullets — 2-column grid */}
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {service.bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4, ease: EASE }}
                        className="flex items-start gap-2 group/b"
                      >
                        <span className="mt-[8px] w-[5px] h-[5px] rounded-full bg-[#DF4C73] flex-shrink-0 shadow-[0_0_8px_rgba(223,76,115,0.6)] group-hover/b:scale-125 transition-transform duration-300" />
                        <span className="text-white/80 text-[15px] font-normal leading-snug group-hover/b:text-white transition-colors duration-200">
                          {bullet}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Bottom — CTA + nav arrows */}
                <div className="flex items-center justify-between">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 group/cta"
                  >
                    <span className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#DF4C73]/40 group-hover/cta:border-[#DF4C73] group-hover/cta:bg-[#DF4C73]/10 transition-all duration-300">
                      <span className="text-[#DF4C73] text-xs">→</span>
                    </span>
                    <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#DF4C73]/70 group-hover/cta:text-[#DF4C73] transition-colors duration-300 border-b border-[#DF4C73]/30 group-hover/cta:border-[#DF4C73] pb-px">
                      Inquire Now
                    </span>
                  </Link>

                  {/* Prev / Next */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActive(i => Math.max(0, i - 1))}
                      disabled={active === 0}
                      className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white/30 hover:text-white/80 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-sm backdrop-blur-sm bg-black/20"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setActive(i => Math.min(SERVICES.length - 1, i + 1))}
                      disabled={active === SERVICES.length - 1}
                      className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white/30 hover:text-white/80 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 text-sm backdrop-blur-sm bg-black/20"
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
    </section>
  );
}
