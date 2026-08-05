import { useState } from 'react';
import { Mail, MapPin, ArrowUpRight, Send, Check, Linkedin, Github, Instagram, AlertCircle } from 'lucide-react';
import { profile, socials } from '@/data/content';
import { Reveal, SectionLabel } from './ui/Primitives';

import type { LucideIcon } from 'lucide-react';

const socialIcons: Record<string, LucideIcon> = {
  Linkedin,
  Github,
  Instagram,
};

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgawwvqa';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.subject.trim()) e.subject = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _subject: form.subject,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 3500);
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      console.error('Formspree error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <>
      {/* SOCIAL SECTION */}
      <section className="relative section-pad py-20 sm:py-24">
        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel num="10">Connect With Me</SectionLabel>
          </Reveal>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {socials.map((s, i) => {
              const Icon = socialIcons[s.icon];
              return (
                <Reveal key={s.name} delay={i * 0.08}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="OPEN"
                    className="group relative block carbon-panel p-6 h-full overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-lg carbon-fiber border border-white/10 flex items-center justify-center group-hover:border-[var(--lime)]/40 transition-colors">
                        {Icon && <Icon size={20} className="lime-text" />}
                      </div>
                      <ArrowUpRight size={18} className="text-[var(--dark-grey)] group-hover:lime-text group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <h3 className="font-grotesk text-base font-semibold mb-1 group-hover:lime-text transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-xs text-[var(--soft)]">{s.desc}</p>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative section-pad py-24 sm:py-32 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(182,255,0,0.06), transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel num="11">Contact</SectionLabel>
            <h2 className="font-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Let's build something
              <br />
              <span className="lime-text text-glow">intelligent.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[var(--soft)] text-base sm:text-lg">
              Have an idea, project, collaboration or opportunity? Let's turn it into a real digital product.
            </p>
          </Reveal>

          <div className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            {/* Contact info */}
            <Reveal>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                  { icon: MapPin, label: 'Location', value: profile.location, href: null },
                ].map((item) => (
                  <div key={item.label} className="carbon-panel p-4 flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg carbon-fiber border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[var(--lime)]/40 transition-colors">
                      <item.icon size={17} className="lime-text" />
                    </div>
                    <div className="min-w-0">
                      <div className="micro-label mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium link-underline truncate block" data-cursor="OPEN">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm font-medium truncate">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex gap-3 pt-2">
                  <a href={`mailto:${profile.email}`} className="btn-primary !flex-1" data-cursor="OPEN">
                    <Mail size={15} /> Email Me
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost !flex-1" data-cursor="OPEN">
                    <Linkedin size={15} /> LinkedIn
                  </a>
                </div>
                <div className="flex gap-3">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !flex-1" data-cursor="OPEN">
                    <Github size={15} /> GitHub
                  </a>
                  <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost !flex-1" data-cursor="OPEN">
                    <Instagram size={15} /> Instagram
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={0.1}>
              <form onSubmit={handleSubmit} className="carbon-panel p-6 sm:p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="micro-label block mb-2">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[var(--carbon-2)] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--lime)]/50 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="micro-label block mb-2">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[var(--carbon-2)] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--lime)]/50 focus:outline-none transition-colors"
                      placeholder="you@email.com"
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="micro-label block mb-2">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[var(--carbon-2)] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--lime)]/50 focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                  {errors.subject && <p className="text-[11px] text-red-400 mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <label className="micro-label block mb-2">Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[var(--carbon-2)] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[var(--lime)]/50 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your idea or opportunity..."
                  />
                  {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  className="btn-primary w-full disabled:opacity-70"
                  data-cursor="OPEN"
                >
                  {status === 'idle' && (<><Send size={15} /> Send Message</>)}
                  {status === 'sending' && (<>Sending...</>)}
                  {status === 'sent' && (<><Check size={15} /> Message Sent</>)}
                  {status === 'error' && (<><AlertCircle size={15} /> Failed — try again</>)}
                </button>
                <p className="text-[11px] text-[var(--dark-grey)] text-center">
                  Your message goes straight to my inbox.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
