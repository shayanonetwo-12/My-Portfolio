import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GITHUB_USERNAME = "shayanonetwo-12";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch all public repos (paginate up to 100 per page, 3 pages)
    const allRepos: any[] = [];
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated&type=owner`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "portfolio-sync",
          },
        }
      );
      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`);
      }
      const repos = await res.json();
      if (!Array.isArray(repos) || repos.length === 0) break;
      allRepos.push(...repos);
    }

    // Filter out forks — only show original repos
    const ownRepos = allRepos.filter((r) => !r.fork);

    const rows = ownRepos.map((r) => ({
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      description: r.description,
      html_url: r.html_url,
      homepage: r.homepage,
      language: r.language,
      topics: r.topics || [],
      stargazers_count: r.stargazers_count || 0,
      forks_count: r.forks_count || 0,
      updated_at_github: r.updated_at ? new Date(r.updated_at).toISOString() : null,
      synced_at: new Date().toISOString(),
    }));

    // Upsert all repos
    if (rows.length > 0) {
      const { error } = await supabase
        .from("github_repos")
        .upsert(rows, { onConflict: "id" });
      if (error) throw error;
    }

    // Remove repos that no longer exist on GitHub (deleted or made private)
    const currentIds = rows.map((r) => r.id);
    if (currentIds.length > 0) {
      await supabase
        .from("github_repos")
        .delete()
        .not("id", "in", `(${currentIds.join(",")})`);
    }

    return new Response(
      JSON.stringify({ synced: rows.length, repos: rows.map((r) => r.name) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
