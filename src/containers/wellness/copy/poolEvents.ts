/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface PoolEvent {
  id: string;
  name: string;
  /** Headline guest range — the badge line on the card. */
  capacity: string;
  description: string;
  /** What the hire covers, checked on the card. */
  includes: string[];
  /** Indicative "from" price in UGX. Invented (§0.7). */
  fromUgx: number;
  /** e.g. "for the evening" / "per guest". */
  priceUnit: string;
  /** Placeholder photo id — resolves against `copy/poolMedia.ts`. */
  assetId: string;
}

/**
 * The pool booked as a venue. Every package is the approved §6 "venue for
 * poolside parties and events" line, dressed for one occasion — no new
 * facility is claimed. "From" prices are invented placeholders
 * (TODO(EMIN-Q11)); the section and each card flag them indicative and
 * confirmed on enquiry.
 */
export const privateHireIncludes = [
  "Exclusive use of the pool and the poolside gardens for your window",
  "Loungers, low tables and lawn seating arranged to your plan",
  "A dedicated event host and poolside service team",
  "Festoon and lantern lighting once the sun drops",
  "A bar set-up, with tabs or packages, and a kitchen menu to choose from",
  "Sound system with a house playlist, or bring your own DJ",
];

export const poolEvents: PoolEvent[] = [
  {
    id: "sundowner",
    name: "The Poolside Sundowner",
    capacity: "20–60 guests",
    description:
      "A two-hour evening reception at the water's edge — a birthday, a launch or a team night that starts as the heat lifts.",
    includes: [
      "Two hours of exclusive poolside use, from 6pm",
      "Welcome drink on arrival for every guest",
      "Canapés or a grazing table",
      "Festoon lighting and a house playlist",
    ],
    fromUgx: 4500000,
    priceUnit: "for the evening",
    assetId: "wellness-pool-private-hire",
  },
  {
    id: "family-celebration",
    name: "The Family Celebration",
    capacity: "Up to 30, kids included",
    description:
      "A daytime party for a milestone birthday or a christening — swimming, the gardens and a long lunch, with the shallow end supervised.",
    includes: [
      "Four hours of exclusive daytime use",
      "A dedicated swim marshal at the shallow end",
      "A children's buffet and a cake table",
      "Pool toys, games and a shaded gift area",
    ],
    fromUgx: 3800000,
    priceUnit: "for the afternoon",
    assetId: "wellness-pool-family-event",
  },
  {
    id: "wedding-brunch",
    name: "The Wedding-Weekend Brunch",
    capacity: "40–120 guests",
    description:
      "The morning-after gathering for a wedding party staying at the hotel — a relaxed poolside brunch before everyone travels home.",
    includes: [
      "Exclusive use of the pool lawn, 10am–2pm",
      "A seated or buffet brunch by the kitchen",
      "A sparkling and soft-drink package",
      "A quiet corner set for speeches and gifts",
    ],
    fromUgx: 180000,
    priceUnit: "per guest",
    assetId: "wellness-pool-wedding-brunch",
  },
];
