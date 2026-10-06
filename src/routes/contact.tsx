import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { BRAND, IMAGES } from "@/constants/site";
import { PageHero } from "@/components/sections/page-hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { Reveal } from "@/components/motion/reveal";

const TITLE = "Contact Us — HOUSEFIED Karachi";
const DESC = "Visit HOUSEFIED in Bahadurabad, Karachi, call or WhatsApp +92 339 4122544, or book a free consultation.";
const URL = "https://housefiedinterior.lovable.app/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main>
      <PageHero eyebrow="Contact us" title="Let's talk about your home" image={IMAGES.contactDark} />
      <section className="px-4 pt-20 lg:px-8 lg:pt-28">
        <div className="mx-auto grid max-w-[1400px] gap-4 lg:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-card p-8 shadow-soft lg:p-12">
            <p className="eyebrow">Visit the studio</p>
            <ul className="mt-6 space-y-4 text-base text-muted-foreground">
              <li>{BRAND.address.street}, {BRAND.address.city}</li>
              <li>WhatsApp / Phone: <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="text-foreground hover:underline">{BRAND.phone}</a></li>
              <li>Email: <a href={`mailto:${BRAND.email}`} className="text-foreground hover:underline">{BRAND.email}</a></li>
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="grid min-h-72 place-items-center rounded-[2rem] bg-sand text-sand-foreground">
            <div className="text-center">
              <MapPin className="mx-auto size-8" strokeWidth={1.5} />
              <p className="mt-3 text-sm">Map coming soon — Bahadurabad, Karachi</p>
            </div>
          </Reveal>
        </div>
      </section>
      <ContactCta />
    </main>
  );
}
