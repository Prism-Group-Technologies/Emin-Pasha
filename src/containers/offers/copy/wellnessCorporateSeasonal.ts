/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { OFFER_CATEGORY } from "@/containers/offers/anchors";
import type { OfferItem } from "@/containers/offers/copy/offerTypes";

/**
 * Invented spa, corporate and seasonal packages. The spa services (tailored
 * massage, Turkish bath, pool), Kudara Hall and the business centre are all
 * approved facilities; every price, saving and date is a placeholder.
 */
export const wellnessOffers: OfferItem[] = [
  {
    id: "spa-day-for-two",
    category: OFFER_CATEGORY.wellness,
    title: "Spa Day for Two",
    summary: "A whole unhurried day at the Swanky Spa — treatments, lunch and the pool.",
    inclusions: [
      "60-minute massage each, side by side",
      "Turkish bath session",
      "Two-course garden lunch and all-day pool access",
    ],
    priceUgx: 640_000,
    wasPriceUgx: 800_000,
    priceUnit: "for two",
    bookBy: "Book by 15 Dec 2026",
    assetId: "spa-pool",
  },
  {
    id: "midweek-hammam",
    category: OFFER_CATEGORY.wellness,
    title: "Midweek Hammam & Lunch",
    summary: "The quiet-day rate: the Turkish bath ritual and a light lunch, Monday to Wednesday.",
    inclusions: ["Full Turkish bath ritual", "Sea-salt body scrub", "Light lunch in the lounge"],
    priceUgx: 280_000,
    wasPriceUgx: 350_000,
    priceUnit: "per guest",
    schedule: "Monday – Wednesday",
    urgency: "Limited daily slots",
    assetId: "spa-treatment-room",
  },
];

export const corporateOffers: OfferItem[] = [
  {
    id: "day-delegate",
    category: OFFER_CATEGORY.corporate,
    title: "Day Delegate Package",
    summary: "One rate per head for a full-day meeting — room, food and kit all included.",
    inclusions: [
      "Meeting room or Kudara Hall set to your layout",
      "Two tea breaks and a buffet lunch",
      "Projector, screen and high-speed Wi-Fi",
    ],
    priceUgx: 95_000,
    wasPriceUgx: 115_000,
    priceUnit: "per delegate · min. 10",
    bookBy: "Events held before 31 Mar 2027",
    assetId: "meetings-kudara-hall",
  },
  {
    id: "corporate-stay-rate",
    category: OFFER_CATEGORY.corporate,
    title: "Corporate Stay Rate",
    summary: "A standing company rate for teams who come to Kampala often.",
    inclusions: [
      "20% off the best available room rate",
      "Express check-in and 2pm late check-out",
      "Business centre credit on every stay",
    ],
    priceUgx: 360_000,
    wasPriceUgx: 450_000,
    priceUnit: "per night, from",
    bookBy: "Company agreements for 2027 open now",
    assetId: "meetings-business-centre",
  },
];

export const seasonalOffers: OfferItem[] = [
  {
    id: "festive-season",
    category: OFFER_CATEGORY.seasonal,
    title: "Christmas in the Gardens",
    summary: "Two nights over Christmas with a candlelit Eve dinner and a long Christmas lunch.",
    inclusions: [
      "Two nights, 24–26 December",
      "Christmas Eve dinner at Sir Samuel Baker",
      "Christmas Day family lunch and carols in the garden",
    ],
    priceUgx: 1_950_000,
    wasPriceUgx: 2_300_000,
    priceUnit: "per stay, for two",
    bookBy: "Book by 10 Dec 2026",
    urgency: "Few rooms left",
    assetId: "dining-sir-samuel-baker",
  },
  {
    id: "new-years-eve-gala",
    category: OFFER_CATEGORY.seasonal,
    title: "New Year's Eve Garden Gala",
    summary: "See in 2027 under the stars: a long dinner, a live band and the midnight countdown.",
    inclusions: [
      "Four-course gala dinner",
      "Live band in the Equatorial Gardens",
      "Midnight countdown and New Year's Day brunch",
    ],
    priceUgx: 450_000,
    wasPriceUgx: 520_000,
    priceUnit: "per guest",
    bookBy: "Early-bird rate until 30 Nov 2026",
    urgency: "Early-bird",
    assetId: "weddings-equatorial-gardens",
  },
];
