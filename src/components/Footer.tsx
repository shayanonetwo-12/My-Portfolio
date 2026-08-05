import { Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { profile, navLinks } from '@/data/content';

export default function Footer() {
  return (
    <footer className="relative section-pad pt-20 pb-10 border-t border-white/5 carbon-fiber">
      <div className="grid-bg absolute inset-0 opacity-10" />
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr] gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="relative flex items-center justify-center w-9 h-9 rounded-md border border-white/10">
                <span className="font-grotesk font-bold text-sm lime-text">SS</span>
              </span>
              <span className="font-grotesk text-sm font-semibold tracking-wide">
                {profile.name.toUpperCase()}
              </span>
            </div>
            <div className="space-y-0.5 mb-4">
              <p className="micro-label">{profile.roles[0]}</p>
              <p className="micro-label">{profile.roles[1]}</p>
              <p className="micro-label">{profile.roles[2]}</p>
            </div>
            <p className="font-grotesk text-lg font-semibold lime-text">"BUILD. EXPERIMENT. ITERATE."</p>
          </div>

          {/* Links */}
          <div>
            <div className="micro-label mb-4">Navigation</div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-[var(--soft)] link-underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <div className="micro-label mb-4">Social</div>
            <div className="space-y-3">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[var(--soft)] hover:text-[var(--lime)] transition-colors group">
                <Github size={16} /> GitHub
                <ArrowUp size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[var(--soft)] hover:text-[var(--lime)] transition-colors group">
                <Linkedin size={16} /> LinkedIn
                <ArrowUp size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[var(--soft)] hover:text-[var(--lime)] transition-colors group">
                <Instagram size={16} /> Instagram
                <ArrowUp size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--dark-grey)]">© 2026 Shayan Shahid. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] pulse-lime" />
            <span className="micro-label">Built with AI + Creativity</span>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <a
        href="#home"
        aria-label="Back to top"
        className="absolute -top-6 right-6 sm:right-8 lg:right-24 flex items-center justify-center w-12 h-12 rounded-full carbon-fiber border border-white/10 hover:border-[var(--lime)]/50 hover:text-[var(--lime)] transition-colors"
        data-cursor="OPEN"
      >
        <ArrowUp size={18} />
      </a>
    </footer>
  );
}
