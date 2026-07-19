import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeader, AnimatedSection, StaggerContainer, fadeUpVariant, TextReveal } from '../utils/animations';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 bg-black-deep overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Image Stack */}
          <div ref={ref} className="relative">
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 rounded-sm overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=85"
                alt="Luxury home interior design by Latushya Bangalore"
                className="w-full h-[500px] lg:h-[600px] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-deep/40 to-transparent" />
            </motion.div>

            {/* Floating second image */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 40 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -bottom-12 -right-8 w-56 h-72 z-20 hidden md:block"
            >
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
                alt="Bespoke interior finishing detail"
                className="w-full h-full object-cover rounded-sm"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 border border-gold/20 rounded-sm" />
            </motion.div>

            {/* Gold accent box */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -left-6 top-12 w-12 h-80 bg-gold/20 border-l-2 border-gold/40 hidden lg:block"
            />

            {/* Specialist badge — no fake numbers */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute -top-6 -right-4 md:right-auto md:-left-8 glass rounded-sm p-5 z-30 flex flex-col items-center"
            >
              <span className="font-display text-lg text-gold font-medium text-center leading-tight">Interior<br/>Specialists</span>
              <span className="text-white/70 text-[10px] tracking-widest uppercase text-center mt-2">Bangalore</span>
            </motion.div>
          </div>

          {/* Right — Content */}
          <div className="lg:pl-8">
            <AnimatedSection>
              <span className="section-label block mb-4">About Latushya</span>
            </AnimatedSection>

            <div className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8">
              <TextReveal text="Spaces Built" delay={0.1} />
              <br />
              <span className="italic text-gold">
                <TextReveal text="Around You" delay={0.3} />
              </span>
            </div>

            <AnimatedSection delay={0.2}>
              <p className="text-gray-subtle leading-relaxed mb-6 text-base md:text-lg">
                Latushya is a premium Bangalore-based interior design and execution studio. We specialize in complete home interiors — from turnkey solutions and modular kitchens to bespoke furniture — designed and built specifically for your lifestyle and aesthetics.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-gray-subtle leading-relaxed mb-10 text-base">
                Every space we create starts with careful listening. We visit your home, measure precisely, understand how you live, and only then design an interior that flows naturally — creating a space that feels distinctly yours.
              </p>
            </AnimatedSection>

            {/* Real, honest value pillars */}
            <StaggerContainer className="grid grid-cols-2 gap-6 mb-10">
              {[
                { icon: '✦', text: '100% Custom Designed' },
                { icon: '✦', text: 'Häfele & Hettich Hardware' },
                { icon: '✦', text: 'Pan-Bangalore Service' },
                { icon: '✦', text: 'Free First Consultation' },
              ].map((item) => (
                <motion.div
                  key={item.text}
                  variants={fadeUpVariant}
                  className="border-l border-gold/30 pl-4"
                >
                  <div className="text-gold text-xs mb-1">{item.icon}</div>
                  <div className="text-white/80 text-sm leading-snug">{item.text}</div>
                </motion.div>
              ))}
            </StaggerContainer>

            <AnimatedSection delay={0.5}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-gold inline-block"
                id="about-cta"
              >
                <span>Get a Free Quote</span>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
