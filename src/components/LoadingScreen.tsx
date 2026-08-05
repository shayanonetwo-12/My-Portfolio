import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@/data/content';

const modules = [
  { label: 'AI MODULES', dots: 'READY' },
  { label: '3D ENGINE', dots: 'READY' },
  { label: 'PROJECTS', dots: 'READY' },
  { label: 'INTERFACE', dots: 'READY' },
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setShowWelcome(true), 200);
        setTimeout(() => setDone(true), 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--carbon-0)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid-bg absolute inset-0 opacity-30" />

          <div className="relative w-full max-w-md px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <div className="micro-label lime-text mb-2">SYSTEM INITIALIZING</div>
              <h1 className="font-grotesk text-3xl sm:text-4xl font-bold tracking-tight">
                {profile.name.toUpperCase()}
              </h1>
              <p className="micro-label mt-2">{profile.title}</p>
            </motion.div>

            <div className="space-y-2 mb-8">
              {modules.map((m, i) => {
                const active = progress >= (i + 1) * 25;
                return (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-center justify-between text-[11px] font-mono"
                  >
                    <span className="tracking-widest text-[var(--soft)]">{m.label}</span>
                    <span className="flex items-center gap-2">
                      <span className="h-px w-16 bg-[var(--carbon-5)] overflow-hidden">
                        <motion.span
                          className="block h-full bg-[var(--lime)]"
                          initial={{ width: '0%' }}
                          animate={{ width: active ? '100%' : '0%' }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                        />
                      </span>
                      <span className={`tabular-nums ${active ? 'lime-text' : 'text-[var(--dark-grey)]'}`}>
                        {m.dots}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 h-1 bg-[var(--carbon-4)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--lime)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-xs tabular-nums lime-text w-10 text-right">
                {progress}%
              </span>
            </div>

            <AnimatePresence>
              {showWelcome && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center mt-6"
                >
                  <span className="font-grotesk text-lg font-semibold lime-text text-glow">
                    WELCOME.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
