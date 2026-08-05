/*
# API Keys Table (server-side only)

1. New Tables
- `api_keys`: stores API keys for edge functions to read server-side
  - `key_name` (text, primary key) — identifier
  - `key_value` (text) — the actual key
  - `created_at` (timestamptz)
2. Security
- RLS enabled.
- NO policies for anon or authenticated — the table is locked down.
- Only the service role (used by edge functions) can read/write.
*/

CREATE TABLE IF NOT EXISTS api_keys (
  key_name text PRIMARY KEY,
  key_value text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- No policies: only service role can access (bypasses RLS)
