import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeader, AnimatedSection, StaggerContainer, fadeUpVariant, TextReveal } from '../utils/animations';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 lg:py-48 bg-black-deep overflow-hidden">
      {/* Absolute minimal background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left — Editorial Photography */}
          <div ref={ref} className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 overflow-hidden"
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src="/projects/media__1784490387524.jpg"
                alt="Latushya Studio Aesthetic"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            {/* Signature / Accent */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute -left-8 top-1/4 w-px h-64 bg-gradient-to-b from-transparent via-gold to-transparent hidden lg:block"
            />
          </div>

          {/* Right — The Manifesto */}
          <div className="lg:col-span-7 lg:pl-12">
            <AnimatedSection>
              <span className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-8">
                Studio Philosophy
              </span>
            </AnimatedSection>

            <div className="font-display text-4xl md:text-5xl lg:text-[64px] font-light text-white leading-[1.1] mb-12">
              <TextReveal text="We do not decorate." delay={0.1} />
              <br />
              <span className="italic text-gold">
                <TextReveal text="We construct living spaces." delay={0.3} />
              </span>
            </div>

            <AnimatedSection delay={0.3}>
              <div className="space-y-8 text-gray-subtle text-lg font-light leading-relaxed max-w-2xl">
                <p>
                  Latushya was founded on a singular belief: a home should be an architectural extension of the people who live within it. We reject the mass-produced and the templated. Every wardrobe, every kitchen, and every interior space we execute in Bangalore is a bespoke commission.
                </p>
                <p>
                  Our process begins with silence—listening to how you move through your home, understanding your storage habits, and studying the natural light of your space. Only then do we engineer solutions using world-class German hardware and marine-grade substrates.
                </p>
                <p>
                  We are not just designers; we are precision builders. From the first sketch to the final silent close of a cabinet door, our commitment is to absolute, uncompromising quality.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="mt-16 pt-12 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-display text-2xl text-white tracking-wide">The Founders</p>
                  <p className="text-gold text-[10px] tracking-widest uppercase mt-2">Latushya Interiors</p>
                </div>
                <div className="w-16 h-px bg-gold/50" />
              </div>
            </AnimatedSection>
          </div>
          
        </div>
      </div>
    </section>
  );
}
