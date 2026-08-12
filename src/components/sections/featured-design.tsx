import { ArrowUpRight } from "lucide-react";
import { IMAGES } from "@/constants/site";
import { ImageReveal, Reveal } from "@/components/motion/reveal";

/** Editorial split: large image left, small floating cards right (mirrors reference layout). */
export function FeaturedDesign() {
  return (
    <section className="px-4 py-20 lg:px-8 lg:py-28" aria-labelledby="featured-heading">
      <div className="mx-auto grid max-w-[1400px] gap-4 lg:grid-cols-12 lg:items-stretch">
        <ImageReveal className="relative overflow-hidden rounded-[2rem] lg:col-span-7">
          <img
            src={IMAGES.featureLounge}
            alt="Cream sectional sofa and walnut table in a garden-facing lounge"
            width={1280}
            height={960}
            loading="lazy"
            className="h-[420px] w-full object-cover lg:h-[600px]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.02_60_/_0.6)] via-[oklch(0.18_0.02_60_/_0.12)] to-transparent"
          />
          <div className="absolute inset-x-6 bottom-6 lg:inset-x-10 lg:bottom-10">
            <span className="inline-flex rounded-full bg-card px-4 py-1.5 text-xs text-card-foreground shadow-soft">
              Signature interior
            </span>
            <h2
              id="featured-heading"
              className="display-lg mt-5 max-w-[12ch] text-ink-foreground"
            >
              Modern Minimalist
            </h2>
          </div>
        </ImageReveal>

        <div className="grid gap-4 lg:col-span-5 lg:grid-rows-2">
          <Reveal
            delay={0.1}
            className="flex flex-col justify-between rounded-[2rem] bg-secondary p-8 lg:p-10"
          >
            <span className="inline-flex w-fit rounded-full border border-border bg-card px-4 py-1.5 text-xs text-card-foreground">
              Aesthetic
            </span>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              A palette drawn from plaster, oak and raw linen. Every piece is chosen for how it ages
              rather than how it photographs.
            </p>
            <h3 className="display-md mt-6 max-w-[16ch]">Into a gallery of elegance</h3>
          </Reveal>

          <Reveal delay={0.2} className="relative min-h-64 overflow-hidden rounded-[2rem]">
            <img
              src={IMAGES.detailChair}
              alt="Woven rattan lounge chair on a travertine terrace"
              width={900}
              height={1100}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.02_60_/_0.72)] via-[oklch(0.18_0.02_60_/_0.32)] to-[oklch(0.18_0.02_60_/_0.1)]"
              aria-hidden="true"
            />
            <div className="absolute inset-x-6 top-6 lg:inset-x-8 lg:top-8">
              <span className="inline-flex rounded-full bg-card px-4 py-1.5 text-xs text-card-foreground">
                Bespoke furniture
              </span>
              <p className="mt-4 max-w-[18ch] font-display text-lg text-ink-foreground drop-shadow-[0_2px_14px_oklch(0.2_0_0_/_0.5)]">
                Made for the slow hours of everyday living
              </p>
            </div>

            <a
              href="#projects"
              aria-label="View bespoke furniture projects"
              className="absolute bottom-6 right-6 grid size-11 place-items-center rounded-full bg-card text-card-foreground transition-transform hover:scale-105 lg:bottom-8 lg:right-8"
            >
              <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>

  );
}
