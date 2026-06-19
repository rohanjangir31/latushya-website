import { motion } from 'framer-motion';
import { Ruler, Wrench, Layers, Users, Star, Clock } from 'lucide-react';
import { SectionHeader } from '../utils/animations';

// Each point has its own distinct icon — not the same CheckCircle repeated 6 times
const PROMISES = [
  {
    id: 1,
    Icon: Ruler,
    title: '100% Custom Designed',
    description:
      'Every wardrobe is designed from scratch around your specific dimensions, storage needs, and aesthetic. We never use off-the-shelf templates.',
  },
  {
    id: 2,
    Icon: Wrench,
    title: 'Häfele & Hettich Hardware',
    description:
      'We install only trusted German hardware brands — Häfele and Hettich — known for soft-close mechanisms, durability, and silent operation.',
  },
  {
    id: 3,
    Icon: Layers,
    title: 'Premium Materials Only',
    description:
      'Century Ply and Greenply grade substrates, premium laminates, and quality finishes — selected for structural integrity and a beautiful result.',
  },
  {
    id: 4,
    Icon: Star,
    title: 'Precision Installation',
    description:
      'Our experienced carpentry team achieves millimetre-accurate installation. Every panel, rail, and fitting is checked before handover.',
  },
  {
    id: 5,
    Icon: Users,
    title: 'Personalised Consultation',
    description:
      'Your project begins with a detailed one-on-one session. We visit your home, listen carefully, measure precisely — then design.',
  },
  {
    id: 6,
    Icon: Clock,
    title: 'Clear Timelines',
    description:
      'We provide a clear production and installation schedule before work begins — so you always know exactly when your wardrobe will be ready.',
  },
];

export default function WhyChoose() {
  return (
    <section id="why-choose" className="py-32 bg-black-deep relative overflow-hidden">
      {/* Subtle background rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-gold/[0.04] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-gold/[0.025] pointer-events-none" />

      {/* Gold glow accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-gold/[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeader
          label="Our Promise"
          title={<>Why Choose <span className="italic text-gold">Latushya</span></>}
          subtitle="Six genuine reasons Bangalore homeowners trust us with their most personal space."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-luxury/10">
          {PROMISES.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative p-10 bg-black-deep hover:bg-black-charcoal transition-colors duration-500 overflow-hidden"
            >
              {/* Hover top line */}
              <div className="absolute top-0 left-0 h-0.5 w-0 bg-gold transition-all duration-700 group-hover:w-full" />

              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Icon + number row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 flex items-center justify-center border border-gold/30 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                    <item.Icon size={20} className="text-gold" />
                  </div>
                  <span className="font-display text-4xl text-gold/[0.08] group-hover:text-gold/[0.16] font-bold select-none transition-all duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-display text-xl text-white mb-3 font-medium group-hover:text-gold transition-colors duration-300 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
