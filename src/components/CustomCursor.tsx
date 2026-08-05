import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorLabel = '' | 'VIEW PROJECT' | 'EXPLORE' | 'OPEN' | 'VIEW';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<CursorLabel>('');
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Dot follows exactly
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 50, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 50, mass: 0.3 });

  // Ring follows with pleasant lag
  const ringX = useSpring(mouseX, { stiffness: 220, damping: 24, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 24, mass: 0.8 });

  // Velocity for scale breathing
  const velRef = useRef({ x: 0, y: 0, prevX: -200, prevY: -200 });

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFine) return;
    setEnabled(true);
    document.body.classList.add('custom-cursor-active');

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - velRef.current.prevX;
      const dy = e.clientY - velRef.current.prevY;
      velRef.current = { x: dx, y: dy, prevX: e.clientX, prevY: e.clientY };
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const dataEl = t.closest('[data-cursor]') as HTMLElement | null;
      if (dataEl) {
        setLabel((dataEl.dataset.cursor as CursorLabel) || 'OPEN');
        setHovering(true);
      } else if (t.closest('a, button, input, textarea, select, [role="button"]')) {
        setLabel('');
        setHovering(true);
      } else {
        setLabel('');
        setHovering(false);
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  const isLabel = label !== '';

  return (
    <>
      {/* Dot — snappy, always on top */}
      <motion.div
        className="fixed top-0 left-0 z-[92] pointer-events-none"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--lime)]"
          animate={{
            width: clicking ? 6 : isLabel ? 0 : hovering ? 5 : 7,
            height: clicking ? 6 : isLabel ? 0 : hovering ? 5 : 7,
            opacity: isLabel ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 600, damping: 30 }}
          style={{ boxShadow: '0 0 10px rgba(182,255,0,0.7), 0 0 20px rgba(182,255,0,0.3)' }}
        />
      </motion.div>

      {/* Outer ring — laggy, atmospheric */}
      <motion.div
        className="fixed top-0 left-0 z-[91] pointer-events-none"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2"
          animate={
            isLabel
              ? { width: 52, height: 52, borderRadius: '50%', opacity: 1 }
              : hovering
              ? { width: 42, height: 42, borderRadius: '50%', opacity: 1 }
              : clicking
              ? { width: 22, height: 22, borderRadius: '50%', opacity: 1 }
              : { width: 34, height: 34, borderRadius: '50%', opacity: 1 }
          }
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{
            border: isLabel ? 'none' : `1.5px solid rgba(182,255,0,${hovering ? 0.65 : 0.3})`,
            background: isLabel ? 'rgba(182,255,0,1)' : clicking ? 'rgba(182,255,0,0.12)' : 'transparent',
            boxShadow: hovering && !isLabel
              ? '0 0 18px rgba(182,255,0,0.18), inset 0 0 8px rgba(182,255,0,0.06)'
              : 'none',
          }}
        >
          {isLabel && (
            <motion.div
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <span className="text-[7px] font-black uppercase tracking-wider text-black text-center leading-tight px-1">
                {label}
              </span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Click ripple */}
      {clicking && (
        <motion.div
          className="fixed top-0 left-0 z-[90] pointer-events-none"
          style={{ x: dotX, y: dotY }}
        >
          <motion.div
            className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--lime)]/30"
            initial={{ width: 10, height: 10, opacity: 0.8 }}
            animate={{ width: 60, height: 60, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </>
  );
}
