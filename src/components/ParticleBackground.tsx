import { useEffect, useRef } from 'react';

type Props = {
  density?: number;
  className?: string;
};

export default function ParticleBackground({ density = 60, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const count = reduce ? 0 : Math.floor(density * (isMobile ? 0.4 : 1));

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const particles: P[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
        a: Math.random() * 0.5 + 0.15,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const onMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      };
    window.addEventListener('mousemove', onMove);

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 0.8;
          p.y += (dy / dist) * force * 0.8;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(182, 255, 0, ${p.a})`;
        ctx.fill();
      }

      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(182, 255, 0, ${(1 - d / 110) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    if (!reduce) rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
