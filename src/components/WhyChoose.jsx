import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Ruler, Wrench, Layers, Star, Users, Clock } from 'lucide-react';

const PRINCIPLES = [
  {
    num: '01',
    Icon: Ruler,
    title: '100% Custom Designed',
    body: 'Every wardrobe is designed from scratch around your specific dimensions, storage needs, and aesthetic. No off-the-shelf templates, ever.',
  },
  {
    num: '02',
    Icon: Wrench,
    title: 'Häfele & Hettich Hardware',
    body: 'We install only trusted German hardware brands — Häfele and Hettich — known for soft-close mechanisms, silent operation, and lasting durability.',
  },
  {
    num: '03',
    Icon: Layers,
    title: 'Premium Material Standards',
    body: 'Century Ply and Greenply substrates, premium laminates, and quality finishes — selected for structural integrity and a beautiful long-lasting result.',
  },
  {
    num: '04',
    Icon: Star,
    title: 'Precision Installation',
    body: 'Our experienced carpentry team achieves millimetre-accurate installation. Every panel, runner, and fitting is checked before we hand over your wardrobe.',
  },
  {
    num: '05',
    Icon: Users,
    title: 'Personalised Consultation',
    body: 'Your project begins with an in-home session. We visit, listen carefully, measure precisely — and only then do we design your wardrobe.',
  },
  {
    num: '06',
    Icon: Clock,
    title: 'Clear Timelines',
    body: 'You receive a production and installation schedule before work begins. No surprises, no delays without explanation — just honest communication.',
  },
];

function FeatureCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative p-8 bg-black-charcoal border border-gray-luxury/15
        hover:border-gold/25 transition-all duration-500 overflow-hidden"
    >
      {/* Top gold accent line — grows on hover */}
      <div className="absolute top-0 left-0 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-600" />

      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon row */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-11 h-11 border border-gold/25 group-hover:border-gold/50
            group-hover:bg-gold/[0.07] flex items-center justify-center
            transition-all duration-400 flex-shrink-0">
            <item.Icon size={18} className="text-gold" strokeWidth={1.5} />
          </div>
          <span className="font-display text-3xl text-gold/[0.07] group-hover:text-gold/[0.14]
            font-bold select-none transition-all duration-400 leading-none">
            {item.num}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg text-white group-hover:text-gold/90
          transition-colors duration-300 font-medium mb-3 leading-snug">
          {item.title}
        </h3>

        {/* Divider */}
        <div className="w-8 h-px bg-gold/30 mb-4 group-hover:w-12 group-hover:bg-gold/50
          transition-all duration-400" />

        {/* Description */}
        <p className="text-gray-subtle text-sm leading-[1.8] font-light">
          {item.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyChoose() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why-choose" className="py-24 md:py-28 bg-black-deep relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full
        bg-gold/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">

        {/* Header */}
        <div ref={ref} className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-5"
          >
            <div className="w-5 h-px bg-gold" />
            <span className="text-gold text-[9px] tracking-[0.35em] uppercase font-medium">
              Our Promise
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display font-light text-white leading-[1.05]"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
            >
              Why Choose{' '}
              <span className="italic text-gold">Latushya</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-gray-subtle text-sm max-w-[260px] leading-relaxed lg:text-right font-light"
            >
              Six genuine reasons Bangalore homeowners trust us with their most personal space.
            </motion.p>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="mt-8 h-px bg-gradient-to-r from-gold/35 via-gold/8 to-transparent"
          />
        </div>

        {/* 3-col card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRINCIPLES.map((item, i) => (
            <FeatureCard key={item.num} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
