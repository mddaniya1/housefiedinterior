import { createFileRoute } from "@tanstack/react-router";
import { IMAGES, STANDARDS } from "@/constants/site";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";

const TITLE = "Our Standards — HOUSEFIED Karachi";
const DESC = "Imported hardware, precise joinery, quality materials, on-site supervision and a clean handover on every HOUSEFIED project.";
const URL = "https://housefiedinterior.lovable.app/our-standards";

export const Route = createFileRoute("/our-standards")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: StandardsPage,
});

function StandardsPage() {
  return (
    <main>
      <PageHero eyebrow="Our standards" title="Quality you can feel in every detail" image={IMAGES.detailChair} />
      <section className="px-4 py-20 lg:px-8 lg:py-28">
        <ul className="mx-auto grid max-w-[1400px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06}>
              <article className="h-full rounded-[2rem] bg-card p-8 shadow-soft lg:p-10">
                <span className="grid size-12 place-items-center rounded-full bg-sand font-display text-sand-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-8 font-display text-xl">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>
    </main>
  );
}
