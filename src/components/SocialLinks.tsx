import { Mail, Phone, Globe } from 'lucide-react';
import type { SocialLinks as SocialLinksType } from '../types/portfolio';

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export const SocialLinks = ({ social }: { social: SocialLinksType }) => {
  return (
    <div className="flex gap-3 items-center justify-center lg:justify-start">
      {social.linkedin && (
        <a href={social.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl hover:bg-accent/10 hover:border-accent/20 transition-all duration-200 cursor-pointer text-text-secondary hover:text-accent">
          <LinkedinIcon className="w-5 h-5" />
        </a>
      )}
      {social.website && (
        <a href={social.website} target="_blank" rel="noreferrer" className="p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl hover:bg-accent/10 hover:border-accent/20 transition-all duration-200 cursor-pointer text-text-secondary hover:text-accent">
          <Globe className="w-5 h-5" />
        </a>
      )}
      {social.email && (
        <a href={`mailto:${social.email}`} className="p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl hover:bg-accent/10 hover:border-accent/20 transition-all duration-200 cursor-pointer text-text-secondary hover:text-accent">
          <Mail className="w-5 h-5" />
        </a>
      )}
      {social.phone && (
        <a href={`tel:${social.phone}`} className="p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl hover:bg-accent/10 hover:border-accent/20 transition-all duration-200 cursor-pointer text-text-secondary hover:text-accent">
          <Phone className="w-5 h-5" />
        </a>
      )}
    </div>
  );
};
