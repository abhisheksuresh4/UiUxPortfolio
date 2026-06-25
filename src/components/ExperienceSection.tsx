import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

export const ExperienceSection = () => {
  const { data } = usePortfolio();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // ── ALL useTransform calls at top level (Rules of Hooks) ──
  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const glowTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  if (!data) return null;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 scroll-mt-20 bg-bg-deep"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-text-primary mb-20 tracking-tight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        <div className="relative">

          {/* ── Spine ── */}
          <div
            className="absolute top-0 bottom-0 hidden md:block"
            style={{ left: 'calc(19.56rem + 7px)' }}
          >
            {/* Dim static track */}
            <div className="absolute inset-0 w-px bg-white/[0.06]" />

            {/* Glowing fill — amber gradient */}
            <motion.div
              className="absolute top-0 left-0 w-px origin-top"
              style={{
                scaleY: lineScaleY,
                height: '100%',
                background: 'linear-gradient(to bottom, transparent, #e8a23a 20%, #d4781f 60%, #e8a23a)',
                boxShadow: '0 0 8px 2px rgba(232,162,58,0.35)',
              }}
            />

            {/* Leading glow orb */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-10 rounded-full pointer-events-none"
              style={{
                top: glowTop,
                opacity: glowOpacity,
                background: 'radial-gradient(ellipse at center, rgba(232,162,58,0.9) 0%, transparent 70%)',
                filter: 'blur(4px)',
              }}
            />
          </div>

          {/* ── Entries ── */}
          <div className="flex flex-col">
            {data.experience.map((exp, index) => (
              <motion.div
                key={exp.company + exp.role}
                className="relative grid grid-cols-1 md:grid-cols-[20rem_1fr] gap-6 md:gap-16 pb-24"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
              >
                {/* Left: Year + dot */}
                <div className="relative flex flex-col justify-start pt-1">

                  {/* Dot */}
                  <motion.div
                    className="absolute right-0 top-3 translate-x-[calc(50%+0.5px)] hidden md:flex items-center justify-center"
                    initial={{ scale: 0.3, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    {/* Ripple ring */}
                    <motion.div
                      className="absolute w-6 h-6 rounded-full"
                      style={{ background: 'rgba(232,162,58,0.25)' }}
                      initial={{ scale: 0.5, opacity: 0.6 }}
                      whileInView={{ scale: 2, opacity: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.3 }}
                    />
                    {/* Dot core */}
                    <div
                      className="w-3 h-3 rounded-full z-10"
                      style={{
                        background: 'radial-gradient(circle, #fef3c7 0%, #e8a23a 55%, #c0612a 100%)',
                        boxShadow: '0 0 0 2px rgba(232,162,58,0.2), 0 0 14px 5px rgba(232,162,58,0.3)',
                      }}
                    />
                  </motion.div>

                  {/* Year */}
                  <div className="md:pr-12">
                    <p className="text-4xl md:text-5xl font-bold text-white/15 leading-tight tracking-tight">
                      {exp.period.includes('(') ? (
                        <>
                          {exp.period.split('(')[0].trim()}
                          <br />
                          <span className="text-3xl md:text-4xl">
                            ({exp.period.split('(')[1]}
                          </span>
                        </>
                      ) : (
                        exp.period
                      )}
                    </p>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-1">
                      {exp.company}
                    </h3>
                    <p className="text-base text-accent/70 font-light tracking-wide italic">
                      {exp.role}
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl">
                    {exp.summary}
                  </p>

                  <ul className="flex flex-col gap-3 mt-2">
                    {exp.highlights.slice(0, 4).map((highlight, idx) => (
                      <li key={idx} className="flex gap-3 text-text-tertiary text-sm leading-relaxed">
                        <span className="text-accent/40 mt-0.5 shrink-0">→</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};