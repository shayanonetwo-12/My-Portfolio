import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, Sparkles, Cpu, Zap } from 'lucide-react';
import { profile } from '@/data/content';
import ParticleBackground from './ParticleBackground';
import { useMousePosition } from './ui/Primitives';

// Placeholder avatar — replace /public/avatar.jpg with the real photo
const AVATAR_SRC = '/ChatGPT_Image_Jul_28,_2026,_03_59_32_PM.png';

export default function Hero() {
  const mouse = useMousePosition();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [avatarOk, setAvatarOk] = useState(false);
  const [avatarTried, setAvatarTried] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = AVATAR_SRC;
    img.onload = () => setAvatarOk(true);
    img.onerror = () => setAvatarTried(true);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (mouse.x - cx) / rect.width;
    const dy = (mouse.y - cy) / rect.height;
    setTilt({ rx: dy * -8, ry: dx * 8 });
  }, [mouse]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[var(--carbon-0)]" />
      <div className="grid-bg absolute inset-0 opacity-40" />
      <ParticleBackground density={70} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(182,255,0,0.06), transparent 70%)',
        }}
      />

      <div className="relative section-pad w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
        {/* LEFT */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] pulse-lime" />
            <span className="micro-label lime-text">{profile.roles.join(' / ')}</span>
          </motion.div>

          <h1 className="font-grotesk text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[0.95] tracking-tight">
            {['BUILDING', 'DIGITAL', 'PRODUCTS', 'WITH AI.'].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {word === 'AI.' ? (
                  <span className="lime-text text-glow">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-[var(--soft)] leading-relaxed"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="btn-primary" data-cursor="EXPLORE">
              Explore My Work <ArrowUpRight size={16} />
            </a>
            <a href="#contact" className="btn-ghost" data-cursor="OPEN">
              Let's Connect
            </a>
            <a
              href="/CV_PDF.pdf"
              download="Shayan_Shahid_CV.pdf"
              className="btn-ghost !px-4 !py-3"
              data-cursor="OPEN"
              aria-label="Download CV"
            >
              <Download size={16} /> CV
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-10 flex items-center gap-6 sm:gap-8"
          >
            {[
              { v: '6+', l: 'Projects Built' },
              { v: '7', l: 'Certifications' },
              { v: '3.96', l: 'GPA / 4.0' },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-grotesk text-2xl font-bold lime-text">{s.v}</div>
                <div className="micro-label mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Avatar in 3D frame */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
            style={{ perspective: 1200 }}
          >
            <motion.div
              animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="relative preserve-3d"
              data-cursor="EXPLORE"
            >
              {/* Outer rotating ring */}
              <div className="absolute -inset-10 sm:-inset-14 pointer-events-none">
                <div className="absolute inset-0 rounded-full border border-[var(--lime)]/15 spin-slow" />
                <div className="absolute inset-4 rounded-full border border-[var(--lime)]/10 spin-slow-rev" />
                {/* Orbit dots */}
                {[0, 120, 240].map((deg) => (
                  <div
                    key={deg}
                    className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2"
                    style={{ transform: `rotate(${deg}deg) translateY(-130px) rotate(-${deg}deg)` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[var(--lime)]" style={{ boxShadow: '0 0 10px rgba(182,255,0,0.6)' }} />
                  </div>
                ))}
              </div>

              {/* Avatar frame */}
              <div className="relative w-[260px] h-[340px] sm:w-[320px] sm:h-[400px] lg:w-[340px] lg:h-[420px]">
                {/* Lime rim glow */}
                <div
                  className="absolute -inset-1 rounded-[2rem] blur-md opacity-50"
                  style={{ background: 'linear-gradient(135deg, rgba(182,255,0,0.3), transparent 60%, rgba(182,255,0,0.15))' }}
                />
                {/* Carbon-fiber frame */}
                <div className="relative w-full h-full rounded-[2rem] carbon-fiber border border-white/10 overflow-hidden">
                  {avatarOk ? (
                    <img
                      src={AVATAR_SRC}
                      alt="Shayan Shahid"
                      className="w-full h-full object-cover"
                      onError={() => setAvatarTried(true)}
                    />
                  ) : avatarTried ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">
                      <div className="w-24 h-24 rounded-full carbon-fiber border border-[var(--lime)]/30 flex items-center justify-center mb-4">
                        <span className="font-grotesk text-3xl font-bold lime-text">SS</span>
                      </div>
                      <p className="micro-label">Avatar Photo</p>
                      <p className="text-xs text-[var(--dark-grey)] mt-2">Place photo at /public/avatar.jpg</p>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-2 border-[var(--lime)]/30 border-t-[var(--lime)] animate-spin" />
                    </div>
                  )}
                  {/* Cinematic gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.7) 100%)' }}
                  />
                  {/* Scan line */}
                  <div className="absolute inset-0 scan-line pointer-events-none" />
                </div>

                {/* Floating identity card */}
                <motion.div
                  className="absolute -bottom-6 -left-6 sm:-left-10 glass rounded-xl px-4 py-3 float-y"
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] pulse-lime" />
                    <span className="micro-label lime-text">Open to Opportunities</span>
                  </div>
                  <div className="font-grotesk text-sm font-semibold">{profile.name}</div>
                  <div className="text-[10px] text-[var(--soft)] mt-0.5">{profile.roles.join(' / ')}</div>
                </motion.div>

                {/* Floating AI panel top-right */}
                <motion.div
                  className="absolute -top-4 -right-4 sm:-right-8 glass rounded-lg px-3 py-2.5 float-y"
                  style={{ transform: 'translateZ(50px)', animationDelay: '1s' }}
                >
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="lime-text" />
                    <span className="micro-label">AI CORE</span>
                  </div>
                  <div className="flex items-end gap-0.5 mt-2 h-5">
                    {[40, 70, 50, 90, 60, 80].map((h, i) => (
                      <motion.span
                        key={i}
                        className="w-1 bg-[var(--lime)]/60 rounded-sm"
                        animate={{ height: [h * 0.4 + '%', h + '%', h * 0.5 + '%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                        style={{ height: h + '%' }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Floating chip bottom-right */}
                <motion.div
                  className="absolute -bottom-2 -right-3 sm:-right-6 glass rounded-lg px-3 py-2 float-y"
                  style={{ transform: 'translateZ(40px)', animationDelay: '2s' }}
                >
                  <div className="flex items-center gap-2">
                    <Zap size={12} className="lime-text" />
                    <span className="text-[10px] font-mono text-[var(--soft)]">VIBE CODING</span>
                  </div>
                </motion.div>


              </div>
            </motion.div>

            {/* Sparkle accents */}
            <Sparkles className="absolute -top-12 -right-12 lime-text opacity-40 float-y" size={20} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — line only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-px h-10 bg-gradient-to-b from-[var(--lime)]/50 to-transparent" />
      </motion.div>
    </section>
  );
}
