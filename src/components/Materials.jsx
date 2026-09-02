import { motion } from 'framer-motion';
import { MATERIALS } from '../data/content';

const EASE = [0.25, 0.46, 0.45, 0.94];

const CATEGORY_LABELS = {
  Hardware: { num: '01', title: 'Precision Hardware', description: 'Every hinge, track, and handle is engineered for silent, flawless operation. We utilize Austrian and German-engineered mechanisms to guarantee a lifetime of effortless movement.' },
  Substrate: { num: '02', title: 'Structural Cores', description: 'The hidden layers dictate the lifespan of your interiors. We use marine-grade, high-density substrates that resist moisture, impact, and time.' },
};

function BrandCard({ mat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
      className="group relative flex flex-col border border-white/8 rounded-2xl p-8 lg:p-10
                 bg-white/[0.02] hover:bg-white/[0.05] hover:border-pink/30
                 transition-all duration-700 overflow-hidden cursor-default"
    >
      {/* Ambient glow on hover */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-pink/10 blur-3xl
                      opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      {/* Index */}
      <span className="text-[0.55rem] tracking-[0.4em] uppercase text-white/20 font-bold mb-8 block">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Brand name */}
      <h4 className="font-display font-light text-4xl lg:text-5xl text-white mb-2
                     group-hover:text-pink transition-colors duration-500 leading-none">
        {mat.name}
      </h4>

      {/* Origin */}
      <span className="text-[0.6rem] tracking-[0.3em] uppercase text-white/30 font-medium mb-6 block">
        {mat.origin}
      </span>

      {/* Divider */}
      <div className="w-8 h-px bg-gradient-to-r from-pink/50 to-transparent mb-6 group-hover:w-16 transition-all duration-700" />

      {/* Description */}
      <p className="font-sans text-[0.88rem] text-white/45 leading-relaxed flex-1 group-hover:text-white/65 transition-colors duration-500">
        {mat.description}
      </p>

      {/* Quality Tags */}
      {mat.qualities?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {mat.qualities.map((quality, i) => (
            <span
              key={i}
              className="px-3 py-1 text-[0.55rem] uppercase tracking-[0.2em]
                         border border-white/10 text-white/40 rounded-full
                         group-hover:border-pink/25 group-hover:text-white/70
                         transition-all duration-500"
            >
              {quality}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CategorySection({ category, materials }) {
  const meta = CATEGORY_LABELS[category];
  return (
    <div className="mb-28 lg:mb-36">
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-16 pb-8 border-b border-white/8"
      >
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-pink text-[0.6rem] tracking-[0.4em] uppercase font-bold">{meta.num}</span>
            <div className="w-8 h-px bg-pink/40" />
          </div>
          <h3 className="font-display font-light text-4xl lg:text-5xl xl:text-6xl text-white leading-tight">
            {meta.title}
          </h3>
        </div>
        <p className="font-sans text-[0.9rem] text-white/40 leading-relaxed max-w-md lg:text-right font-light">
          {meta.description}
        </p>
      </motion.div>

      {/* Brand Cards Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${materials.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-5`}>
        {materials.map((mat, i) => (
          <BrandCard key={mat.id} mat={mat} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function MaterialsSection() {
  const hardware = MATERIALS.filter(m => m.category === 'Hardware');
  const substrate = MATERIALS.filter(m => m.category === 'Substrate');

  return (
    <section id="materials" className="py-24 lg:py-36 relative overflow-hidden bg-[#03070E]">

      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]
                      bg-[radial-gradient(ellipse_at_top,_rgba(223,76,115,0.07),transparent_70%)]
                      pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="mb-24 lg:mb-32 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-pink/40" />
            <span className="text-pink/70 text-[0.6rem] tracking-[0.45em] uppercase font-bold">The Foundation</span>
            <div className="w-12 h-px bg-pink/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="font-display font-light text-5xl md:text-6xl lg:text-[5.5rem] text-white leading-[1.05] mb-6 tracking-[-0.02em]"
          >
            Material <em className="italic text-pink">Integrity</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="font-sans text-[1rem] lg:text-[1.05rem] text-white/40 leading-relaxed max-w-xl font-light"
          >
            An architectural space is only as timeless as the materials that construct it. We partner exclusively with industry-leading manufacturers.
          </motion.p>
        </div>

        {/* ── HARDWARE BRANDS ── */}
        <CategorySection category="Hardware" materials={hardware} />

        {/* ── SUBSTRATE BRANDS ── */}
        <CategorySection category="Substrate" materials={substrate} />

      </div>
    </section>
  );
}
