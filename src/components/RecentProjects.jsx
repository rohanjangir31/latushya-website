import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Wrench, ImageOff } from 'lucide-react';
import { RECENT_PROJECTS } from '../data/content';
import { SectionHeader, StaggerContainer, fadeUpVariant } from '../utils/animations';

function RecentProjectCard({ project }) {
  if (project.isPlaceholder) {
    return (
      <div className="group border border-dashed border-gold/20 bg-black-card/30 overflow-hidden">
        <div className="h-52 bg-black-soft/50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center px-6">
            <ImageOff size={28} className="text-gold/20" />
            <span className="text-gray-light/30 text-sm">Project photo coming soon</span>
          </div>
        </div>
        <div className="p-6">
          <span className="section-label text-[9px] block mb-2">Recent Project</span>
          <h3 className="font-display text-lg text-white/40 mb-4">Real project details coming soon</h3>
          <div className="space-y-2 opacity-40">
            {['Location', 'Project Type', 'Duration', 'Materials'].map((label) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-14 h-px bg-gray-luxury/30" />
                <span className="text-gray-light/30 text-xs">{label}: —</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeUpVariant}
      className="group border border-gray-luxury/20 bg-black-card overflow-hidden hover:border-gold/30 hover:shadow-gold transition-all duration-500"
    >
      {/* Project image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={`${project.projectType} — ${project.location}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black-deep/60 to-transparent" />
        <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold transition-all duration-700 group-hover:w-full" />

        {/* Wardrobe type badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-gold/90 text-black-deep text-[10px] tracking-widest uppercase font-bold px-3 py-1">
            {project.projectType}
          </span>
        </div>
      </div>

      {/* Project details */}
      <div className="p-6">
        <h3 className="font-display text-xl text-white mb-4 font-medium group-hover:text-gold transition-colors duration-300">
          {project.name}
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-light">
            <MapPin size={13} className="text-gold flex-shrink-0" />
            {project.location}
          </div>
          {project.duration && (
            <div className="flex items-center gap-3 text-sm text-gray-light">
              <Clock size={13} className="text-gold flex-shrink-0" />
              Completed in {project.duration}
            </div>
          )}
          {project.materials && (
            <div className="flex items-center gap-3 text-sm text-gray-light">
              <Wrench size={13} className="text-gold flex-shrink-0" />
              {project.materials}
            </div>
          )}
        </div>

        {project.description && (
          <p className="mt-4 text-gray-light/60 text-sm leading-relaxed border-t border-gold/10 pt-4">
            {project.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function RecentProjects() {
  const allPlaceholder = RECENT_PROJECTS.every(p => p.isPlaceholder);

  return (
    <section id="recent-projects" className="py-32 bg-black-deep relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader
          label="Latest Work"
          title={<>Recent <span className="italic text-gold">Projects</span></>}
          subtitle={
            allPlaceholder
              ? "Real project details — name, location, materials, and timeline — will appear here as projects are completed."
              : "Our most recently completed interior installations across Bangalore."
          }
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECENT_PROJECTS.map((project) => (
            <RecentProjectCard key={project.id} project={project} />
          ))}
        </StaggerContainer>

        {allPlaceholder && (
          <div className="text-center mt-10">
            <div className="inline-block border border-gold/20 bg-black-charcoal px-8 py-5">
              <p className="text-gray-subtle text-sm leading-relaxed">
                📋 Project records are being set up. Each entry will include the project name, location, project type, materials used, and timeline.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
