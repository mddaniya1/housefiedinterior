import { createFileRoute } from "@tanstack/react-router";

import { CORE_AREAS, PROJECTS, PROJECT_GROUPS } from "@/constants/site";

const BASE = "https://housefiedinterior.lovable.app";
const urls = [
  "/", "/who-we-are", "/our-standards", "/contact",
  ...CORE_AREAS.map((c) => `/core-areas/${c.slug}`),
  ...PROJECT_GROUPS.map((g) => `/projects/${g.slug}`),
  ...PROJECTS.map((p) => `/projects/${p.categorySlug}/${p.slug}`),
].map((u) => BASE + u);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>`;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(xml, {
          headers: { "Content-Type": "application/xml" },
        }),
    },
  },
});
