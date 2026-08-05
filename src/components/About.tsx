import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles, ShoppingBag, Rocket } from 'lucide-react';
import { about, whatIBuild } from '@/data/content';
import { Reveal, SectionLabel, SectionHeading } from './ui/Primitives';

import type { LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  BrainCircuit,
  Sparkles,
  ShoppingBag,
  Rocket,
};

export default function About() {
  return (
    <section id="about" className="relative section-pad py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel num="01">About Me</SectionLabel>
          <SectionHeading>
            Business mind. <span className="lime-text">AI builder.</span>
          </SectionHeading>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left — summary */}
          <Reveal delay={0.1}>
            <div className="space-y-5 text-[var(--soft)] text-base leading-relaxed">
              {about.summary.split('\n\n').map((para, i) => (
                <p key={i} className={i === 0 ? 'text-white text-lg' : ''}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Right — data cards */}
          <Reveal delay={0.2}>
            <div className="grid sm:grid-cols-2 gap-3">
              {about.cards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.08 }}
                  className="carbon-panel p-4 hover:border-[var(--lime)]/30 transition-colors group"
                >
                  <div className="micro-label mb-2">{card.label}</div>
                  <div className="text-sm font-medium text-white group-hover:lime-text transition-colors">
                    {card.value}
                  </div>
                  <div className="mt-3 h-px w-full bg-gradient-to-r from-[var(--lime)]/20 to-transparent" />
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* What I Build */}
      <div className="relative max-w-6xl mx-auto mt-24 sm:mt-32">
        <Reveal>
          <SectionLabel num="02">What I Build</SectionLabel>
          <SectionHeading>
            Four lanes of <span className="lime-text">digital product work.</span>
          </SectionHeading>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whatIBuild.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.num} delay={i * 0.08}>
                <div className="group relative h-full">
                  {/* animated border on hover */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[var(--lime)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  <div className="relative carbon-panel p-6 h-full overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-6">
                      <span className="font-grotesk text-3xl font-bold text-[var(--carbon-5)] group-hover:text-[var(--lime)]/30 transition-colors">
                        {item.num}
                      </span>
                      <div className="w-10 h-10 rounded-lg carbon-fiber border border-white/10 flex items-center justify-center group-hover:border-[var(--lime)]/40 transition-colors">
                        {Icon && <Icon size={18} className="lime-text" />}
                      </div>
                    </div>
                    <h3 className="font-grotesk text-lg font-semibold mb-2 group-hover:lime-text transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--soft)] leading-relaxed">{item.desc}</p>
                    <div className="mt-4 h-px w-0 group-hover:w-full bg-[var(--lime)]/40 transition-all duration-500" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
