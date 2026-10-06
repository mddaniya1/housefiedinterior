import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PROJECTS } from "@/constants/site";
import { PageHero } from "@/components/sections/page-hero";
import { WhatsAppButton } from "@/components/sections/whatsapp-button";
import { Reveal } from "@/components/motion/reveal";

export const Route = createFileRoute("/projects/$category/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug && p.categorySlug === params.category);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    const title = `${p.name} — HOUSEFIED Projects`;
    const url = `https://housefiedinterior.lovable.app/projects/${params.category}/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();
  return (
    <main>
      <PageHero eyebrow={project.category} title={project.name} image={project.image} />
      <section className="px-4 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Link to="/projects/$category" params={{ category: project.categorySlug }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> All {project.category.toLowerCase()}
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <dl className="grid grid-cols-2 gap-6 text-sm">
                <div><dt className="text-muted-foreground">Location</dt><dd className="mt-1">{project.location}</dd></div>
                <div><dt className="text-muted-foreground">Year</dt><dd className="mt-1">{project.year}</dd></div>
              </dl>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">{project.description}</p>
              <WhatsAppButton className="mt-10" />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {project.gallery.map((img, i) => (
                <Reveal key={i} delay={i * 0.06} className={i === 0 ? "overflow-hidden rounded-[2rem] sm:col-span-2" : "overflow-hidden rounded-[2rem]"}>
                  <img src={img} alt={`${project.name} photo ${i + 1}`} loading="lazy" className={i === 0 ? "h-96 w-full object-cover" : "h-72 w-full object-cover"} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
