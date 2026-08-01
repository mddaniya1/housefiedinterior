import { ArrowUpRight } from "lucide-react";
import { COLLECTION } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Masonry-style collection grid with mixed card heights and hover lift. */
export function Collection() {
  return (
    <section className="px-4 py-20 lg:px-8 lg:py-28" aria-labelledby="collection-heading">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="collection-heading" className="display-lg max-w-[18ch]">
            Explore our proudly curated collection
          </h2>
          <div className="max-w-md lg:text-right">
            <p className="text-sm leading-relaxed text-muted-foreground">
              A selection of recent interiors across Portugal — private homes, quiet hotels and
              retail spaces shaped by natural material and long light.
            </p>
            <Button asChild size="lg" className="mt-6 rounded-full px-6">
              <a href="#projects">View more</a>
            </Button>
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTION.map((item, index) => (
            <Reveal as="li" key={item.name} delay={index * 0.08}>
              <article
                className={cn(
                  "group relative h-full overflow-hidden rounded-[2rem] bg-secondary",
                  item.span === "tall" ? "aspect-[4/5]" : "aspect-[4/3]",
                )}
              >
                <img
                  src={item.image}
                  alt={`${item.name} interior in ${item.place}`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.2_0.02_60_/_0.55),transparent_55%)]"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg text-ink-foreground">{item.name}</h3>
                    <p className="text-xs text-ink-foreground/70">{item.place}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-card text-card-foreground transition-transform duration-500 group-hover:-translate-y-1"
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
