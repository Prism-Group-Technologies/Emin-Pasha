/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { OFFER_CATEGORY } from "@/containers/offers/anchors";
import type { FeaturedOffer } from "@/containers/offers/copy/offerTypes";

/**
 * The one package the page leads with. Built from approved capabilities — the
 * Deluxe Suites, the spa's tailored massage, breakfast and in-room dining —
 * recombined; the price, saving, allocation and dates are invented and flagged
 * indicative on the page. The 2pm check-out is a perk against the approved
 * 10:00 check-out in `content/identity.ts`.
 */
export const featuredOffer: FeaturedOffer = {
  id: "deluxe-suite-escape",
  category: OFFER_CATEGORY.stay,
  eyebrow: "Offer of the season",
  title: "The Deluxe Suite Escape",
  summary: "Two nights in a Deluxe Suite, a couples massage and a slow 2pm check-out.",
  pitch:
    "Our most-requested package, rebuilt for the season. Wake to the equatorial gardens, take breakfast when you like, spend an afternoon at the Swanky Spa, and let the city wait until Sunday afternoon.",
  inclusions: [
    "Two nights in a Deluxe Suite for two",
    "Full breakfast each morning, served in the suite or the garden",
    "60-minute couples massage at the Swanky Spa",
    "Welcome platter of seasonal fruit and Ugandan coffee",
    "Guaranteed 2pm late check-out",
    "Complimentary secure parking",
  ],
  priceUgx: 1_520_000,
  wasPriceUgx: 1_900_000,
  priceUnit: "per stay, for two",
  bookBy: "Book by 30 Nov 2026 · stay until 31 Jan 2027",
  urgency: "Only 6 suites a month",
  assetId: "room-deluxe-suites",
};
