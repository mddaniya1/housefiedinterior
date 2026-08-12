import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { BRAND, IMAGES } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageReveal, Reveal } from "@/components/motion/reveal";

const consultationSchema = z.object({
  name: z.string().min(2, "Please tell us your name."),
  email: z.string().email("Enter a valid email address."),
  project: z.string().min(10, "A sentence or two about the space, please."),
});

type ConsultationValues = z.infer<typeof consultationSchema>;

/** Dark contact section with large typography, luxury image and booking form. */
export function ContactCta() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { name: "", email: "", project: "" },
  });

  const onSubmit = async (values: ConsultationValues) => {
    // No backend yet — acknowledge locally so the form stays honest.
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success("Request received", {
      description: `Thank you, ${values.name}. We'll reply within two working days.`,
    });
    reset();
  };

  return (
    <section id="contact" className="px-4 py-10 lg:px-8 lg:py-16" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-ink-foreground lg:px-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-ink-foreground/60">Book a consultation</p>
              <h2 id="contact-heading" className="display-lg mt-6 max-w-[16ch]">
                Let’s begin the conversation.
              </h2>
              <p className="mt-8 max-w-prose text-sm leading-relaxed text-ink-foreground/70">
                Tell us about the space, the light and how you want to live in it. We take on a
                limited number of commissions each season so every project receives the studio’s
                full attention.
              </p>

              <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="eyebrow text-ink-foreground/50">Atelier</dt>
                  <dd className="mt-2 text-sm text-ink-foreground/80">
                    {BRAND.address.street}
                    <br />
                    {BRAND.address.postalCode} {BRAND.address.city}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-foreground/50">Contact</dt>
                  <dd className="mt-2 text-sm text-ink-foreground/80">
                    <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:underline">
                      {BRAND.phone}
                    </a>
                    <br />
                    <a href={`mailto:${BRAND.email}`} className="hover:underline">
                      {BRAND.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <ImageReveal className="mt-12 overflow-hidden rounded-[2rem]">
              <img
                src={IMAGES.contactDark}
                alt="Dusk-lit lounge with deep brown sofa and city view"
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
              <h3 className="font-display text-xl">Request a consultation</h3>

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
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="contact-email-error" role="alert" className="text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-project">About the project</Label>
                  <Textarea
                    id="contact-project"
                    rows={4}
                    aria-invalid={!!errors.project}
                    aria-describedby={errors.project ? "contact-project-error" : undefined}
                    {...register("project")}
                  />
                  {errors.project && (
                    <p id="contact-project-error" role="alert" className="text-xs text-destructive">
                      {errors.project.message}
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
                {isSubmitting ? "Sending…" : "Book consultation"}
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
