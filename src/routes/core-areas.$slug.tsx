import { createFileRoute, notFound } from "@tanstack/react-router";
import { CORE_AREAS } from "@/constants/site";
import { PageHero } from "@/components/sections/page-hero";
import { WhatsAppButton } from "@/components/sections/whatsapp-button";
import { Reveal } from "@/components/motion/reveal";

export const Route = createFileRoute("/core-areas/$slug")({
  loader: ({ params }) => {
    const area = CORE_AREAS.find((c) => c.slug === params.slug);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.area.title} — HOUSEFIED Karachi`;
    const url = `https://housefiedinterior.lovable.app/core-areas/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.area.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.area.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CoreAreaPage,
});

function CoreAreaPage() {
  const { area } = Route.useLoaderData();
  return (
    <main>
      <PageHero eyebrow="Core area" title={area.title} description={area.summary} image={area.images[0]} />
      <section className="px-4 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">What we deliver</p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg">{area.body}</p>
            <WhatsAppButton className="mt-10" />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {area.images.slice(1).map((img, i) => (
              <Reveal key={i} delay={i * 0.08} className="overflow-hidden rounded-[2rem]">
                <img src={img} alt={`${area.title} by HOUSEFIED`} loading="lazy" className="h-80 w-full object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
