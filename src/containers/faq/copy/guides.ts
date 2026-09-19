/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface FaqGuide {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  /** Catalogue ids listed under the card as related questions. */
  questionIds: string[];
}

/**
 * The plan-your-stay cards. Every `href` is a real route in
 * `content/navigation.ts`; every question id must exist in the catalogue —
 * `catalogue.test.ts` checks both.
 */
export const faqGuides: FaqGuide[] = [
  {
    id: "arrival",
    eyebrow: "Arrive",
    title: "Getting here, stress-free",
    body: "A chauffeur who tracks your flight, secure parking, and a quiet garden street in Nakasero at the end of the drive.",
    href: "/experiences/airport-transfer",
    cta: "Plan my transfer",
    questionIds: ["airport-transfers", "airport-distance", "late-arrival"],
  },
  {
    id: "dining",
    eyebrow: "Eat",
    title: "Breakfast to a late dinner",
    body: "À la carte breakfast is included; after that it's fine dining, the rooftop terrace or a quiet table in the lounges.",
    href: "/dining",
    cta: "Explore dining",
    questionIds: ["breakfast-included", "dietary-requirements", "dine-without-staying"],
  },
  {
    id: "wellness",
    eyebrow: "Unwind",
    title: "Spa, pool & gym",
    body: "Book a treatment, swim in the garden pool or keep up your routine — as a hotel guest or a day visitor.",
    href: "/spa-and-wellness",
    cta: "Discover wellness",
    questionIds: ["non-guests-pool-spa-gym", "spa-booking-lead-time", "spa-what-to-bring"],
  },
  {
    id: "events",
    eyebrow: "Gather",
    title: "Meetings, weddings & celebrations",
    body: "Kudara Hall, private meeting rooms and the Equatorial Gardens — with rooms for your guests on the same estate.",
    href: "/meetings-and-events",
    cta: "Plan an event",
    questionIds: ["weddings-and-conferences", "event-lead-time", "site-visit"],
  },
];
