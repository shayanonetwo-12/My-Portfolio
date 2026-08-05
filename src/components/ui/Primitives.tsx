import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 24, once = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="lime-text font-grotesk text-xs font-semibold">{num}</span>
      <span className="h-px w-8 bg-[var(--lime)]/40" />
      <span className="micro-label lime-text">{children}</span>
    </div>
  );
}

export function SectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05] ${className || ''}`}>
      {children}
    </h2>
  );
}

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return pos;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(1, Math.max(0, scrolled)));
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return progress;
}
