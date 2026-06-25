import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { Project } from '../types/portfolio';

interface ProjectCarouselProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCarousel = ({ project, isOpen, onClose }: ProjectCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = project.image ? [project.image] : [];
  
  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl bg-bg-surface border border-white/[0.08]"
              onClick={e => e.stopPropagation()}
            >
              {/* Image Carousel */}
              <div className="relative aspect-video bg-black overflow-hidden">
                {images.length > 0 && (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`${project.title} slide ${currentIndex + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        draggable={false}
                      />
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          data-cursor="arrow-left"
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/15 transition-all duration-200 cursor-pointer bg-white/[0.06]"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={nextImage}
                          data-cursor="arrow-right"
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/15 transition-all duration-200 cursor-pointer bg-white/[0.06]"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Slide Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {images.map((_, idx) => (
                            <motion.button
                              key={idx}
                              className={`h-2 rounded-full transition-all cursor-pointer ${idx === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-white/30'}`}
                              onClick={() => setCurrentIndex(idx)}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                      {project.title}
                    </h2>
                    {project.subtitle && (
                      <p className="text-lg text-text-secondary italic">
                        {project.subtitle}
                      </p>
                    )}
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    data-cursor="close"
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-200 flex-shrink-0 cursor-pointer bg-white/[0.04]"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Stack */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-full text-xs font-medium text-text-secondary border border-white/[0.08] bg-white/[0.03]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Role Info */}
                {project.role && (
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Role</h3>
                    <p className="text-text-secondary text-sm">
                      {project.role}
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold uppercase tracking-wider transition-colors duration-200 bg-accent text-bg-deep hover:bg-accent/90 cursor-pointer"
                  >
                    View Live Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
