import { CheckCircle } from 'lucide-react';
import { WHY_CHOOSE } from '../data/content';
import { SectionHeader, StaggerContainer, fadeUpVariant } from '../utils/animations';
import { motion } from 'framer-motion';

export default function WhyChoose() {
  return (
    <section id="why-choose" className="py-32 bg-black-deep relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-gold/3 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeader
          label="Our Promise"
          title={<>Why Choose <span className="italic text-gold">Latushya</span></>}
          subtitle="Six genuine reasons our clients trust us with their most personal space — their wardrobe."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE.map((item, i) => (
            <motion.div
              key={item.id}
              variants={fadeUpVariant}
              className="group relative p-8 border border-gray-luxury/20 bg-black-charcoal/40 hover:bg-black-charcoal hover:border-gold/30 transition-all duration-500 overflow-hidden"
            >
              {/* Top gold line on hover */}
              <div className="absolute top-0 left-0 h-0.5 w-0 bg-gold transition-all duration-700 group-hover:w-full" />
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/40 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300 flex-shrink-0 mt-0.5">
                    <CheckCircle size={18} className="text-gold" />
                  </div>
                  <div className="font-display text-5xl text-gold/8 group-hover:text-gold/15 font-bold absolute top-4 right-6 transition-all duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                <h3 className="font-display text-xl text-white mb-3 font-medium group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
