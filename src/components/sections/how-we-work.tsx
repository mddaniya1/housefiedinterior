import { PROCESS_STEPS } from "@/constants/site";
import { Reveal } from "@/components/motion/reveal";

/** Five-step process overview. */
export function HowWeWork() {
  return (
    <section className="px-4 py-20 lg:px-8 lg:py-28" aria-labelledby="process-heading">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Our process</p>
          <h2 id="process-heading" className="display-lg mt-6">How We Work</h2>
        </Reveal>
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.06}>
              <article className="h-full rounded-[2rem] bg-card p-8 shadow-soft">
                <span className="grid size-12 place-items-center rounded-full bg-sand font-display text-sand-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 font-display text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
