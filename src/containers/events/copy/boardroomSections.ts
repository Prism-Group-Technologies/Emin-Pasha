/**
 * Eyebrow / heading / lede for every bespoke Boardroom band, in scroll order.
 * One object so the venue page reads as a single argument — the same shape as
 * `./kudaraSections.ts`.
 *
 * The argument this page makes is deliberately the opposite of Kudara's.
 * Kudara sells scale and flexibility; the Boardroom sells the one thing a
 * fixed, finished, private room can offer that a flexible one cannot —
 * nothing to set up, nothing to share, nothing to carry in.
 */
export const boardroomSections = {
  showcase: {
    eyebrow: "§ THE BOARDROOM",
    heading: "A room that is already set",
    description:
      "One fitted boardroom in Nakasero: a fixed table for sixteen, an interactive display on the wall, power and data in the tabletop, and a door that closes. Nothing is wheeled in, nothing is shared, and the room looks the same at nine in the morning as it does at six in the evening.",
  },
  technology: {
    eyebrow: "§ THE TECHNOLOGY",
    heading: "Built in, not brought in",
    description:
      "The display, the connections and the power are part of the room rather than a trolley someone fetches. Specifications below are indicative for planning — the exact configuration is confirmed on your proposal.",
  },
  day: {
    eyebrow: "§ A BOARD DAY",
    heading: "How the day actually runs",
    description:
      "An illustrative shape for a full-day board session, not a fixed schedule. The point is what you never have to do: no room reset, no caterer brief, no drive to lunch.",
  },
  gallery: {
    eyebrow: "§ THE ROOM",
    heading: "Every angle, before you commit",
    description:
      "The room as delivered and photographed — no staging, no borrowed furniture, no renders. What you see is what you book.",
  },
} as const;
