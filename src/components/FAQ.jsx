import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';
import { SectionHeader, AnimatedSection } from '../utils/animations';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="faq" className="py-32 bg-black-charcoal relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-full opacity-30">
        <div className="absolute inset-0 bg-gradient-to-l from-gold/5 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeader
          label="FAQ"
          title={<>Common <span className="italic text-gold">Questions</span></>}
          subtitle="Everything you need to know about ordering a custom wardrobe from Latushya."
        />

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <AnimatedSection key={item.id} delay={i * 0.07}>
              <div
                className={`border transition-all duration-400 overflow-hidden ${
                  openId === item.id
                    ? 'border-gold/40 bg-black-card'
                    : 'border-gray-luxury/20 bg-black-card hover:border-gold/20'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-7 text-left group"
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  aria-expanded={openId === item.id}
                >
                  <div className="flex items-center gap-5">
                    <span className="font-display text-2xl text-gold/25 font-bold flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`font-medium text-base transition-colors duration-300 ${
                      openId === item.id ? 'text-gold' : 'text-white group-hover:text-white/90'
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  <div className={`flex-shrink-0 w-8 h-8 border flex items-center justify-center transition-all duration-300 ${
                    openId === item.id
                      ? 'border-gold bg-gold text-black-deep'
                      : 'border-gray-luxury/40 text-gray-subtle group-hover:border-gold/40 group-hover:text-gold'
                  }`}>
                    {openId === item.id ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div className="px-7 pb-7 pl-20 text-gray-light text-sm leading-relaxed border-t border-gold/10">
                        <div className="pt-5">{item.answer}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <p className="text-gray-subtle mb-6 text-sm">Have a question that's not answered here?</p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-gold inline-block"
            id="faq-cta"
          >
            <span>Ask Us Directly</span>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
