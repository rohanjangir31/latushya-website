import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ── PLACEHOLDER CREDIBILITY METRICS ───────────────────────────
// DO NOT replace these dashes with invented numbers.
// When real data is available, replace '—' with the actual value.
const METRICS = [
  {
    value: '—',
    label: 'Projects Completed',
    sub: 'Bangalore & surroundings',
  },
  {
    value: '—',
    label: 'Years Experience',
    sub: 'In custom wardrobes',
  },
  {
    value: '—',
    label: 'Custom Designs',
    sub: 'Built to specification',
  },
  {
    value: '—',
    label: 'Client Satisfaction',
    sub: 'Our standard, always',
  },
];

export default function TrustBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-16 md:py-20 bg-black-charcoal relative overflow-hidden">
      {/* Top and bottom ruled lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-gray-luxury/15">
          {METRICS.map(({ value, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center text-center px-6 py-4 group"
            >
              {/* Placeholder value */}
              <span
                className="font-display font-light text-gold leading-none mb-3
                  group-hover:scale-105 transition-transform duration-300"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
              >
                {value}
              </span>

              {/* Label */}
              <span className="text-white text-xs tracking-[0.18em] uppercase font-medium mb-1.5">
                {label}
              </span>

              {/* Sub */}
              <span className="text-gray-subtle text-[10px] tracking-wide leading-relaxed">
                {sub}
              </span>

              {/* Animated gold underline */}
              <div className="mt-4 h-px w-4 bg-gold/30 group-hover:w-8 group-hover:bg-gold/60
                transition-all duration-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
