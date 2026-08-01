import { createFileRoute } from "@tanstack/react-router";

const urls = ["/", "/#about", "/#projects", "/#services", "/#contact"];

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
