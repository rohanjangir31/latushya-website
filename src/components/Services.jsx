import { motion } from 'framer-motion';
import { Layers, Maximize2, Move, Gem } from 'lucide-react';
import { SERVICES } from '../data/content';
import { SectionHeader, StaggerContainer, fadeUpVariant } from '../utils/animations';

// Custom door icon (DoorOpen not in all lucide versions)
const DoorOpenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M13 4h3a2 2 0 0 1 2 2v14"/>
    <path d="M2 20h3"/>
    <path d="M13 20h9"/>
    <path d="M10 12v.01"/>
    <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"/>
  </svg>
);

const iconMap = {
  Layers,
  Move,
  Maximize2,
  DoorOpen: DoorOpenIcon,
  Gem,
};

export default function Services() {
  // Split into featured (first) and remaining
  const [featured, ...rest] = SERVICES;

  return (
    <section id="services" className="py-32 bg-black-charcoal relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 80px, #D4AF37 80px, #D4AF37 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, #D4AF37 80px, #D4AF37 81px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeader
          label="Wardrobe Specialists"
          title={<>Five Ways We <span className="italic text-gold">Build Your Wardrobe</span></>}
          subtitle="We design and install every wardrobe type — each one measured, designed, and built specifically for your space."
        />

        {/* Featured card — full width hero */}
        {featured && (() => {
          const FeaturedIcon = iconMap[featured.icon] || Layers;
          return (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative mb-6 overflow-hidden border border-gray-luxury/20 hover:border-gold/40 transition-all duration-500 cursor-default"
            >
              {/* Background image */}
              <div className="absolute inset-0" aria-hidden="true">
                <img
                  src={featured.image}
                  alt=""
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black-deep/80 group-hover:bg-black-deep/70 transition-colors duration-500" />
              </div>

              {/* Top accent */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold transition-all duration-700 group-hover:w-full" />

              <div className="relative z-10 p-10 md:p-14 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center border border-gold/40 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                      <FeaturedIcon size={20} className="text-gold" />
                    </div>
                    <span className="section-label text-[10px]">Most Popular</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-white font-light mb-2 group-hover:text-gold transition-colors duration-300">
                    {featured.title}
                  </h3>
                  <p className="text-gold/70 text-sm italic mb-4">{featured.tagline}</p>
                </div>
                <div>
                  <p className="text-gray-subtle text-base leading-relaxed mb-6">
                    {featured.description}
                  </p>
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-3 text-gold text-xs tracking-widest uppercase border-b border-gold/40 pb-1 hover:border-gold transition-colors duration-300 group/link"
                  >
                    <span>Get a Quote</span>
                    <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* Remaining 4 cards — 2-col on tablet, 4-col on desktop */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((service, i) => {
            const Icon = iconMap[service.icon] || Layers;
            return (
              <motion.div
                key={service.id}
                variants={fadeUpVariant}
                className="group relative bg-black-card border border-gray-luxury/20 p-8 overflow-hidden cursor-default transition-all duration-500 hover:border-gold/40 hover:shadow-gold"
              >
                {/* Background image on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true">
                  <img
                    src={service.image}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black-deep/88" />
                </div>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold transition-all duration-500 group-hover:w-full" />

                <div className="relative z-10">
                  {/* Number — decorative */}
                  <div className="font-display text-5xl text-gold/8 group-hover:text-gold/18 font-bold absolute top-4 right-5 transition-all duration-300 select-none">
                    {String(i + 2).padStart(2, '0')}
                  </div>

                  {/* Icon */}
                  <div className="w-11 h-11 flex items-center justify-center border border-gold/30 mb-5 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                    <Icon size={18} className="text-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl text-white mb-1 font-medium group-hover:text-gold transition-colors duration-300 leading-snug">
                    {service.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-gold/60 text-xs italic mb-4">{service.tagline}</p>

                  {/* Description */}
                  <p className="text-gray-light text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-gold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span>Enquire</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-gray-subtle text-sm mb-6">
            Not sure which wardrobe type suits your space?{' '}
            <span className="text-white">We'll help you decide — for free.</span>
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-outline inline-block"
            id="services-cta"
          >
            <span>Book a Free Consultation</span>
          </a>
        </div>
      </div>
    </section>
  );
}
