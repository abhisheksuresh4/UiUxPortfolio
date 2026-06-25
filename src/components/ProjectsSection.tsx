import { useRef, useState, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import { ProjectCard } from './ProjectCard';

export const ProjectsSection = () => {
  const { data } = usePortfolio();
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);

  useEffect(() => {
    if (!trackRef.current) return;
    setWidthRef.current = trackRef.current.scrollWidth / 3;
  }, [data]);

  useAnimationFrame((_, delta) => {
    if (isDragging || isHovered || !setWidthRef.current) return;
    let next = x.get() - delta * 0.04;
    if (Math.abs(next) >= setWidthRef.current) {
      next = next + setWidthRef.current;
    }
    x.set(next);
  });

  if (!data) return null;

  const sorted = [...data.projects].sort((a, b) => {
    if (a.highlight && !b.highlight) return -1;
    if (!a.highlight && b.highlight) return 1;
    return 0;
  });

  const looped = [...sorted, ...sorted, ...sorted];

  return (
    <section
      id="projects"
      className="scroll-mt-20 overflow-hidden relative bg-bg-deep"
    >
      {/* Top separator glow — warm amber */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(232,162,58,0.1) 40%, rgba(232,162,58,0.18) 50%, rgba(232,162,58,0.1) 60%, transparent 100%)',
          boxShadow: '0 0 30px 6px rgba(232,162,58,0.08)',
        }}
      />

      {/* Ambient background orb */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(232,162,58,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 pt-24 pb-4 max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>
        <p className="text-text-tertiary text-sm mt-3 tracking-wide">Drag to explore</p>
      </div>

      {/* Carousel */}
      <div className="relative z-10 py-12">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10"
          style={{ background: 'linear-gradient(to right, #0a0a0b, transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10"
          style={{ background: 'linear-gradient(to left, #0a0a0b, transparent)' }} />

        <motion.div
          ref={trackRef}
          className="flex gap-6 px-6 w-max"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -Infinity, right: 0 }}
          dragElastic={0}
          dragMomentum={true}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setIsDragging(false);
            const setW = setWidthRef.current;
            if (!setW) return;
            let cur = x.get();
            cur = ((cur % setW) - setW) % setW;
            x.set(cur);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileTap={{ cursor: 'grabbing' }}
        >
          {looped.map((project, idx) => (
            <ProjectCard key={`${project.id}-${idx}`} project={project} />
          ))}
        </motion.div>
      </div>

      {/* Bottom separator glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(232,162,58,0.12) 40%, rgba(232,162,58,0.2) 50%, rgba(232,162,58,0.12) 60%, transparent 100%)',
          boxShadow: '0 0 30px 6px rgba(232,162,58,0.08)',
        }}
      />
    </section>
  );
};