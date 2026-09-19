/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { ENQUIRE_ANCHOR_ID } from "@/containers/events/anchors";

export interface EventPackage {
  id: string;
  title: string;
  /** The badge line — who / what it is for. */
  forWhom: string;
  description: string;
  /** What is bundled, checked off on the card. */
  includes: string[];
  /**
   * Indicative price in UGX. **Invented** (TODO(EMIN-Q12)). `unit` says what
   * it is per; every surface labels it "indicative, confirmed on proposal".
   */
  priceUgx: number;
  unit: string;
  ctaHref: string;
  ctaLabel: string;
  /** Marks the card the section leads with. */
  featured?: boolean;
}

/**
 * Bundled delegate packages. Every component maps onto an approved §7
 * facility — a meeting space, catering from the three restaurants, on-site
 * rooms, secure parking — assembled into a rate. The numbers are placeholders
 * and flagged as such in the section copy and on each card.
 */
export const eventPackages: EventPackage[] = [
  {
    id: "day-delegate",
    title: "Day Delegate",
    forWhom: "Per delegate · min. 20",
    description: "The full meeting day, priced per head so the budget is a single line.",
    includes: [
      "Main plenary room with in-house AV and a stage set",
      "Arrival coffee, mid-morning and afternoon breaks",
      "Working lunch in one of the restaurants",
      "Notepads, pens, still and sparkling water, sweets",
      "A dedicated F&B host and secure parking",
    ],
    priceUgx: 185000,
    unit: "per delegate",
    ctaHref: `#${ENQUIRE_ANCHOR_ID}`,
    ctaLabel: "Price my day",
    featured: true,
  },
  {
    id: "residential",
    title: "24-Hour Residential",
    forWhom: "Per delegate · min. 15",
    description: "Everything in the day rate plus the night — for offsites that run two days.",
    includes: [
      "All Day Delegate inclusions",
      "En-suite room, single occupancy, on site",
      "Three-course dinner in a private dining room",
      "Full breakfast and late checkout",
      "Evening use of the gym, pool and gardens",
    ],
    priceUgx: 520000,
    unit: "per delegate",
    ctaHref: `#${ENQUIRE_ANCHOR_ID}`,
    ctaLabel: "Price the residential",
  },
  {
    id: "board-dinner",
    title: "Board Dinner",
    forWhom: "6–20 guests",
    description: "A private room, a set menu with the chef, and the meeting space before it.",
    includes: [
      "Half-day private meeting room with AV",
      "Four-course tasting menu with wine pairing",
      "Private room in Sir Samuel Baker or a garden pavilion",
      "Menu and seating agreed with the chef in advance",
    ],
    priceUgx: 4200000,
    unit: "total, up to 12",
    ctaHref: `#${ENQUIRE_ANCHOR_ID}`,
    ctaLabel: "Plan the dinner",
  },
  {
    id: "wedding",
    title: "Garden Wedding",
    forWhom: "Up to 300 guests",
    description: "Ceremony, reception and the estate for the day — one wedding only.",
    includes: [
      "Exclusive use of the Equatorial Gardens for the ceremony",
      "Kudara Hall or a garden marquee for the reception",
      "Three-course plated dinner or premium buffet",
      "Bridal suite and a 20-room guest block held",
      "Dedicated wedding planner and a day-of coordinator",
    ],
    priceUgx: 32000000,
    unit: "from, 150 guests",
    ctaHref: `#${ENQUIRE_ANCHOR_ID}`,
    ctaLabel: "Start the wedding enquiry",
  },
];

export const packagesNote =
  "Package rates are indicative placeholders for planning only. Final pricing, minimum numbers and group terms are confirmed on your written proposal.";
