import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/constants/site";
import { Reveal } from "@/components/motion/reveal";

/** Client testimonials with initials avatars and ratings. */
export function Testimonials() {
  return (
    <section className="px-4 py-20 lg:px-8 lg:py-28" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Clients</p>
          <h2 id="testimonials-heading" className="display-lg mt-6">
            In their words
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <Reveal as="li" key={item.name} delay={index * 0.08}>
              <figure className="flex h-full flex-col justify-between rounded-[2rem] bg-card p-8 shadow-soft lg:p-10">
                <div>
                  <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} aria-hidden="true" className="size-4 fill-clay text-clay" />
                    ))}
                  </div>
                  <blockquote className="mt-6 font-display text-xl leading-snug">
                    “{item.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-11 place-items-center rounded-full bg-sand font-display text-sm text-sand-foreground"
                  >
                    {item.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{item.name}</span>
                    <span className="block text-xs text-muted-foreground">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
