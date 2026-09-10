import { WHATSAPP_BOOKING_URL } from "@/constants/site";

/** Open the WhatsApp booking link in a fresh top-level tab.
 *  Helps avoid ERR_BLOCKED_BY_RESPONSE in iframe/preview contexts. */
export function openWhatsAppBooking(e?: React.MouseEvent<HTMLAnchorElement>) {
  e?.preventDefault();
  window.open(WHATSAPP_BOOKING_URL, "_blank", "noopener,noreferrer");
}
