import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Wrench, MapPin, Clock } from 'lucide-react';

// Credibility band — real, honest value signals.
// No fabricated project counts, client numbers, or ratings.
const CREDIBILITY_ITEMS = [
  {
    Icon: Shield,
    value: '100%',
    label: 'Custom Designed',
    sub: 'No templates, ever',
  },
  {
    Icon: Wrench,
    value: 'Häfele · Hettich',
    label: 'Hardware Brands',
    sub: 'German engineering',
  },
  {
    Icon: MapPin,
    value: 'Pan Bangalore',
    label: 'Service Area',
    sub: 'All neighbourhoods',
  },
  {
    Icon: Clock,
    value: 'Free',
    label: 'First Consultation',
    sub: 'No obligations',
  },
];

export default function CredibilityBand() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=70"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black-deep/92" />
      </div>

      {/* Gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y-2 lg:divide-y-0 divide-gold/10">
          {CREDIBILITY_ITEMS.map(({ Icon, value, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center group px-6 py-4 relative"
            >
              {/* Vertical divider */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gold/15 hidden lg:block" />

              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-4 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                <Icon size={18} className="text-gold" />
              </div>

              <div className="font-display text-2xl md:text-3xl text-white font-light mb-1">
                {value}
              </div>
              <div className="text-gold text-[10px] tracking-widest uppercase font-medium mb-1">
                {label}
              </div>
              <div className="text-gray-light/50 text-[10px] tracking-wide">
                {sub}
              </div>

              <div className="mt-3 w-6 h-px bg-gold/30 group-hover:w-12 group-hover:bg-gold transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
