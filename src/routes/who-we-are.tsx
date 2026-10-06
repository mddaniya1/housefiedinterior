import { createFileRoute } from "@tanstack/react-router";
import { IMAGES } from "@/constants/site";
import { PageHero } from "@/components/sections/page-hero";
import { AboutStudio } from "@/components/sections/about-studio";
import { Reveal } from "@/components/motion/reveal";

const TITLE = "Who We Are — HOUSEFIED, Interior Design in Karachi";
const DESC = "Meet HOUSEFIED, the Karachi interior design and turnkey execution studio led by Hamza.";
const URL = "https://housefiedinterior.lovable.app/who-we-are";

export const Route = createFileRoute("/who-we-are")({
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
  component: WhoWeArePage,
});

function WhoWeArePage() {
  return (
    <main>
      <PageHero eyebrow="Who we are" title="A Karachi studio built on execution" image={IMAGES.aboutStudio} />
      <AboutStudio />
      <section className="px-4 pb-20 lg:px-8 lg:pb-28">
        <Reveal className="mx-auto max-w-[1400px] rounded-[2.5rem] bg-card p-8 shadow-soft lg:p-16">
          <p className="eyebrow">A message from the owner</p>
          <blockquote className="mt-6 max-w-4xl font-display text-2xl leading-snug lg:text-4xl">
            “Every home we take on is personal to me. My promise is simple: we design honestly, build
            precisely and stay on site until your space feels like a living paradise.”
          </blockquote>
          <p className="mt-8 text-sm text-muted-foreground">— Hamza, Founder, HOUSEFIED</p>
        </Reveal>
      </section>
    </main>
  );
}
