import { motion } from 'framer-motion';
import type { Project } from '../types/portfolio';

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative flex-shrink-0 w-[340px] md:w-[400px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none flex flex-col"
      style={{
        // Warmer, more saturated glass — picks up the indigo section bg
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(139,92,246,0.06) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 2px 0 0 rgba(255,255,255,0.07) inset, 0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* Top shimmer line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-10" />

      {/* Featured glow border */}
      {project.highlight && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            boxShadow: '0 0 0 1px rgba(167,139,250,0.25), 0 0 24px 0 rgba(139,92,246,0.12)',
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
            className="w-full h-full object-cover"
            style={{ opacity: 0.75 }}
          />
          {/* Gradient into card body */}
          <div
            className="absolute inset-x-0 bottom-0 h-16"
            style={{ background: 'linear-gradient(to top, rgba(12,9,32,0.9), transparent)' }}
          />
        </div>
      ) : (
        // Placeholder pattern when no image
        <div
          className="w-full aspect-video relative overflow-hidden"
          style={{ background: 'rgba(139,92,246,0.06)' }}
        >
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.3) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Centre monogram */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-black text-white/10 tracking-tighter select-none">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="relative z-10 p-6 flex flex-col gap-4 flex-1">

        {/* Title + badge */}
        <div className="flex flex-wrap items-start gap-2">
          <h3 className="text-lg font-bold text-white leading-snug flex-1">{project.title}</h3>
          {project.highlight && (
            <span
              className="shrink-0 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
              style={{
                background: 'linear-gradient(135deg, rgba(192,132,252,0.18), rgba(249,115,22,0.18))',
                border: '1px solid rgba(249,115,22,0.35)',
                color: '#fb923c',
              }}
            >
              Featured
            </span>
          )}
        </div>

        {project.subtitle && (
          <p className="text-xs text-white/40 font-medium uppercase tracking-widest -mt-2">
            {project.subtitle}
          </p>
        )}

        <p className="text-sm text-white/55 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full text-[10px] font-medium text-white/45"
              style={{
                background: 'rgba(167,139,250,0.08)',
                border: '1px solid rgba(167,139,250,0.15)',
              }}
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
            className="mt-2 self-start px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all"
            style={{
              background: 'rgba(255,255,255,0.92)',
              color: '#0c0920',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.92)')}
          >
            View Work →
          </a>
        )}
      </div>
    </motion.div>
  );
};