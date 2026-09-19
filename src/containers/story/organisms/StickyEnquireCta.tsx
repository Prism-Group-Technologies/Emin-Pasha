import { StoryStickyBar } from "@/containers/story/molecules/StoryStickyBar";
import { whatsappBookingUrl } from "@/lib/directions";

/**
 * The page-scoped sticky "plan a stay" bar. A Server Component whose only job
 * is to resolve the one `whatsappBookingUrl` from `lib/directions` and hand
 * it to the client `StoryStickyBar` as a plain string, so the Zod-validated
 * content layer stays off the client (DECISIONS.md D25).
 */
export function StickyEnquireCta() {
  return <StoryStickyBar whatsappHref={whatsappBookingUrl} />;
}
