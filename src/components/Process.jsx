import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PROCESS_STEPS } from '../data/content';
import { SectionHeader } from '../utils/animations';

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" className="py-24 md:py-28 bg-black-deep relative overflow-hidden">
      {/* Subtle top/bottom rules */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeader
          label="How We Work"
          title={<>Our <span className="italic text-gold">Process</span></>}
          subtitle="A seamless six-step journey from first meeting to final handover — thoughtfully designed around you."
        />

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Centre vertical line — desktop only */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            className="absolute left-1/2 top-0 bottom-0 w-px
              bg-gradient-to-b from-gold/40 via-gold/15 to-transparent
              origin-top hidden lg:block"
          />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {PROCESS_STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 16 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{
                    duration: 0.75,
                    delay: i * 0.12 + 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`relative group ${
                    isLeft ? 'lg:pr-14' : 'lg:pl-14 lg:col-start-2'
                  }`}
                >
                  {/* Connector dot — desktop */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: i * 0.12 + 0.45 }}
                    className={`absolute top-5 hidden lg:flex items-center justify-center ${
                      isLeft ? '-right-3' : '-left-3'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-gold/60
                      bg-black-deep flex items-center justify-center
                      group-hover:border-gold transition-colors duration-300">
                      <div className="w-2 h-2 rounded-full bg-gold/60
                        group-hover:bg-gold group-hover:scale-110
                        transition-all duration-300" />
                    </div>
                  </motion.div>

                  {/* Card */}
                  <div className="bg-black-charcoal border border-gray-luxury/15
                    p-7 group-hover:border-gold/25
                    transition-all duration-400 overflow-hidden relative">

                    {/* Left accent border — replaces bottom growing line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5
                      bg-gold/0 group-hover:bg-gold/40
                      transition-all duration-400" />

                    {/* Step number + rule */}
                    <div className="flex items-center gap-4 mb-5">
                      <span className="font-display text-4xl text-gold/12
                        font-bold group-hover:text-gold/22
                        transition-colors duration-300 leading-none flex-shrink-0">
                        {step.step}
                      </span>
                      <div className="flex-1 h-px bg-gold/15 group-hover:bg-gold/30
                        transition-colors duration-300" />
                    </div>

                    <h3 className="font-display text-xl text-white mb-2.5
                      font-medium group-hover:text-gold/90
                      transition-colors duration-300 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-gray-light/75 text-sm leading-relaxed font-light">
                      {step.description}
                    </p>
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
