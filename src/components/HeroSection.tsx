import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import { SocialLinks } from './SocialLinks';

export const HeroSection = () => {
  const { data } = usePortfolio();
  if (!data) return null;
  const { profile } = data;

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center overflow-hidden scroll-mt-20"
    >

      {/* ── Warm amber gradient atmosphere ── */}
      <div className="absolute inset-0 z-0 bg-bg-deep">
        {/* Primary warm orb — top-left */}
        <div className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full bg-[#e8a23a]/15 blur-[140px] animate-throb-glow" />
        {/* Secondary warm orb — bottom-right */}
        <div className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-[#d4781f]/12 blur-[160px] animate-wave-flow" />
        {/* Centre vignette */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-bg-deep/40 to-bg-deep/80" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-32 flex flex-col items-center justify-center text-center gap-6">

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-accent/20 shadow-[0_0_40px_rgba(232,162,58,0.15)]"
        >
          <img
            src="/avatar.png"
            alt={profile.name}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tight text-text-primary leading-none mt-2"
          style={{ letterSpacing: '-0.02em' }}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {profile.name}
        </motion.h1>

        {/* Role */}
        <motion.h2
          className="text-lg md:text-xl text-accent font-semibold tracking-widest uppercase"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {profile.role}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="text-base md:text-lg text-text-secondary font-light max-w-xl leading-relaxed mt-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href="#about"
            className="px-7 py-3 rounded-full border border-white/[0.12] text-text-secondary text-sm font-medium hover:border-accent/30 hover:text-text-primary transition-all duration-200 tracking-wide backdrop-blur-sm flex items-center gap-2 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M7 7h10M7 12h10M7 17h6" />
            </svg>
            About Me
          </a>

          <a
            href="#projects"
            className="px-7 py-3 rounded-full bg-accent text-bg-deep text-sm font-semibold hover:bg-accent/90 transition-colors duration-200 tracking-wide flex items-center gap-2 shadow-[0_4px_24px_rgba(232,162,58,0.25)] cursor-pointer"
          >
            Projects
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 pt-6 border-t border-white/[0.06] w-full max-w-xs flex justify-center"
        >
          <SocialLinks social={profile.social} />
        </motion.div>

      </div>
    </section>
  );
};