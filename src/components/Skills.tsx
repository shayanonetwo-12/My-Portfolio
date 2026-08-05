import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '@/data/content';
import { Reveal, SectionLabel, SectionHeading } from './ui/Primitives';

export default function Skills() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="skills" className="relative section-pad py-24 sm:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(182,255,0,0.04), transparent 70%)' }}
      />
      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel num="03">Skill Matrix</SectionLabel>
          <SectionHeading>
            The full <span className="lime-text">stack of an AI product builder.</span>
          </SectionHeading>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.num} delay={i * 0.06}>
              <motion.div
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                whileHover={{ y: -4 }}
                className={`relative carbon-panel p-6 h-full transition-colors duration-300 ${
                  active === i ? 'border-[var(--lime)]/40' : ''
                }`}
              >
                {/* corner accents */}
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--lime)]/20 group-hover:bg-[var(--lime)] transition-colors" />

                <div className="flex items-center gap-3 mb-5">
                  <span className="font-grotesk text-xs font-bold lime-text">{cat.num}</span>
                  <span className="h-px flex-1 bg-white/5" />
                  <span className="micro-label">{cat.skills.length} skills</span>
                </div>

                <h3 className="font-grotesk text-base font-semibold mb-4">{cat.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: active === i ? 1 : 0.6 }}
                      transition={{ delay: j * 0.03 }}
                      className={`text-[11px] px-2.5 py-1.5 rounded-md border transition-colors duration-200 ${
                        active === i
                          ? 'border-[var(--lime)]/40 text-white bg-[var(--lime)]/5'
                          : 'border-white/8 text-[var(--soft)]'
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* connecting line animation */}
                <motion.div
                  className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--lime)] to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={active === i ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
