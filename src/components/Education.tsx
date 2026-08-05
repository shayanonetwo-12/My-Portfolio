import { motion } from 'framer-motion';
import { GraduationCap, Award, Trophy, Hash } from 'lucide-react';
import { education, certifications, achievements, interests } from '@/data/content';
import { Reveal, SectionLabel, SectionHeading } from './ui/Primitives';

export default function Education() {
  return (
    <>
      {/* EDUCATION */}
      <section id="education" className="relative section-pad py-24 sm:py-32">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <SectionLabel num="05">Education</SectionLabel>
            <SectionHeading>
              The academic <span className="lime-text">foundation.</span>
            </SectionHeading>
          </Reveal>

          <div className="relative mt-14">
            {/* vertical line */}
            <div className="absolute left-[19px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--lime)]/40 via-white/10 to-transparent sm:-translate-x-1/2" />

            <div className="space-y-10">
              {education.map((edu, i) => (
                <Reveal key={edu.num} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    {/* node */}
                    <div className="absolute left-[12px] sm:left-1/2 -translate-x-1/2 z-10 mt-1">
                      <div className="w-4 h-4 rounded-full bg-[var(--lime)] pulse-lime" style={{ boxShadow: '0 0 12px rgba(182,255,0,0.5)' }} />
                    </div>

                    {/* spacer for desktop alternating */}
                    <div className="hidden sm:block sm:w-1/2" />

                    {/* card */}
                    <div className={`flex-1 sm:w-1/2 ${i % 2 === 0 ? 'sm:pl-12' : 'sm:pr-12'} pl-12 sm:pl-0`}>
                      <div className="carbon-panel p-5 sm:p-6 hover:border-[var(--lime)]/30 transition-colors group">
                        <div className="flex items-center gap-2 mb-3">
                          <GraduationCap size={16} className="lime-text" />
                          <span className="font-grotesk text-xs font-bold lime-text">{edu.num}</span>
                          <span className="micro-label">{edu.period}</span>
                        </div>
                        <h3 className="font-grotesk text-lg font-semibold mb-1 group-hover:lime-text transition-colors">
                          {edu.institution}
                        </h3>
                        <p className="text-sm text-[var(--soft)] mb-3">{edu.degree}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md carbon-fiber border border-[var(--lime)]/20">
                          <span className="text-xs font-semibold lime-text">{edu.grade}</span>
                        </div>
                        {edu.foundation.length > 0 && (
                          <div className="mt-4">
                            <div className="micro-label mb-2">Foundation</div>
                            <div className="flex flex-wrap gap-1.5">
                              {edu.foundation.map((f) => (
                                <span key={f} className="text-[11px] px-2 py-1 rounded border border-white/8 text-[var(--soft)]">
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="relative section-pad py-24 sm:py-32">
        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel num="06">Certifications</SectionLabel>
            <SectionHeading>
              The <span className="lime-text">credential vault.</span>
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <Reveal key={cert.num} delay={i * 0.05}>
                <motion.div
                  whileHover={{ rotateY: 4, rotateX: -2, y: -4 }}
                  style={{ transformStyle: 'preserve-3d', perspective: 800 }}
                  className="group relative carbon-panel p-5 scan-line h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg carbon-fiber border border-white/10 flex items-center justify-center group-hover:border-[var(--lime)]/40 transition-colors">
                      <Award size={18} className="lime-text" />
                    </div>
                    <span className="font-grotesk text-xs font-bold text-[var(--carbon-5)] group-hover:text-[var(--lime)]/30 transition-colors">
                      {cert.num}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold leading-snug mb-2">{cert.title}</h3>
                  <p className="text-xs text-[var(--soft)] mb-3">{cert.issuer}</p>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[var(--lime)]" />
                    <span className="micro-label">{cert.date}</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS + INTERESTS */}
      <section className="relative section-pad py-24 sm:py-32">
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          {/* Achievements */}
          <Reveal>
            <SectionLabel num="07">Achievements</SectionLabel>
            <div className="carbon-panel p-8 text-center relative overflow-hidden">
              <div className="grid-bg absolute inset-0 opacity-20" />
              <div className="relative">
                <Trophy size={28} className="lime-text mx-auto mb-4" />
                <div className="font-grotesk text-6xl sm:text-7xl font-bold lime-text text-glow leading-none">
                  {achievements.highlight.score}
                </div>
                <div className="micro-label mt-3">{achievements.highlight.label}</div>
              </div>
              <div className="relative mt-6 space-y-2 text-left">
                {achievements.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[var(--soft)] leading-relaxed">
                    <span className="lime-text mt-0.5">▸</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Interests */}
          <Reveal delay={0.15}>
            <SectionLabel num="08">Professional Interests</SectionLabel>
            <SectionHeading className="!text-2xl sm:!text-3xl mb-6">
              What I'm <span className="lime-text">exploring.</span>
            </SectionHeading>
            <div className="flex flex-wrap gap-2.5">
              {interests.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -3, scale: 1.04 }}
                  className="flex items-center gap-1.5 text-xs sm:text-sm px-3.5 py-2 rounded-full carbon-fiber border border-white/10 hover:border-[var(--lime)]/40 hover:text-[var(--lime)] transition-colors cursor-default"
                >
                  <Hash size={11} className="opacity-50" />
                  {tag}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
