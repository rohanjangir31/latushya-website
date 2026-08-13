import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';
import { SectionHeader, AnimatedSection } from '../utils/animations';

// Placeholder card shown when no real testimonials are loaded yet
function TestimonialPlaceholder() {
  return (
    <AnimatedSection>
      <div className="relative border border-pink/20 bg-black-card p-12 md:p-16 flex flex-col items-center text-center">
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-pink/30 to-transparent" />

        <div className="w-16 h-16 border border-pink/30 rounded-full flex items-center justify-center mb-6">
          <MessageSquare size={28} className="text-pink/50" />
        </div>

        <h3 className="font-display text-2xl text-white/70 mb-4 font-light">
          Customer Reviews Coming Soon
        </h3>
        <p className="text-gray-light/60 text-sm leading-relaxed max-w-md">
          We're collecting authentic reviews from our clients. Once published, real customer stories will appear here. We don't believe in fabricated testimonials.
        </p>

        <div className="mt-8 w-12 h-[2px] bg-gradient-to-r from-pink to-blue opacity-80" />

        <p className="mt-6 text-pink/60 text-xs tracking-widest uppercase">
          Be our first reviewer
        </p>

        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="mt-4 btn-outline inline-block text-sm"
        >
          <span>Book Your Consultation</span>
        </a>

        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-pink/20 to-transparent" />
      </div>
    </AnimatedSection>
  );
}

// Real testimonial card
function TestimonialCard({ testimonial }) {
  const parts = testimonial.text.split('\\n\\n');
  const mainQuote = parts[0];
  const secondaryQuote = parts.slice(1).join(' ');

  return (
    <div className="relative group overflow-hidden bg-black/40 backdrop-blur-sm border border-white/5 p-8 md:p-12 rounded-3xl hover:border-pink/20 transition-colors duration-700 w-full max-w-5xl mx-auto">
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink/5 to-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Decorative large quote */}
      <div className="absolute -top-4 -right-4 font-display text-[100px] md:text-[180px] text-white/[0.02] font-bold leading-none select-none pointer-events-none transform -rotate-6 group-hover:rotate-0 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
        &ldquo;
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
        {/* Left column: Quote */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-6">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} size={14} className="text-pink fill-pink/80 drop-shadow-[0_0_8px_rgba(223,76,115,0.4)]" />
            ))}
          </div>

          <blockquote className="font-display text-xl md:text-2xl text-white/90 font-light leading-[1.6] tracking-wide mb-6 relative">
            "{mainQuote}"
            {secondaryQuote && (
              <span className="block mt-4 text-sm md:text-base text-white/60 font-sans italic leading-[1.8] font-light">
                {secondaryQuote}
              </span>
            )}
          </blockquote>
        </div>

        {/* Right column: Author info */}
        <div className="w-full md:w-56 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10 flex flex-col items-start">
          <div className="relative mb-5">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink to-blue blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 rounded-full" />
            {testimonial.avatar && testimonial.avatar.length > 1 ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="relative w-16 h-16 rounded-full object-cover border border-pink/30 z-10"
              />
            ) : (
              <div className="relative w-16 h-16 rounded-full bg-black border border-pink/30 flex items-center justify-center z-10">
                <span className="font-display text-transparent bg-clip-text bg-gradient-to-tr from-pink to-blue text-2xl font-light">
                  {testimonial.avatar || testimonial.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="font-sans text-white/90 text-base tracking-wide mb-1 font-medium">{testimonial.name}</div>
          <div className="text-white/40 text-[0.6rem] tracking-[0.2em] uppercase mb-4">{testimonial.date}</div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink/20 bg-pink/5">
            <span className="text-pink text-[0.55rem] tracking-[0.15em] uppercase font-medium">{testimonial.project}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const hasTestimonials = TESTIMONIALS && TESTIMONIALS.length > 0;

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };
  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <section id="testimonials" className="py-32 bg-black-charcoal relative overflow-hidden">
      {/* Decorative quote mark — capped on mobile */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-display text-[120px] md:text-[200px] text-pink/[0.04] font-bold leading-none select-none pointer-events-none overflow-hidden" aria-hidden="true">
        &ldquo;
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeader
          label="Client Stories"
          title={<>What Our <span className="italic text-pink">Clients Say</span></>}
          subtitle={hasTestimonials ? "Authentic reviews from real Latushya customers." : undefined}
        />

        {!hasTestimonials ? (
          <TestimonialPlaceholder />
        ) : (
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <TestimonialCard testimonial={TESTIMONIALS[current]} />
              </motion.div>
            </AnimatePresence>

            {TESTIMONIALS.length > 1 && (
              <div className="flex items-center justify-between mt-8">
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                      aria-label={`Go to review ${i + 1}`}
                      className={`transition-all duration-300 ${i === current ? 'w-8 h-1 bg-gradient-to-r from-pink to-blue' : 'w-2 h-1 bg-gray-luxury hover:bg-gray-mid'}`}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={prev} aria-label="Previous review" className="w-12 h-12 border border-gray-luxury/30 hover:border-pink/50 flex items-center justify-center text-gray-subtle hover:text-pink transition-all duration-300 group">
                    <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button onClick={next} aria-label="Next review" className="w-12 h-12 border border-gray-luxury/30 hover:border-pink/50 flex items-center justify-center text-gray-subtle hover:text-pink transition-all duration-300 group">
                    <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
