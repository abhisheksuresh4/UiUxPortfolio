import { usePortfolio } from '../hooks/usePortfolio';
import { SocialLinks } from './SocialLinks';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => {
  const { data } = usePortfolio();
  const footerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start 150%', 'start 50%'],
  });

  const footerOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const footerY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  if (!data) return null;
  const { profile } = data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.footer
      ref={footerRef}
      id="contact"
      className="relative mt-32 pt-32 pb-16 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0b 0%, #050505 50%, #080808 100%)',
        opacity: footerOpacity,
        y: footerY,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Ambient glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full blur-[200px] opacity-15" style={{ background: 'rgba(232, 162, 58, 0.3)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Left: Branding + Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-black italic text-text-primary mb-6">
              Let's Build <br />
              <span className="bg-gradient-to-r from-accent to-[#f0c060] bg-clip-text text-transparent">Something Great</span>
            </h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-lg text-text-secondary">
                {profile.specialization}
              </p>
              <p className="text-base text-text-tertiary">
                Based in {profile.location}
              </p>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/[0.06]">
              <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">Connect</p>
              <SocialLinks social={profile.social} />
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-text-tertiary mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-text-primary text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] placeholder:text-text-tertiary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-text-tertiary mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-text-primary text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] placeholder:text-text-tertiary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-text-tertiary mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-text-primary text-base resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] placeholder:text-text-tertiary"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl font-semibold uppercase tracking-wider transition-colors duration-200 bg-accent text-bg-deep hover:bg-accent/90 cursor-pointer shadow-[0_4px_24px_rgba(232,162,58,0.2)]"
                >
                  {submitted ? 'Sent! ✓' : 'Send Message'}
                </button>
              </div>
            </form>

            {/* Quick Contact */}
            <div className="mt-8 pt-8 border-t border-white/[0.06] space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">Or reach out directly</p>
              <div className="space-y-2">
                <a
                  href={`mailto:${profile.social.email}`}
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{profile.social.email}</span>
                </a>
                {profile.social.phone && (
                  <a
                    href={`tel:${profile.social.phone}`}
                    className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm">{profile.social.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section with Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-12 border-t border-white/[0.06]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Home', href: '#hero' },
                  { label: 'About', href: '#about' },
                  { label: 'Experience', href: '#experience' },
                  { label: 'Projects', href: '#projects' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-text-tertiary hover:text-text-primary transition-colors duration-200 text-sm cursor-pointer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Blog', href: '#' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Resume', href: '#' },
                  { label: 'Contact', href: '#contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-text-tertiary hover:text-text-primary transition-colors duration-200 text-sm cursor-pointer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-tertiary">
            <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
            <p className="flex items-center gap-1.5">Crafted with <Heart className="w-3.5 h-3.5 text-accent fill-accent" /> passion.</p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
