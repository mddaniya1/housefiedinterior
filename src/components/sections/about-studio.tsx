import { ArrowUpRight } from "lucide-react";
import { IMAGES } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { ImageReveal, Reveal } from "@/components/motion/reveal";

/** About the studio — large image, editorial column, CTA. */
export function AboutStudio() {
  return (
    <section id="about" className="px-4 py-20 lg:px-8 lg:py-28" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <ImageReveal className="overflow-hidden rounded-[2rem] lg:col-span-6">
          <img
            src={IMAGES.aboutStudio}
            alt="Arched doorway with linen drapes and an oak bench inside the studio"
            width={1200}
            height={1400}
            loading="lazy"
            className="h-[440px] w-full object-cover lg:h-[620px]"
          />
        </ImageReveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow">Elegance · Timeless</p>
            <h2 id="about-heading" className="display-lg mt-6 max-w-[16ch]">
              A studio built on restraint
            </h2>
            <p className="mt-8 max-w-prose text-base leading-relaxed text-muted-foreground">
              Founded in Lisbon in 2010, our atelier of twelve designers and makers works on a
              deliberately small number of commissions each year. We begin with the light, draw the
              joinery ourselves, and stay on site until the last hinge is right.
            </p>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
              The result is interiors that feel collected over decades — warm, quiet and entirely
              yours.
            </p>
            <Button asChild size="lg" className="mt-10 rounded-full px-7">
              <a href="#services">
                About the atelier
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
