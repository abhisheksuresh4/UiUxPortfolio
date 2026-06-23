import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0C0C0C]/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="text-xl font-bold tracking-widest uppercase" style={{ fontFamily: '"Poppins", sans-serif' }}>
          Abhijith.
        </a>
        <div className="hidden md:flex gap-8 items-center">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="md:hidden text-sm uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full">
          Menu
        </a>
      </div>
    </motion.nav>
  );
};
