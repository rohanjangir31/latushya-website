import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { MATERIALS } from '../data/content';
import { SectionHeader, StaggerContainer, fadeUpVariant, AnimatedSection } from '../utils/animations';

const categoryColor = { Hardware: 'text-gold', Substrate: 'text-white/60' };

export default function MaterialsSection() {
  return (
    <section id="materials" className="py-32 bg-black-deep relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gold/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeader
          label="Quality Assurance"
          title={<>Materials <span className="italic text-gold">We Trust</span></>}
          subtitle="We select only proven brands for hardware and substrate — because an interior space is only as good as the components that build it."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {MATERIALS.map((mat) => (
            <motion.div
              key={mat.id}
              variants={fadeUpVariant}
              className="group bg-black-charcoal border border-gray-luxury/20 p-8 hover:border-gold/30 hover:shadow-gold transition-all duration-500 relative overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold transition-all duration-700 group-hover:w-full" />

              {/* Category badge */}
              <div className="flex items-center justify-between mb-6">
                <span className={`text-[10px] tracking-widest uppercase font-medium ${categoryColor[mat.category] || 'text-gold'}`}>
                  {mat.category} · {mat.origin}
                </span>
                <Award size={16} className="text-gold/30 group-hover:text-gold/60 transition-colors duration-300" />
              </div>

              {/* Logo placeholder or name */}
              {mat.logo ? (
                <img src={mat.logo} alt={`${mat.name} logo`} className="h-10 mb-5 object-contain" />
              ) : (
                <div className="mb-5">
                  <h3 className="font-display text-3xl text-white font-light tracking-wide group-hover:text-gold transition-colors duration-300">
                    {mat.name}
                  </h3>
                </div>
              )}

              <p className="text-gray-light text-sm leading-relaxed mb-6">
                {mat.description}
              </p>

              {/* Qualities */}
              <ul className="space-y-2">
                {mat.qualities.map((q) => (
                  <li key={q} className="flex items-center gap-3 text-sm text-gray-subtle">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {q}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Trust statement */}
        <AnimatedSection>
          <div className="border border-gold/20 bg-black-charcoal/40 p-8 md:p-10 text-center relative">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <p className="font-display text-xl md:text-2xl text-white/80 font-light italic leading-relaxed max-w-3xl mx-auto">
              "We never cut corners on materials. The hardware that goes into your home is the same quality used by premium furniture brands worldwide."
            </p>
            <div className="mt-6 flex justify-center">
              <div className="gold-line" />
            </div>
            <p className="mt-4 text-gold text-xs tracking-widest uppercase">Latushya Quality Commitment</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
