import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, PROJECT_GROUPS } from "@/constants/site";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";

export const Route = createFileRoute("/projects/$category/")({
  loader: ({ params }) => {
    const group = PROJECT_GROUPS.find((g) => g.slug === params.category);
    if (!group) throw notFound();
    return { group, projects: PROJECTS.filter((p) => p.categorySlug === group.slug) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.group.label} Projects — HOUSEFIED Karachi`;
    const desc = `Selected ${loaderData.group.label.toLowerCase()} projects designed and executed by HOUSEFIED in Karachi.`;
    const url = `https://housefiedinterior.lovable.app/projects/${params.category}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ProjectCategoryPage,
});

function ProjectCategoryPage() {
  const { group, projects } = Route.useLoaderData();
  return (
    <main>
      <PageHero eyebrow="Projects" title={group.label} image={projects[0]?.image ?? ""} />
      <section className="px-4 py-20 lg:px-8 lg:py-28">
        <ul className="mx-auto grid max-w-[1400px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.06}>
              <Link to="/projects/$category/$slug" params={{ category: group.slug, slug: project.slug }} className="block">
                <article className="group overflow-hidden rounded-[2rem] bg-card shadow-soft transition-shadow duration-500 hover:shadow-lift">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={project.image} alt={project.name} loading="lazy" className="size-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]" />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-6">
                    <div>
                      <h2 className="font-display text-lg">{project.name}</h2>
                      <p className="mt-1 text-xs text-muted-foreground">{project.location} · {project.year}</p>
                    </div>
                    <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-transform duration-500 group-hover:-translate-y-1">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </main>
  );
}
