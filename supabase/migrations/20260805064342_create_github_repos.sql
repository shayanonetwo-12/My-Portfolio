/*
# GitHub Repos Cache Table

1. New Tables
- `github_repos`: caches public repository data fetched from the GitHub API
  - `id` (int, primary key) — GitHub repo ID
  - `name` (text) — repository name
  - `full_name` (text) — owner/repo
  - `description` (text, nullable)
  - `html_url` (text) — link to repo on GitHub
  - `homepage` (text, nullable) — live site URL
  - `language` (text, nullable) — primary language
  - `topics` (text[]) — repo topics
  - `stargazers_count` (int) — star count
  - `forks_count` (int) — fork count
  - `updated_at_github` (timestamptz) — last updated on GitHub
  - `synced_at` (timestamptz) — when we last synced
2. Security
- RLS enabled.
- Public read (anon + authenticated) so the portfolio frontend can display repos.
- No insert/update/delete for anon — only the service role (edge function) writes.
*/

CREATE TABLE IF NOT EXISTS github_repos (
  id int PRIMARY KEY,
  name text NOT NULL,
  full_name text NOT NULL,
  description text,
  html_url text NOT NULL,
  homepage text,
  language text,
  topics text[] DEFAULT '{}',
  stargazers_count int NOT NULL DEFAULT 0,
  forks_count int NOT NULL DEFAULT 0,
  updated_at_github timestamptz,
  synced_at timestamptz DEFAULT now()
);

ALTER TABLE github_repos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_repos" ON github_repos;
CREATE POLICY "anon_read_repos" ON github_repos FOR SELECT
  TO anon, authenticated USING (true);
