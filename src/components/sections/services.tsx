import { Armchair, Compass, Frame, HardHat, MessageSquare, Ruler } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICES } from "@/constants/site";
import { Reveal } from "@/components/motion/reveal";

const ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  ruler: Ruler,
  armchair: Armchair,
  frame: Frame,
  hardhat: HardHat,
  message: MessageSquare,
};

/** Premium service cards with minimal line icons. */
export function Services() {
  return (
    <section
      id="services"
      className="px-4 py-20 lg:px-8 lg:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What we do</p>
          <h2 id="services-heading" className="display-lg mt-6">
            Services
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon] ?? Compass;
            return (
              <Reveal as="li" key={service.title} delay={index * 0.06}>
                <article className="group h-full rounded-[2rem] bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift lg:p-10">
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-full bg-sand text-sand-foreground"
                  >
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-8 font-display text-xl">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
