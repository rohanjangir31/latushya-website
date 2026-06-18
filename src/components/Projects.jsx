import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageOff } from 'lucide-react';
import { PROJECTS } from '../data/content';
import { SectionHeader, AnimatedSection } from '../utils/animations';

const categories = [
  'All',
  'Sliding Wardrobes',
  'Walk-In Wardrobes',
  'Modular Wardrobes',
  'Luxury Wardrobes',
  'Hinged Wardrobes',
  'Custom Storage Solutions',
];

function PlaceholderCard({ project }) {
  return (
    <div
      className={`relative overflow-hidden border border-dashed border-gold/20 bg-black-card/50 flex flex-col items-center justify-center ${
        project.size === 'large' ? 'md:col-span-2' : ''
      }`}
      style={{ height: project.size === 'large' ? '380px' : '260px' }}
    >
      <ImageOff size={32} className="text-gold/20 mb-4" />
      <span className="section-label text-[10px] block mb-2">{project.category}</span>
      <p className="text-white/30 text-sm text-center px-6">
        Real project photos<br/>coming soon
      </p>
      <div className="mt-4 w-8 h-px bg-gold/20" />
    </div>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  if (project.isPlaceholder) return <PlaceholderCard project={project} />;

  return (
    <motion.div
      className={`relative group overflow-hidden cursor-pointer ${
        project.size === 'large' ? 'md:col-span-2' : ''
      }`}
      style={{ height: project.size === 'large' ? '380px' : '260px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={project.image}
        alt={`${project.wardrobeType} — ${project.location}`}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black-deep/80 via-black-deep/20 to-transparent" />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 bg-black-deep/50"
      />

      {/* Project info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="section-label text-[10px] block mb-2">{project.category}</span>
        <h3 className="font-display text-xl text-white font-medium">{project.title}</h3>

        {/* Hover details */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          className="mt-2 space-y-1"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-px bg-gold" />
            <span className="text-gray-subtle text-xs tracking-widest">{project.location}</span>
          </div>
          {project.wardrobeType && (
            <span className="text-gold/70 text-xs tracking-widest uppercase">{project.wardrobeType}</span>
          )}
          {project.materials && (
            <span className="text-gray-light/60 text-xs">{project.materials}</span>
          )}
          {project.duration && (
            <span className="text-gray-light/50 text-xs">Completed in {project.duration}</span>
          )}
        </motion.div>
      </div>

      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const allPlaceholder = PROJECTS.every(p => p.isPlaceholder);

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-32 bg-black-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader
          label="Our Portfolio"
          title={<>Wardrobe <span className="italic text-gold">Projects</span></>}
          subtitle="Browse our wardrobe work by type. Real project photos will be added as they're completed."
        />

        {/* Category filter */}
        <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs tracking-widest uppercase border transition-all duration-300 ${
                activeCategory === cat
                  ? 'border-gold bg-gold text-black-deep font-semibold'
                  : 'border-gray-luxury/30 text-gray-subtle hover:border-gold/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </AnimatedSection>

        {/* Portfolio grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={project.size === 'large' ? 'md:col-span-2' : ''}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Placeholder notice */}
        {allPlaceholder && (
          <AnimatedSection className="text-center mt-10">
            <div className="inline-block border border-gold/20 bg-black-card px-8 py-5">
              <p className="text-gray-subtle text-sm leading-relaxed">
                📸 We are currently photographing our completed projects.<br/>
                <span className="text-gold">Real project photos will be uploaded shortly.</span>
              </p>
            </div>
          </AnimatedSection>
        )}

        {/* CTA */}
        <AnimatedSection className="text-center mt-10">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-outline inline-block"
            id="portfolio-cta"
          >
            <span>Start Your Wardrobe Project</span>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
