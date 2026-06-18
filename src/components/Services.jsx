import { motion } from 'framer-motion';
import {
  Layers, Maximize2, Move, Monitor, Package, PenTool, Gem, Ruler
} from 'lucide-react';
import { SERVICES } from '../data/content';
import { SectionHeader, StaggerContainer, fadeUpVariant } from '../utils/animations';

// DoorOpen may not exist in older lucide — use custom SVG
const DoorOpenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
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
  Package,
  PenTool,
  Ruler,
  Monitor,
};

export default function Services() {
  return (
    <section id="services" className="py-32 bg-black-charcoal relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, #D4AF37 60px, #D4AF37 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, #D4AF37 60px, #D4AF37 61px)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeader
          label="What We Specialise In"
          title={<>Our Wardrobe <span className="italic text-gold">Services</span></>}
          subtitle="We design and build every wardrobe type — tailored precisely to your space, your style, and your storage habits."
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => {
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
                  />
                  <div className="absolute inset-0 bg-black-deep/85" />
                </div>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold transition-all duration-500 group-hover:w-full" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center border border-gold/30 mb-6 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                    <Icon size={20} className="text-gold" />
                  </div>

                  {/* Number */}
                  <div className="font-display text-4xl text-gold/10 group-hover:text-gold/20 font-bold absolute top-6 right-6 transition-all duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl text-white mb-3 font-medium group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-light text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-gold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span>Learn More</span>
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
            Not sure which wardrobe type suits your space? We'll help you decide — for free.
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
