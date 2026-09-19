import { OffersStickyBar } from "@/containers/offers/molecules/OffersStickyBar";
import { whatsappOffersUrl } from "@/lib/directions";

/**
 * The page-scoped sticky "claim" bar. A Server Component whose only job is to
 * resolve `whatsappOffersUrl` from `lib/directions` and hand it to the client
 * `OffersStickyBar` as a plain string, so the Zod-validated content layer
 * stays off the client (DECISIONS.md D25).
 */
export function StickyClaimCta() {
  return <OffersStickyBar whatsappHref={whatsappOffersUrl} />;
}
