import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { BRAND, CORE_AREAS, LOGO, PROJECT_GROUPS, WHATSAPP_BOOKING_URL } from "@/constants/site";
import { openWhatsAppBooking } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubLink = { label: string; to: string; params: Record<string, string> };

const CORE_LINKS: SubLink[] = CORE_AREAS.map((c) => ({
  label: c.title,
  to: "/core-areas/$slug",
  params: { slug: c.slug },
}));
const PROJECT_LINKS: SubLink[] = PROJECT_GROUPS.map((g) => ({
  label: g.label,
  to: "/projects/$category",
  params: { category: g.slug },
}));

const linkCls = "text-sm text-muted-foreground transition-colors hover:text-foreground";

function DesktopDropdown({ label, items }: { label: string; items: SubLink[] }) {
  return (
    <div className="group relative">
      <button type="button" className={cn(linkCls, "inline-flex items-center gap-1 py-2")} aria-haspopup="true">
        {label}
        <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="min-w-60 rounded-2xl border border-border bg-card p-2 shadow-lift">
          {items.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                params={item.params}
                className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileGroup({ label, items, onNavigate }: { label: string; items: SubLink[]; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3 font-display text-2xl text-foreground"
      >
        {label}
        <ChevronDown className={cn("size-5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul className="mb-2 flex flex-col border-l border-border pl-4">
          {items.map((item) => (
            <li key={item.label}>
              <Link to={item.to} params={item.params} onClick={onNavigate} className="block py-2 text-base text-muted-foreground">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/** Sticky, transparent-to-frosted navigation with dropdowns. */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/85 backdrop-blur-xl py-2" : "bg-transparent py-3",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex shrink-0 items-center" aria-label={`${BRAND.name} — home`}>
          <img
            src={LOGO.src}
            alt={LOGO.alt}
            width={LOGO.width}
            height={LOGO.height}
            className="h-16 w-auto object-contain transition-opacity duration-300 hover:opacity-80 lg:h-24"
            loading="eager"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          <Link to="/" className={linkCls} activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>Home</Link>
          <Link to="/who-we-are" className={linkCls} activeProps={{ className: "text-foreground" }}>Who We Are</Link>
          <Link to="/our-standards" className={linkCls} activeProps={{ className: "text-foreground" }}>Our Standards</Link>
          <DesktopDropdown label="Core Areas" items={CORE_LINKS} />
          <DesktopDropdown label="Projects" items={PROJECT_LINKS} />
          <Link to="/contact" className={linkCls} activeProps={{ className: "text-foreground" }}>Contact Us</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="lg"
            className="hidden rounded-full bg-black px-6 text-white hover:bg-white hover:text-black lg:inline-flex"
          >
            <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={openWhatsAppBooking}>
              Book a Free Consultation
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100vh-5rem)] overflow-y-auto bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto flex max-w-[1400px] flex-col gap-1 px-6 py-6">
              <li><Link to="/" onClick={close} className="block py-3 font-display text-2xl text-foreground">Home</Link></li>
              <li><Link to="/who-we-are" onClick={close} className="block py-3 font-display text-2xl text-foreground">Who We Are</Link></li>
              <li><Link to="/our-standards" onClick={close} className="block py-3 font-display text-2xl text-foreground">Our Standards</Link></li>
              <MobileGroup label="Core Areas" items={CORE_LINKS} onNavigate={close} />
              <MobileGroup label="Projects" items={PROJECT_LINKS} onNavigate={close} />
              <li><Link to="/contact" onClick={close} className="block py-3 font-display text-2xl text-foreground">Contact Us</Link></li>
              <li className="pt-4">
                <Button asChild size="lg" className="w-full rounded-full bg-black text-white hover:bg-white hover:text-black">
                  <a
                    href={WHATSAPP_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      openWhatsAppBooking(e);
                      close();
                    }}
                  >
                    Book a Free Consultation
                  </a>
                </Button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
