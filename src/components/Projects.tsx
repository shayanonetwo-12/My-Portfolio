import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, X, Check } from 'lucide-react';
import { projects, type Project } from '@/data/content';
import { Reveal, SectionLabel, SectionHeading } from './ui/Primitives';

function ProjectVisual({ project, expanded = false }: { project: Project; expanded?: boolean }) {
  const img = project.image;
  const isComingSoon = project.status === 'coming-soon';
  const gradient = `linear-gradient(135deg, ${project.accent}0d 0%, #0d0f0d 50%, ${project.accent}08 100%)`;

  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{ background: gradient }}
    >
      <div className="grid-bg absolute inset-0 opacity-20" />
      {img ? (
        <img
          src={img}
          alt={project.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : null}
      {/* dark shade for readability and mood */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.65) 100%)' }} />

      {isComingSoon && (
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[var(--lime)] text-black text-[9px] font-bold uppercase tracking-wider">
          Coming Soon
        </div>
      )}

      <div className="absolute bottom-3 left-4 right-4">
        <p className="micro-label truncate">{project.visual}</p>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const sections = [
    { label: 'Overview', value: project.overview },
    { label: 'Problem', value: project.problem },
    { label: 'Solution', value: project.solution },
    { label: 'Challenges', value: project.challenges },
    { label: 'Outcome', value: project.outcome },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto no-scrollbar carbon-fiber rounded-2xl border border-white/10"
      >
        {/* Header visual */}
        <div className="relative h-44 sm:h-56">
          <ProjectVisual project={project} expanded />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full glass hover:border-[var(--lime)]/40 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-grotesk text-xs font-bold lime-text">{project.num}</span>
            <span className="micro-label">{project.category}</span>
          </div>
          <h3 className="font-grotesk text-2xl sm:text-3xl font-bold mb-6">{project.name}</h3>

          <div className="space-y-5">
            {sections.map((s) => (
              <div key={s.label}>
                <div className="micro-label lime-text mb-1.5">{s.label}</div>
                <p className="text-sm text-[var(--soft)] leading-relaxed">{s.value}</p>
              </div>
            ))}

            <div>
              <div className="micro-label lime-text mb-2">Features</div>
              <ul className="grid sm:grid-cols-2 gap-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[var(--soft)]">
                    <Check size={14} className="lime-text mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="micro-label lime-text mb-2">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1.5 rounded-md border border-white/10 text-[var(--soft)] bg-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary" data-cursor="OPEN">
                Live Demo <ExternalLink size={15} />
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost" data-cursor="OPEN">
                <Github size={15} /> Repository
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative section-pad py-24 sm:py-32">
      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel num="04">Selected Projects</SectionLabel>
          <SectionHeading>
            Experiments, products and <span className="lime-text">digital experiences</span> I've built.
          </SectionHeading>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const isComingSoon = project.status === 'coming-soon';
            return (
            <Reveal key={project.num} delay={i * 0.05}>
              <motion.button
                onClick={() => !isComingSoon && setSelected(project)}
                data-cursor={isComingSoon ? '' : 'VIEW PROJECT'}
                whileHover={{ y: -6 }}
                className="group relative w-full text-left"
              >
                {/* hover glow border */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[var(--lime)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <div className="relative carbon-panel overflow-hidden">
                  {/* Visual preview */}
                  <div className="relative h-44 sm:h-52 overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProjectVisual project={project} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-grotesk text-xs font-bold lime-text">{project.num}</span>
                      <span className="micro-label">{project.category}</span>
                    </div>

                    <h3 className="font-grotesk text-xl font-bold mb-2 group-hover:lime-text transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[var(--soft)] leading-relaxed line-clamp-2">{project.short}</p>

                    {/* Tech chips */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-1 rounded border border-white/8 text-[var(--dark-grey)]">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-[10px] px-2 py-1 rounded text-[var(--dark-grey)]">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider lime-text">
                      {isComingSoon ? (
                        <span className="text-[var(--soft)]">In Development</span>
                      ) : (
                        <>
                          View Case Study
                          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            </Reveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
