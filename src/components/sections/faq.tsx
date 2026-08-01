import { FAQS } from "@/constants/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

/** FAQ accordion. */
export function Faq() {
  return (
    <section className="px-4 py-20 lg:px-8 lg:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Questions</p>
          <h2 id="faq-heading" className="display-lg mt-6 max-w-[14ch]">
            Good to know
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="py-6 text-left font-display text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-prose pb-6 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
