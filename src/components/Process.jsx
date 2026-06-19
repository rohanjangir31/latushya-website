import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PROCESS_STEPS } from '../data/content';
import { SectionHeader, AnimatedSection } from '../utils/animations';

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" className="py-32 bg-black-deep relative overflow-hidden">
      {/* Diagonal background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeader
          label="How We Work"
          title={<>Our <span className="italic text-gold">Process</span></>}
          subtitle="A seamless six-step journey from first meeting to final handover — thoughtfully designed around you."
        />

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent origin-top hidden lg:block"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {PROCESS_STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.15 + 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`relative group ${
                    isLeft ? 'lg:pr-16' : 'lg:pl-16 lg:col-start-2'
                  }`}
                >
                  {/* Connector dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.15 + 0.5 }}
                    className={`absolute top-6 hidden lg:flex items-center justify-center ${
                      isLeft ? '-right-3' : '-left-3'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-gold bg-black-deep flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gold group-hover:scale-150 transition-transform duration-300" />
                    </div>
                  </motion.div>

                  {/* Card */}
                  <div className="bg-black-charcoal border border-gray-luxury/20 p-8 group-hover:border-gold/30 transition-all duration-500 group-hover:shadow-gold">
                    {/* Step number */}
                    <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                      <span className="font-display text-5xl text-gold/15 font-bold group-hover:text-gold/25 transition-colors duration-300">
                        {step.step}
                      </span>
                      <div className={`flex-1 h-px bg-gold/20 group-hover:bg-gold/40 transition-colors duration-300`} />
                    </div>

                    <h3 className="font-display text-2xl text-white mb-3 font-medium group-hover:text-gold transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-light text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Bottom accent */}
                    <div className="mt-6 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-700" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
