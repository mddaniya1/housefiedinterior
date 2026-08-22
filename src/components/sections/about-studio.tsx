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
            alt="Warm, minimal Karachi interior with custom joinery by HOUSEFIED"
            width={1200}
            height={1400}
            loading="lazy"
            className="h-[440px] w-full object-cover lg:h-[620px]"
          />
        </ImageReveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow">Elegance · Timeless · Karachi</p>
            <h2 id="about-heading" className="display-lg mt-6 max-w-[16ch]">
              A studio built on execution
            </h2>
            <p className="mt-8 max-w-prose text-base leading-relaxed text-muted-foreground">
              Led by Hamza from our Bahadurabad office, HOUSEFIED designs and executes elite
              residential and commercial interiors across Karachi. We draw the joinery ourselves,
              direct every trade on site, and stay until the last hinge closes correctly.
            </p>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
              With 50+ completed homes and a perfect 5.0 Google rating, our work is judged on one
              thing: whether the finished space feels like a living paradise.
            </p>
            <Button asChild size="lg" className="mt-10 rounded-full px-7">
              <a href="#services">
                Explore our services
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
