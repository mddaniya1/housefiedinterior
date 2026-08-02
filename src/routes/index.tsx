import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BRAND, FAQS } from "@/constants/site";
import { SiteNav } from "@/components/sections/site-nav";
import { Hero } from "@/components/sections/hero";
import { FeaturedDesign } from "@/components/sections/featured-design";
import { Stats } from "@/components/sections/stats";
import { AboutStudio } from "@/components/sections/about-studio";
import { Collection } from "@/components/sections/collection";
import { Services } from "@/components/sections/services";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";
import { SiteFooter } from "@/components/sections/site-footer";
import { EASE } from "@/components/motion/reveal";

const TITLE = `${BRAND.name} — Luxury Interior Design Studio in Lisbon`;
const DESCRIPTION =
  "Lumen & Oak is a Lisbon interior design atelier creating calm, light-led homes: residential interiors, architectural styling and bespoke furniture.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const STRUCTURED_DATA = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "/#studio",
      name: BRAND.name,
      description: BRAND.description,
      telephone: BRAND.phone,
      email: BRAND.email,
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: BRAND.address.street,
        addressLocality: BRAND.address.city,
        addressRegion: BRAND.address.region,
        postalCode: BRAND.address.postalCode,
        addressCountry: BRAND.address.country,
      },
      openingHours: "Mo-Fr 09:00-18:00",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "/#projects" },
        { "@type": "ListItem", position: 3, name: "Services", item: "/#services" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
});

/** Quiet luxury loading curtain shown briefly on first paint. */
function LoadingCurtain() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-display text-xl tracking-tight"
          >
            {BRAND.name}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }}
      />
      <LoadingCurtain />
      <SiteNav />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      >
        <Hero />
        <FeaturedDesign />
        <Stats />
        <AboutStudio />
        <Collection />
        <Services />
        <ProjectShowcase />
        <Testimonials />
        <Faq />
        <ContactCta />
      </motion.main>
      <SiteFooter />
    </div>
  );
}
