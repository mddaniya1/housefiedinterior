import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { BRAND, IMAGES, SERVICE_OPTIONS } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageReveal, Reveal } from "@/components/motion/reveal";

const consultationSchema = z.object({
  name: z.string().min(2, "Please tell us your name."),
  phone: z
    .string()
    .min(9, "Enter a valid phone number.")
    .regex(/^[+0-9\s()-]+$/, "Digits, spaces and + only."),
  service: z.enum(SERVICE_OPTIONS, { message: "Please choose a service." }),
});

type ConsultationValues = z.infer<typeof consultationSchema>;

/** Dark contact section with large typography, luxury image and lead capture form. */
export function ContactCta() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { name: "", phone: "" },
  });

  const onSubmit = async (values: ConsultationValues) => {
    // No backend yet — acknowledge locally so the form stays honest.
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success("Request received", {
      description: `Thank you, ${values.name}. Our team will call you about your ${values.service.toLowerCase()} project.`,
    });
    reset();
  };

  return (
    <section id="contact" className="px-4 py-10 lg:px-8 lg:py-16" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-ink-foreground lg:px-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-ink-foreground/60">Book a free consultation</p>
              <h2 id="contact-heading" className="display-lg mt-6 max-w-[18ch]">
                Let’s turn your home into a living paradise.
              </h2>
              <p className="mt-8 max-w-prose text-sm leading-relaxed text-ink-foreground/70">
                Share your plan, your space or simply your idea. We take on a limited number of
                turnkey projects at a time so every home receives Hamza’s full attention from
                drawing to handover.
              </p>

              <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="eyebrow text-ink-foreground/50">Office</dt>
                  <dd className="mt-2 text-sm text-ink-foreground/80">
                    {BRAND.address.street}
                    <br />
                    {BRAND.address.city} {BRAND.address.postalCode}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-foreground/50">Contact</dt>
                  <dd className="mt-2 text-sm text-ink-foreground/80">
                    <a
                      href={BRAND.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {BRAND.phone} (WhatsApp)
                    </a>
                    <br />
                    <a href={`mailto:${BRAND.email}`} className="hover:underline">
                      {BRAND.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-foreground/50">Also at</dt>
                  <dd className="mt-2 text-sm text-ink-foreground/80">{BRAND.satelliteAddress}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-foreground/50">Hours</dt>
                  <dd className="mt-2 text-sm text-ink-foreground/80">{BRAND.hours}</dd>
                </div>
              </dl>
            </Reveal>

            <ImageReveal className="mt-12 overflow-hidden rounded-[2rem]">
              <img
                src={IMAGES.contactDark}
                alt="Dusk-lit lounge with warm lighting from a HOUSEFIED project"
                width={1200}
                height={800}
                loading="lazy"
                className="h-56 w-full object-cover lg:h-72"
              />
            </ImageReveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Consultation request"
              className="rounded-[2rem] bg-card p-8 text-card-foreground shadow-lift lg:p-10"
            >
              <h3 className="font-display text-xl">Request a free consultation</h3>

              <div className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p id="contact-name-error" role="alert" className="text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone number</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+92 3XX XXXXXXX"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p id="contact-phone-error" role="alert" className="text-xs text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-service">Service needed</Label>
                  <select
                    id="contact-service"
                    defaultValue=""
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? "contact-service-error" : undefined}
                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    {...register("service")}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p id="contact-service-error" role="alert" className="text-xs text-destructive">
                      {errors.service.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="mt-8 w-full rounded-full border border-white/30 bg-black text-white hover:bg-white hover:text-black"
              >
                {isSubmitting ? "Sending…" : "Book a Free Consultation"}
                <ArrowUpRight className="size-4" />
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">{BRAND.hours}</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
