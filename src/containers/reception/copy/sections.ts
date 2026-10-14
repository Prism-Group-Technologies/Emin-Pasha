/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * Headings and ledes for the reception surfaces.
 *
 * One entry per surface rather than one shared block, because the same section
 * has to make a different argument depending on where it lands: on the
 * homepage it is introducing the desk to someone who has never been here, on a
 * room page it is answering "what happens when I actually turn up", and on the
 * transfer page it is closing the loop on a journey already underway.
 */
export const receptionSections = {
  /** The homepage band. */
  home: {
    eyebrow: "Arrival",
    heading: "One desk, and it never closes",
    lede: "Reception is staffed around the clock. It is where your stay is checked in, your table is held, your transfer is called and your questions get a straight answer — at any hour, from someone standing in front of you.",
    primaryCta: { label: "Talk to the desk", href: "/contact" },
    secondaryCta: { label: "What reception handles", href: "/faq#reception-desk" },
  },
  /** The full services index. */
  services: {
    eyebrow: "At the desk",
    heading: "What reception will do for you",
    // Deliberately uncounted. An earlier draft opened "Fifteen things…" and
    // was wrong by one before the catalogue was even finished; a number in a
    // lede has to be re-checked against `services.ts` on every edit, and the
    // sentence is no weaker without it.
    lede: "Everything you would otherwise arrange yourself, handled by the two people standing under the world clocks. Filter by what you need.",
  },
  /** The compact strip used beside booking and rate surfaces. */
  arrival: {
    eyebrow: "When you arrive",
    heading: "Someone is expecting you",
    lede: "Check-in from 14h00, check-out by 10h00, and a desk that is staffed either side of both. Early arrival and late departure are arranged here, not negotiated at the door.",
  },
  /** The handover strip on the airport-transfer funnel. */
  transfer: {
    eyebrow: "After the drive",
    heading: "The handover at the desk",
    lede: "Your driver brings you to the door; reception takes it from there. Keys, bags, a cold towel, and your first morning already planned if you want it.",
  },
  /** The story-page band. */
  story: {
    eyebrow: "The threshold",
    heading: "Where the story is handed over",
    lede: "Emin Pasha's portrait hangs by the window in the waiting corner, a few steps from the desk. Guests meet the house here first — the clocks, the painted map, and whoever is on shift.",
  },
} as const;

/**
 * The three facts worth stating before any service is listed. `24 hours` leads
 * because it is the only one a competitor in this tier cannot simply match on
 * a rate page, and because it is what makes every other row on this page true
 * at 3am as well as at noon.
 */
export const receptionStats = [
  { value: "24h", label: "Reception staffed" },
  { value: "14h00", label: "Check-in from" },
  { value: "10h00", label: "Check-out by" },
] as const;
