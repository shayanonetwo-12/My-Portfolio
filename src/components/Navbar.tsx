import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Menu, X, ArrowUpRight } from 'lucide-react';
import { profile, navLinks } from '@/data/content';
import { useScrollProgress } from './ui/Primitives';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
        }`}
      >
        {/* scroll progress bar */}
        <div className="absolute bottom-0 left-0 h-px bg-[var(--lime)]" style={{ width: `${progress * 100}%` }} />

        <nav className="section-pad flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo */}
          <a href="#home" data-cursor="OPEN" className="flex items-center gap-2.5 group">
            <span className="relative flex items-center justify-center w-9 h-9 rounded-md carbon-fiber border border-white/10 group-hover:border-[var(--lime)]/50 transition-colors">
              <span className="font-grotesk font-bold text-sm lime-text">SS</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--lime)] pulse-lime" />
            </span>
            <span className="hidden sm:block font-grotesk text-sm font-semibold tracking-wide">
              {profile.name.toUpperCase()}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
                  active === link.href ? 'lime-text' : 'text-[var(--soft)] hover:text-white'
                }`}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-3 right-3 -bottom-0.5 h-px bg-[var(--lime)]"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 mr-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] pulse-lime" />
              <span className="micro-label">Available</span>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              aria-label="GitHub"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-white/10 hover:border-[var(--lime)]/50 hover:text-[var(--lime)] transition-colors"
            >
              <Github size={15} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              aria-label="LinkedIn"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-white/10 hover:border-[var(--lime)]/50 hover:text-[var(--lime)] transition-colors"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="#contact"
              className="hidden sm:inline-flex btn-primary !px-4 !py-2 !text-[11px]"
            >
              Contact
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md border border-white/10 hover:border-[var(--lime)]/50 transition-colors"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden bg-[var(--carbon-0)]/95 backdrop-blur-xl flex flex-col"
          >
            <div className="grid-bg absolute inset-0 opacity-20" />
            <div className="relative flex items-center justify-between h-16 px-5 sm:px-8 border-b border-white/5">
              <span className="font-grotesk font-bold text-sm lime-text">{profile.name.toUpperCase()}</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center w-9 h-9 rounded-md border border-white/10"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative flex-1 flex flex-col justify-center px-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="flex items-center justify-between py-4 border-b border-white/5 group"
                >
                  <span className="font-grotesk text-2xl font-semibold group-hover:lime-text transition-colors">
                    {link.label}
                  </span>
                  <ArrowUpRight size={18} className="text-[var(--dark-grey)] group-hover:lime-text" />
                </motion.a>
              ))}
            </div>
            <div className="relative px-6 py-8 flex items-center gap-4">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--soft)]">
                <Github size={16} /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--soft)]">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
