import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, Star, GitFork, RefreshCw, ExternalLink } from 'lucide-react';
import { profile } from '@/data/content';
import { Reveal, SectionLabel, SectionHeading } from './ui/Primitives';
import { supabase } from '@/lib/supabase';

type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at_github: string | null;
  synced_at: string;
};

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days > 30) return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  if (days > 0) return `${days}d ago`;
  const hours = Math.floor(diff / 3600000);
  if (hours > 0) return `${hours}h ago`;
  const mins = Math.floor(diff / 60000);
  return mins > 0 ? `${mins}m ago` : 'just now';
}

export default function GithubSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchRepos = async () => {
    const { data, error } = await supabase
      .from('github_repos')
      .select('*')
      .order('updated_at_github', { ascending: false, nullsFirst: false });

    if (!error && data) {
      // Filter out the profile repo (same name as username)
      setRepos(data.filter((r) => r.name !== profile.githubHandle));
    }
    setLoading(false);
  };

  const syncNow = async () => {
    setSyncing(true);
    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/github-sync`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      await fetchRepos();
    } catch {
      // ignore — will use cached data
    }
    setSyncing(false);
  };

  useEffect(() => {
    fetchRepos();
    // Auto-sync every 5 minutes
    const interval = setInterval(syncNow, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const featured = repos.slice(0, 6);

  return (
    <section className="relative section-pad py-24 sm:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 30% 50%, rgba(182,255,0,0.04), transparent 70%)' }}
      />
      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <SectionLabel num="09">Open Source / My Digital Lab</SectionLabel>
              <SectionHeading>
                Code, experiments and <span className="lime-text">AI products</span> in the open.
              </SectionHeading>
            </div>
            <button
              onClick={syncNow}
              disabled={syncing}
              className="btn-ghost !px-4 !py-2 !text-[11px] disabled:opacity-50"
              data-cursor="OPEN"
            >
              <RefreshCw size={13} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[1fr_1.4fr] gap-6 items-start">
          {/* Profile card */}
          <Reveal>
            <div className="carbon-panel p-6 sm:p-8 relative overflow-hidden">
              <div className="grid-bg absolute inset-0 opacity-20" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl carbon-fiber border border-white/10 flex items-center justify-center">
                    <Github size={26} className="lime-text" />
                  </div>
                  <div>
                    <div className="micro-label mb-1">GitHub</div>
                    <div className="font-grotesk text-lg font-semibold">@{profile.githubHandle}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="carbon-fiber rounded-lg border border-white/10 p-3 text-center">
                    <div className="font-grotesk text-2xl font-bold lime-text">{repos.length}</div>
                    <div className="micro-label mt-1">Repositories</div>
                  </div>
                  <div className="carbon-fiber rounded-lg border border-white/10 p-3 text-center">
                    <div className="font-grotesk text-2xl font-bold lime-text">
                      {repos.reduce((sum, r) => sum + r.stargazers_count, 0)}
                    </div>
                    <div className="micro-label mt-1">Total Stars</div>
                  </div>
                </div>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                  data-cursor="OPEN"
                >
                  Explore My GitHub <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Repo cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {loading ? (
              [0, 1, 2, 3].map((i) => (
                <div key={i} className="carbon-panel p-5 h-40 animate-pulse">
                  <div className="h-3 w-1/3 bg-white/5 rounded mb-3" />
                  <div className="h-2 w-full bg-white/5 rounded mb-2" />
                  <div className="h-2 w-2/3 bg-white/5 rounded" />
                </div>
              ))
            ) : featured.length === 0 ? (
              <div className="carbon-panel p-6 text-center text-[var(--soft)] text-sm col-span-2">
                No public repositories found.
              </div>
            ) : (
              featured.map((repo, i) => (
                <Reveal key={repo.id} delay={i * 0.06}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="OPEN"
                    className="group block carbon-panel p-5 h-full hover:border-[var(--lime)]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Github size={16} className="text-[var(--soft)] group-hover:lime-text transition-colors" />
                      <div className="flex items-center gap-2">
                        {repo.homepage && (
                          <span className="text-[10px] text-[var(--lime)] flex items-center gap-0.5">
                            <ExternalLink size={10} /> Live
                          </span>
                        )}
                        <ArrowUpRight size={15} className="text-[var(--dark-grey)] group-hover:lime-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold mb-1 group-hover:lime-text transition-colors truncate">
                      {repo.name}
                    </h3>
                    <p className="text-xs text-[var(--soft)] line-clamp-2 mb-3 min-h-[2rem]">
                      {repo.description || 'No description available.'}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-[var(--dark-grey)]">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[var(--lime)]" />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star size={11} /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={11} /> {repo.forks_count}
                      </span>
                      <span className="ml-auto">{timeAgo(repo.updated_at_github)}</span>
                    </div>
                  </a>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
