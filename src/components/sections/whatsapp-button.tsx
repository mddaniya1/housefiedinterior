import { WHATSAPP_BOOKING_URL } from "@/constants/site";
import { openWhatsAppBooking } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Black "Book a Free Consultation" button that opens WhatsApp. */
export function WhatsAppButton({ className }: { className?: string }) {
  return (
    <Button
      asChild
      size="lg"
      className={cn("rounded-full bg-black px-7 text-white hover:bg-white hover:text-black", className)}
    >
      <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={openWhatsAppBooking}>
        Book a Free Consultation
      </a>
    </Button>
  );
}
