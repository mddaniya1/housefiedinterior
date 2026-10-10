import { createFileRoute } from "@tanstack/react-router";
import { publicSupabase } from "@/lib/projects.functions";

// Serves images from the project-images bucket (bucket is private; public read via RLS policy).
export const Route = createFileRoute("/api/public/project-images/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat ?? "";
        if (!path || path.includes("..")) return new Response("Not found", { status: 404 });
        const { data, error } = await publicSupabase().storage.from("project-images").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(data, {
          headers: {
            "Content-Type": data.type || "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
