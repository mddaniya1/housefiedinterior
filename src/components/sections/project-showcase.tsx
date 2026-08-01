import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from "@/constants/site";
import { Reveal, EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Filterable portfolio grid. */
export function ProjectShowcase() {
  const [active, setActive] = useState<ProjectCategory>("All");
  const visible = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section
      id="projects"
      className="px-4 py-20 lg:px-8 lg:py-28"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="projects-heading" className="display-lg mt-6 max-w-[16ch]">
              Project showcase
            </h2>
          </div>

          <div role="tablist" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active === category}
                onClick={() => setActive(category)}
                className={cn(
                  "min-h-11 rounded-full border px-5 text-sm transition-colors",
                  active === category
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.li
                key={project.name}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <article className="group overflow-hidden rounded-[2rem] bg-card shadow-soft transition-shadow duration-500 hover:shadow-lift">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.name} — ${project.category} interior, ${project.year}`}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-6">
                    <div>
                      <h3 className="font-display text-lg">{project.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {project.category} · {project.year}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-transform duration-500 group-hover:-translate-y-1"
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
