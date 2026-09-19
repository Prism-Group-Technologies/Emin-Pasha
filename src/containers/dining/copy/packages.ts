/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { RESERVE_ANCHOR_ID } from "@/containers/dining/anchors";

export interface DiningPackage {
  id: string;
  title: string;
  description: string;
  /** Who it is for — the badge line on the card. */
  forWhom: string;
  /** What is arranged, checked off on the card. */
  includes: string[];
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Four ways to book the property for a group. No package invents a facility:
 * the chef's table is the existing pass, the private room is existing dining
 * space, the rooftop is an approved outlet, and "menu built around the
 * occasion" is how every reservation here already works.
 */
export const diningPackages: DiningPackage[] = [
  {
    id: "chefs-table",
    title: "The Chef's Table",
    description:
      "Up to eight guests at the pass, with a bespoke tasting menu talked through course by course by the kitchen.",
    forWhom: "2–8 guests",
    includes: [
      "A seat at the pass, beside the dumbwaiter",
      "A tasting menu built with you beforehand",
      "Optional wine pairing from the Manutea list",
      "Dietary versions on 48 hours' notice",
    ],
    ctaLabel: "Enquire about the chef's table",
    ctaHref: `#${RESERVE_ANCHOR_ID}`,
  },
  {
    id: "private-room",
    title: "The Private Dining Room",
    description:
      "A room of your own for a board dinner, a birthday or a family occasion, with a set menu and a dedicated server.",
    forWhom: "10–24 guests",
    includes: [
      "Exclusive use of the private dining room",
      "A three- or five-course set menu",
      "AV for a short toast or presentation",
      "One bill, or split as you need",
    ],
    ctaLabel: "Ask about the private room",
    ctaHref: `#${RESERVE_ANCHOR_ID}`,
  },
  {
    id: "rooftop-party",
    title: "Rooftop Takeover",
    description:
      "The Rooftop Terrace for a standing reception — canapés, a bar package and the skyline as the backdrop.",
    forWhom: "30–80 guests",
    includes: [
      "Exclusive or semi-private use of the rooftop",
      "Canapé and grazing menus",
      "Cocktail, wine or zero-proof bar packages",
      "A run sheet agreed with our events team",
    ],
    ctaLabel: "Plan a rooftop event",
    ctaHref: `#${RESERVE_ANCHOR_ID}`,
  },
  {
    id: "corporate-lunch",
    title: "Working Lunch & Dinner",
    description:
      "A fast, quiet table at Hakki Pasha for a client lunch, or a longer one at Sir Samuel Baker to close the deal.",
    forWhom: "4–16 guests",
    includes: [
      "A reserved table away from the main floor",
      "A pre-agreed express or leisurely menu",
      "LPO billing for local companies",
      "Airport transfer arranged for visiting guests",
    ],
    ctaLabel: "Book a business table",
    ctaHref: `#${RESERVE_ANCHOR_ID}`,
  },
];

export const packagesNote =
  "Group menus, minimum spends and exclusive-use terms are confirmed directly with the reservations and events desk.";
