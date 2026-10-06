import { Reveal, ImageReveal } from "@/components/motion/reveal";

/** Banner used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="px-4 pt-24 lg:px-8 lg:pt-28">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem]">
        <ImageReveal>
          <img src={image} alt="" className="h-[360px] w-full object-cover lg:h-[480px]" />
        </ImageReveal>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-8 text-ink-foreground lg:p-14">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-ink-foreground/80">{eyebrow}</p>
            <h1 className="display-lg mt-4 max-w-[18ch]">{title}</h1>
            {description && (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-foreground/80 lg:text-base">
                {description}
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
