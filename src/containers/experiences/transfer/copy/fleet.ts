/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * The transfer fleet. Import-free on purpose: the pure `transferQuote.ts`,
 * the booking schema, the API route and the client vehicle picker all read
 * this, so it must not pull the Zod-validated asset layer with it (D25).
 *
 * Makes and models are written "or similar" — the honest industry phrasing
 * for a class of car rather than a numberplate. Fares are indicative US
 * dollars (TODO(EMIN-Q09)): `transferUsd` is one airport leg including the
 * Expressway toll; `hourlyUsd` is chauffeur-by-the-hour within Kampala.
 */
export interface Vehicle {
  id: string;
  className: string;
  model: string;
  tagline: string;
  seats: number;
  /** Large checked cases that fit alongside a full set of passengers. */
  bags: number;
  transferUsd: number;
  hourlyUsd: number;
  features: readonly string[];
  /** Placeholder photo slot id in `copy/media.ts`. */
  assetId: string;
  /** Optional pill on the card, e.g. "Most booked". */
  badge?: string;
}

export const vehicles = [
  {
    id: "executive-saloon",
    className: "Executive Saloon",
    model: "Mercedes-Benz E-Class or similar",
    tagline: "The quiet, quick way in for one or two travellers with a meeting to make.",
    seats: 3,
    bags: 2,
    transferUsd: 55,
    hourlyUsd: 25,
    features: [
      "Leather rear seats, dual-zone climate",
      "Onboard Wi-Fi and USB-C charging",
      "Chilled water and cold towels",
    ],
    assetId: "transfer-fleet-saloon",
    badge: "Most booked",
  },
  {
    id: "premium-suv",
    className: "Premium SUV",
    model: "Toyota Land Cruiser V8 or similar",
    tagline: "High, composed and discreet — the choice for embassy and NGO arrivals.",
    seats: 4,
    bags: 4,
    transferUsd: 80,
    hourlyUsd: 35,
    features: [
      "Tinted rear glass for privacy",
      "Room for four large cases",
      "Chauffeurs trained in protocol arrivals",
    ],
    assetId: "transfer-fleet-suv",
    badge: "Diplomat's choice",
  },
  {
    id: "business-van",
    className: "Business Van",
    model: "Mercedes-Benz V-Class or similar",
    tagline: "Face-to-face seating for families, small teams and a lot of luggage.",
    seats: 7,
    bags: 7,
    transferUsd: 110,
    hourlyUsd: 45,
    features: [
      "Conference-style rear seating",
      "Wide sliding doors, easy loading",
      "Child and booster seats on request",
    ],
    assetId: "transfer-fleet-van",
  },
  {
    id: "group-coach",
    className: "Group Coach",
    model: "Toyota Coaster or similar",
    tagline: "Delegations, wedding parties and tour groups, collected in one go.",
    seats: 22,
    bags: 20,
    transferUsd: 190,
    hourlyUsd: 70,
    features: [
      "A second host to handle luggage",
      "PA microphone for group briefings",
      "Coordinated with the events team",
    ],
    assetId: "transfer-fleet-coach",
  },
] as const satisfies readonly Vehicle[];

export type VehicleId = (typeof vehicles)[number]["id"];
