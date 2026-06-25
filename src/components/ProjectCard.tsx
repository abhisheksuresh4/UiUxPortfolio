import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Project } from '../types/portfolio';
import { ProjectCarousel } from './ProjectCarousel';

export const ProjectCard = ({ project }: { project: Project }) => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  return (
    <>
      <motion.div
        onClick={() => setIsCarouselOpen(true)}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        data-cursor="project"
        className="relative flex-shrink-0 w-[340px] md:w-[400px] rounded-2xl overflow-hidden cursor-pointer select-none flex flex-col group bg-bg-surface border border-white/[0.06] hover:border-accent/20 transition-colors duration-300"
        style={{
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
      {/* Top shimmer line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-10" />

      {/* Featured glow border */}
      {project.highlight && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            boxShadow: '0 0 0 1px rgba(232,162,58,0.15), 0 0 24px 0 rgba(232,162,58,0.06)',
          }}
        />
      )}

      {/* Image */}
      {project.image ? (
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            draggable={false}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
          />
          {/* Gradient into card body */}
          <div
            className="absolute inset-x-0 bottom-0 h-16"
            style={{ background: 'linear-gradient(to top, #141416, transparent)' }}
          />
        </div>
      ) : (
        // Placeholder pattern when no image
        <div
          className="w-full aspect-video relative overflow-hidden"
          style={{ background: 'rgba(232,162,58,0.03)' }}
        >
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'linear-gradient(rgba(232,162,58,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(232,162,58,0.2) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Centre monogram */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-black text-white/[0.06] tracking-tighter select-none">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="relative z-10 p-6 flex flex-col gap-4 flex-1">

        {/* Title + badge */}
        <div className="flex flex-wrap items-start gap-2">
          <h3 className="text-lg font-bold text-text-primary leading-snug flex-1">{project.title}</h3>
          {project.highlight && (
            <span
              className="shrink-0 mt-0.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-accent/10 border border-accent/25 text-accent"
            >
              Featured
            </span>
          )}
        </div>

        {project.subtitle && (
          <p className="text-xs text-text-tertiary font-medium uppercase tracking-widest -mt-2">
            {project.subtitle}
          </p>
        )}

        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full text-[10px] font-medium text-text-tertiary bg-white/[0.03] border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="mt-2 self-start px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest bg-accent text-bg-deep hover:bg-accent/90 transition-colors duration-200 cursor-pointer"
          >
            View Work →
          </a>
        )}
      </div>
    </motion.div>
    
    {/* Project Carousel Modal */}
    <ProjectCarousel 
      project={project} 
      isOpen={isCarouselOpen} 
      onClose={() => setIsCarouselOpen(false)}
    />
    </>
  );
};