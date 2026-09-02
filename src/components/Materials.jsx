import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MATERIALS } from '../data/content';
import { Plus, Minus } from 'lucide-react';

const EASE = [0.25, 0.46, 0.45, 0.94];

function MaterialAccordionRow({ mat, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className={`group border-b border-white/8 transition-colors duration-500 ${isOpen ? 'border-pink/20' : 'hover:border-white/20'}`}
    >
      {/* Row Header - Always Visible */}
      <button
        className="w-full flex items-center justify-between py-6 lg:py-7 gap-6 cursor-pointer text-left"
        onClick={onToggle}
      >
        <div className="flex items-center gap-6 lg:gap-10 flex-1 min-w-0">
          {/* Index Number */}
          <span className={`text-[0.6rem] tracking-[0.3em] font-bold shrink-0 transition-colors duration-400 ${isOpen ? 'text-pink' : 'text-white/20'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Brand Name */}
          <span className={`font-display font-light text-2xl lg:text-3xl xl:text-4xl transition-colors duration-400 ${isOpen ? 'text-pink' : 'text-white group-hover:text-white/80'}`}>
            {mat.name}
          </span>

          {/* Origin Tag */}
          <span className="hidden md:block text-[0.6rem] tracking-[0.25em] uppercase text-white/30 font-medium shrink-0">
            {mat.origin}
          </span>
        </div>

        {/* Qualities Pills (visible when closed, on large screens) */}
        <div className={`hidden lg:flex items-center gap-2 flex-1 justify-end transition-opacity duration-400 ${isOpen ? 'opacity-0' : 'opacity-60'}`}>
          {mat.qualities.slice(0, 2).map((q, i) => (
            <span key={i} className="text-[0.55rem] tracking-[0.15em] uppercase text-white/40 border border-white/10 rounded-full px-3 py-1 shrink-0">
              {q}
            </span>
          ))}
        </div>

        {/* Toggle Icon */}
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-400 ${isOpen ? 'border-pink/40 bg-pink/10 text-pink' : 'border-white/15 text-white/40 group-hover:border-white/30'}`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-8 lg:pb-10 pl-12 lg:pl-24 pr-16 flex flex-col md:flex-row items-start gap-8 md:gap-16">
              <p className="font-sans text-[0.95rem] text-white/55 leading-relaxed flex-1 max-w-2xl">
                {mat.description}
              </p>
              <div className="flex flex-wrap gap-2 shrink-0">
                {mat.qualities.map((quality, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] bg-pink/5 border border-pink/20 text-pink/80 rounded-full"
                  >
                    {quality}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MaterialCategory({ title, subtitle, categoryNum, image, materials, imageOnRight }) {
  const [openId, setOpenId] = useState(materials[0]?.id ?? null);

  return (
    <div className={`flex flex-col ${imageOnRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 lg:gap-24 items-stretch`}>
      
      {/* Image Panel - Sticky */}
      <div className="w-full lg:w-[38%] shrink-0">
        <div className="lg:sticky lg:top-32 h-[55vw] lg:h-[70vh] rounded-2xl overflow-hidden border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.85)' }}
          />
          {/* Overlay with category info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 lg:p-8">
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 font-medium block mb-2">
              Category {categoryNum}
            </span>
            <h3 className="font-display font-light text-2xl lg:text-3xl text-white">{title}</h3>
            <p className="font-sans text-[0.85rem] text-white/50 mt-2 leading-relaxed max-w-xs">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Accordion Content */}
      <div className="flex-1 py-4 lg:py-8">
        {/* Top divider */}
        <div className="h-px bg-white/8 mb-0" />
        {materials.map((mat, i) => (
          <MaterialAccordionRow
            key={mat.id}
            mat={mat}
            index={i}
            isOpen={openId === mat.id}
            onToggle={() => setOpenId(openId === mat.id ? null : mat.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function MaterialsSection() {
  const hardware = MATERIALS.filter(m => m.category === 'Hardware');
  const substrate = MATERIALS.filter(m => m.category === 'Substrate');

  return (
    <section id="materials" className="py-24 lg:py-36 relative overflow-hidden bg-[#030407]">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">

        {/* SECTION HEADER */}
        <div className="mb-24 lg:mb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-10 h-px bg-pink/50" />
            <span className="text-pink/70 text-[0.6rem] tracking-[0.45em] uppercase font-bold">The Foundation</span>
            <div className="w-10 h-px bg-pink/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-light text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
          >
            Material <em className="italic text-pink">Integrity</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-[1rem] text-white/45 leading-relaxed max-w-xl font-light"
          >
            We partner exclusively with industry-leading manufacturers to ensure absolute precision, silence, and longevity in every piece we build.
          </motion.p>
        </div>

        {/* HARDWARE */}
        <div className="mb-24 lg:mb-36">
          <MaterialCategory
            title="Precision Engineering"
            subtitle="Austrian and German-engineered mechanisms for silent, flawless, lifetime operation."
            categoryNum="01"
            image="/projects/media__1784490387392.jpg"
            materials={hardware}
            imageOnRight={false}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-24 lg:mb-36" />

        {/* SUBSTRATE */}
        <MaterialCategory
          title="Structural Cores"
          subtitle="Marine-grade, high-density substrates that resist moisture, impact, and time."
          categoryNum="02"
          image="/projects/media__1784490387517.jpg"
          materials={substrate}
          imageOnRight={true}
        />

      </div>
    </section>
  );
}
