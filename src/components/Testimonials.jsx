import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';
import { SectionHeader, AnimatedSection } from '../utils/animations';

// Placeholder card shown when no real testimonials are loaded yet
function TestimonialPlaceholder() {
  return (
    <AnimatedSection>
      <div className="relative border border-gold/20 bg-black-card p-12 md:p-16 flex flex-col items-center text-center">
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center mb-6">
          <MessageSquare size={28} className="text-gold/50" />
        </div>

        <h3 className="font-display text-2xl text-white/70 mb-4 font-light">
          Customer Reviews Coming Soon
        </h3>
        <p className="text-gray-light/60 text-sm leading-relaxed max-w-md">
          We're collecting authentic reviews from our clients. Once published, real customer stories will appear here. We don't believe in fabricated testimonials.
        </p>

        <div className="mt-8 w-12 h-px bg-gold/30" />

        <p className="mt-6 text-gold/60 text-xs tracking-widest uppercase">
          Be our first reviewer
        </p>

        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="mt-4 btn-outline inline-block text-sm"
        >
          <span>Book Your Wardrobe</span>
        </a>

        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>
    </AnimatedSection>
  );
}

// Real testimonial card
function TestimonialCard({ testimonial }) {
  return (
    <div className="relative bg-black-card border border-gray-luxury/20 p-10 md:p-14">
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="flex items-center gap-1 mb-6">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-gold fill-gold" />
        ))}
      </div>

      <blockquote className="font-display text-xl md:text-2xl text-white/90 font-light leading-relaxed italic mb-8">
        "{testimonial.text}"
      </blockquote>

      <div className="flex items-center gap-5">
        <div className="relative">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-gold/30"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-luxury/40 border-2 border-gold/30 flex items-center justify-center">
              <span className="font-display text-gold text-xl font-medium">
                {testimonial.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute -inset-1 rounded-full border border-gold/20" />
        </div>
        <div>
          <div className="font-medium text-white text-base">{testimonial.name}</div>
          <div className="text-gray-light text-xs tracking-widest mt-0.5">{testimonial.location}</div>
          <div className="text-gold text-xs tracking-widest mt-1 uppercase">{testimonial.project}</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
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
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-display text-[120px] md:text-[200px] text-gold/[0.04] font-bold leading-none select-none pointer-events-none overflow-hidden" aria-hidden="true">
        &ldquo;
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeader
          label="Client Stories"
          title={<>What Our <span className="italic text-gold">Clients Say</span></>}
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
                      className={`transition-all duration-300 ${i === current ? 'w-8 h-1 bg-gold' : 'w-2 h-1 bg-gray-luxury hover:bg-gray-mid'}`}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={prev} aria-label="Previous review" className="w-12 h-12 border border-gray-luxury/30 hover:border-gold/50 flex items-center justify-center text-gray-subtle hover:text-gold transition-all duration-300 group">
                    <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button onClick={next} aria-label="Next review" className="w-12 h-12 border border-gray-luxury/30 hover:border-gold/50 flex items-center justify-center text-gray-subtle hover:text-gold transition-all duration-300 group">
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
