import { BRAND, FOOTER_LINKS, LOGO } from "@/constants/site";

/** Premium footer with link columns and oversized wordmark. */
export function SiteFooter() {
  return (
    <footer className="px-4 pb-8 lg:px-8">
      <div className="mx-auto max-w-[1400px] rounded-[2.5rem] bg-ink px-6 py-14 text-ink-foreground lg:px-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {FOOTER_LINKS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-sm font-medium">{column.heading}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#home"
                      className="text-sm text-ink-foreground/60 transition-colors hover:text-ink-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <address className="not-italic">
            <h2 className="text-sm font-medium">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-ink-foreground/60">
              <li>
                {BRAND.address.street}, {BRAND.address.city}
              </li>
              <li>
                <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:text-ink-foreground">
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="hover:text-ink-foreground">
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-[oklch(1_0_0_/_0.12)] pt-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="text-xs text-ink-foreground/50">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="font-display text-4xl font-semibold tracking-tight lg:text-6xl">
            {BRAND.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
