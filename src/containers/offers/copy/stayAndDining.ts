/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { OFFER_CATEGORY } from "@/containers/offers/anchors";
import type { OfferItem } from "@/containers/offers/copy/offerTypes";

/**
 * Invented stay and dining packages. Room types and outlets are the approved
 * ones in `content/rooms.ts` / `content/dining.ts`; prices, savings and dates
 * are placeholders. Per the brief, **no new bar offer** is invented here — the
 * two approved evening offers are mapped in separately by `catalogue.ts`.
 */
export const stayOffers: OfferItem[] = [
  {
    id: "stay-longer",
    category: OFFER_CATEGORY.stay,
    title: "Stay Longer, Pay Less",
    summary: "Four nights or more and every night drops by a quarter — built for long work trips.",
    inclusions: [
      "25% off a Superior Suite from the fourth night",
      "Daily breakfast and weekly laundry",
      "One-way airport transfer",
    ],
    priceUgx: 562_500,
    wasPriceUgx: 750_000,
    priceUnit: "per night",
    bookBy: "Rolling offer · stays of 4+ nights",
    assetId: "room-superior-suites",
  },
  {
    id: "nakasero-weekender",
    category: OFFER_CATEGORY.stay,
    title: "The Nakasero Weekender",
    summary: "A Friday-to-Sunday staycation for Kampala residents who need a proper break.",
    inclusions: [
      "Two nights in a Superior Room",
      "Late breakfast until 11am on Saturday and Sunday",
      "Pool access for two all weekend",
    ],
    priceUgx: 780_000,
    wasPriceUgx: 920_000,
    priceUnit: "per weekend, for two",
    bookBy: "Fridays & Saturdays until 20 Dec 2026",
    urgency: "Weekends fill fast",
    assetId: "room-superior-room",
  },
];

export const diningOffers: OfferItem[] = [
  {
    id: "sunday-garden-brunch",
    category: OFFER_CATEGORY.dining,
    title: "Sunday Garden Brunch",
    summary: "A long family brunch on the Rooftop Terrace, with the under-sixes on the house.",
    inclusions: [
      "Hot kitchen, grill station and pastry table",
      "Fresh juices, tea and Ugandan coffee",
      "Children under six dine free",
    ],
    priceUgx: 120_000,
    wasPriceUgx: 150_000,
    priceUnit: "per adult",
    schedule: "Sundays, 11:00am – 3:00pm",
    assetId: "dining-rooftop-terrace",
  },
  {
    id: "hakki-pasha-chefs-table",
    category: OFFER_CATEGORY.dining,
    title: "The Chef's Table at Hakki Pasha",
    summary: "Five courses of Turkish and East African cooking, served by the chef who made them.",
    inclusions: [
      "Five-course tasting menu",
      "Meet-the-chef welcome and kitchen walk-through",
      "Signature Turkish tea and dessert service",
    ],
    priceUgx: 220_000,
    wasPriceUgx: 260_000,
    priceUnit: "per guest",
    schedule: "Thursdays, 7:30pm",
    urgency: "12 seats a night",
    assetId: "dining-hakki-pasha",
  },
];
