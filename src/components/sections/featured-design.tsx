import { ArrowUpRight } from "lucide-react";
import { IMAGES } from "@/constants/site";
import { ImageReveal, Reveal } from "@/components/motion/reveal";

/** Editorial split: large image left, small floating cards right (mirrors reference layout). */
export function FeaturedDesign() {
  return (
    <section className="px-4 py-20 lg:px-8 lg:py-28" aria-labelledby="featured-heading">
      <div className="mx-auto grid max-w-[1400px] gap-4 lg:grid-cols-12">
        <ImageReveal className="relative overflow-hidden rounded-[2rem] lg:col-span-7">
          <img
            src={IMAGES.featureLounge}
            alt="Cream sectional sofa and walnut table in a garden-facing lounge"
            width={1280}
            height={960}
            loading="lazy"
            className="h-[420px] w-full object-cover lg:h-[560px]"
          />
          <div className="absolute inset-x-6 bottom-6 lg:inset-x-10 lg:bottom-10">
            <span className="inline-flex rounded-full bg-card px-4 py-1.5 text-xs text-card-foreground shadow-soft">
              Signature interior
            </span>
            <h2
              id="featured-heading"
              className="display-lg mt-4 max-w-[12ch] text-ink-foreground drop-shadow-[0_2px_18px_oklch(0.2_0_0_/_0.45)]"
            >
              Modern Minimalist
            </h2>
          </div>
        </ImageReveal>

        <div className="grid gap-4 lg:col-span-5">
          <Reveal delay={0.1} className="rounded-[2rem] bg-secondary p-8 lg:p-10">
            <span className="inline-flex rounded-full border border-border bg-card px-4 py-1.5 text-xs text-card-foreground">
              Aesthetic
            </span>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              A palette drawn from plaster, oak and raw linen. Every piece is chosen for how it ages
              rather than how it photographs.
            </p>
            <h3 className="display-md mt-6 max-w-[16ch]">Into a gallery of elegance</h3>
          </Reveal>

          <Reveal delay={0.2} className="relative overflow-hidden rounded-[2rem]">
            <img
              src={IMAGES.detailChair}
              alt="Woven rattan lounge chair on a travertine terrace"
              width={900}
              height={1100}
              loading="lazy"
              className="h-64 w-full object-cover"
            />
            <div className="absolute inset-0 bg-[oklch(0.2_0.02_60_/_0.2)]" aria-hidden="true" />
            <div className="absolute inset-x-6 top-6">
              <span className="inline-flex rounded-full bg-card px-4 py-1.5 text-xs text-card-foreground">
                Bespoke furniture
              </span>
              <p className="mt-4 max-w-[18ch] font-display text-lg text-ink-foreground">
                Made for the slow hours of everyday living
              </p>
            </div>
            <a
              href="#projects"
              aria-label="View bespoke furniture projects"
              className="absolute bottom-6 right-6 grid size-11 place-items-center rounded-full bg-card text-card-foreground transition-transform hover:scale-105"
            >
              <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
