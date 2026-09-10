import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { BRAND, HERO, IMAGES } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/reveal";

/** Full-bleed rounded hero with floating glass card, preview image and rotating seal. */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section id="home" className="px-4 pt-24 lg:px-8 lg:pt-28">
      <div
        ref={ref}
        className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-secondary lg:rounded-[2.5rem]"
      >
        <motion.div style={{ y: imageY }} className="absolute inset-0 -bottom-16">
          <img
            src={IMAGES.heroLiving}
            alt="Elegant contemporary Karachi living room designed and executed by HOUSEFIED"
            width={1920}
            height={1200}
            className="size-full object-cover"
          />
          <div
            className="absolute inset-0 bg-[oklch(0.2_0.02_60_/_0.28)]"
            aria-hidden="true"
          />
        </motion.div>

        <div className="relative flex min-h-[78vh] flex-col justify-between p-6 sm:min-h-[86vh] lg:p-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="eyebrow text-ink-foreground/75"
          >
            {BRAND.tagline} · {BRAND.address.city}
          </motion.p>

          <div className="mt-10">
            <h1 className="display-xl max-w-[18ch] text-ink-foreground">{HERO.heading}</h1>

            <div className="mt-10 grid items-end gap-6 lg:grid-cols-12">
              {/* Floating glass information card */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.35 }}
                className="glass-panel rounded-3xl p-6 lg:col-span-5"
              >
                <p className="text-sm leading-relaxed text-ink-foreground/85">{HERO.description}</p>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="mt-6 rounded-full bg-card px-6 text-card-foreground hover:bg-card/90"
                >
                  <a
                    href="https://wa.me/923394122544?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20consultation%20for%20my%20interior%20design%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {HERO.cta}
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>

              </motion.div>

              {/* Floating project preview */}
              <motion.figure
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.5 }}
                className="hidden overflow-hidden rounded-3xl border border-[oklch(1_0_0_/_0.2)] shadow-glass lg:col-span-4 lg:col-start-7 lg:block"
              >
                <img
                  src={IMAGES.featureLounge}
                  alt="Preview of a modern TV wall and lounge project by HOUSEFIED"
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />
              </motion.figure>

              {/* Decorative rotating seal */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 0.6 }}
                className="hidden lg:col-span-2 lg:col-start-11 lg:flex lg:justify-end"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                  className="grid size-28 place-items-center rounded-full border border-[oklch(1_0_0_/_0.35)]"
                >
                  <span className="font-display text-[0.6rem] tracking-[0.28em] text-ink-foreground/80">
                    TURNKEY · KHI
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
