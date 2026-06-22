import { usePortfolio } from '../hooks/usePortfolio';
import { SocialLinks } from './SocialLinks';

export const Footer = () => {
  const { data } = usePortfolio();
  if (!data) return null;
  const { profile } = data;

  return (
    <footer id="contact" className="mt-24 border-t border-white/10 bg-[#0C0C0C] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-24">
        
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold hero-heading tracking-widest uppercase">{profile.shortName}.</h2>
          <p className="text-gray-400 font-light max-w-sm">
            {profile.specialization} <br/>
            Based in {profile.location}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold uppercase tracking-widest text-white mb-2">Navigate</h3>
          <a href="#hero" className="text-gray-400 hover:text-white transition-colors">Home</a>
          <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
          <a href="#experience" className="text-gray-400 hover:text-white transition-colors">Experience</a>
          <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold uppercase tracking-widest text-white mb-2">Reach Out</h3>
          <a href={`mailto:${profile.social.email}`} className="text-gray-400 hover:text-white transition-colors truncate">
            {profile.social.email}
          </a>
          <a href={`tel:${profile.social.phone}`} className="text-gray-400 hover:text-white transition-colors">
            {profile.social.phone}
          </a>
          <div className="mt-4">
            <SocialLinks social={profile.social} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Built with React & Vite.</p>
      </div>
    </footer>
  );
};
