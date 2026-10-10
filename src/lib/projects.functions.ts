import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { toProject, type ProjectRow } from "@/lib/projects";

/** Server-only publishable client for public reads (no session). */
export function publicSupabase() {
  const url = process.env['SUPABASE_URL']!;
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicSupabase()
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as ProjectRow[]).map(toProject);
});

export const projectsQuery = () =>
  queryOptions({ queryKey: ["projects"], queryFn: () => listProjects(), staleTime: 60_000 });
