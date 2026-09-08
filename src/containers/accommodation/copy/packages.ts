/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface StayPackageCopy {
  id: string;
  name: string;
  tagline: string;
  /** Starting nightly rate, UGX — traceable to `content/rooms.ts`. */
  fromUgx: number;
  forGuests: string;
  includes: string[];
  ctaLabel: string;
}

/**
 * Four framings of an existing room plus already-approved services. No
 * package invents an amenity: transfers, LPO billing, the spa, Friday Band
 * Night, the children policy and late checkout are all in the content layer.
 * Rates are the `from` figures from the rate card, never a bundled total —
 * the honest position, and the one `RateBadge` already takes.
 */
export const stayPackages: StayPackageCopy[] = [
  {
    id: "nakasero-business",
    name: "The Nakasero Business Rate",
    tagline: "A Superior Room set up to work from, in the embassy quarter.",
    fromUgx: 350_000,
    forGuests: "Corporate & diplomatic travellers",
    includes: [
      "Superior Room with a dedicated work area on unlimited cabled fibre",
      "24/7 room service and secure, manned parking",
      "LPO billing for local companies",
      "Checkout by 10:00, with late checkout on request",
    ],
    ctaLabel: "Enquire about the rate",
  },
  {
    id: "garden-escape",
    name: "The Garden Escape",
    tagline: "A room onto the grounds, a treatment held, and a table on Friday.",
    fromUgx: 250_000,
    forGuests: "Couples & leisure guests",
    includes: [
      "Garden Room or Garden Suite opening onto the landscaped grounds",
      "À la carte breakfast for two",
      "A spa treatment booking held for your dates (adults 16+)",
      "A reserved table at Friday Band Night",
    ],
    ctaLabel: "Plan the weekend",
  },
  {
    id: "extended-stay",
    name: "The Extended Stay",
    tagline: "Seven nights or more, with the airport runs on us.",
    fromUgx: 250_000,
    forGuests: "Long-stay executives & relocations",
    includes: [
      "Complimentary chauffeured airport transfer, both ways",
      "Daily à la carte breakfast and unlimited fibre",
      "A workspace in the room and a weekly housekeeping rhythm",
      "Superior Suite available for a private lounge area",
    ],
    ctaLabel: "Talk to reservations",
  },
  {
    id: "family-garden-suite",
    name: "The Family Garden Suite",
    tagline: "One suite, a separate living room, and the pool through the gardens.",
    fromUgx: 250_000,
    forGuests: "Families & small groups, up to 3",
    includes: [
      "Garden Suite with separate living and sleeping areas",
      "Children stay free using existing bedding",
      "Pool access for children with a parent or adult",
      "À la carte breakfast and an in-room safe",
    ],
    ctaLabel: "Hold a suite",
  },
];

export const packagesDisclaimer =
  "Rates shown are starting rates per night, in Ugandan shillings. Package inclusions and dates are confirmed directly with reservations.";
