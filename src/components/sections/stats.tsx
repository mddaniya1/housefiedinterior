import { STATS } from "@/constants/site";
import { useCountUp } from "@/hooks/use-count-up";
import { Reveal } from "@/components/motion/reveal";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div>
      <p className="font-display text-4xl font-semibold tracking-tight lg:text-5xl">
        <span ref={ref}>{current}</span>
        {suffix}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

/** Animated counters. */
export function Stats() {
  return (
    <section className="px-4 py-10 lg:px-8 lg:py-16" aria-label="Studio in numbers">
      <Reveal className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-12 border-y border-border py-14 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </Reveal>
    </section>
  );
}
