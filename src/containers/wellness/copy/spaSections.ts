/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * Eyebrow / heading / lede for the eight conversion bands added to the Spa
 * page on top of the shared wellness sections. Kept apart from `sections.ts`
 * so neither file crosses the repo's `max-lines` ceiling, and so the
 * spa-only argument reads as one piece — the same split `containers/dining`
 * uses for its detail-page copy.
 */
export const spaSections = {
  assurance: {
    eyebrow: "§ SAFE HANDS",
    heading: "The things you should not have to ask about",
    description:
      "Who is looking after you, what touches your skin, who can come in, and how a booking is handled — stated up front.",
  },
  ritual: {
    eyebrow: "§ THE FLAGSHIP",
    heading: "Inside the Turkish bath ritual",
    description:
      "Seventy-five minutes on the heated marble, in six unhurried movements. This is the treatment guests travel across the city for.",
  },
  enhancements: {
    eyebrow: "§ MAKE IT YOURS",
    heading: "Add-ons & enhancements",
    description:
      "Small upgrades our therapists fold into any treatment. Add them when you book, or decide on the table — shortlist a few below and send them straight to the wellness desk.",
  },
  seasonal: {
    eyebrow: "§ ON NOW",
    heading: "Limited seasonal treatments",
    description:
      "A short calendar of treatments we run for a few weeks at a time. When the dates pass, so do these — the wellness desk confirms availability.",
  },
  passes: {
    eyebrow: "§ COME BACK OFTEN",
    heading: "Spa passes & the Spa Club",
    description:
      "For the guests who make this a habit rather than a treat. A single visit, a month, or a year — indicative rates, settled with the wellness desk.",
  },
  therapists: {
    eyebrow: "§ THE TEAM",
    heading: "The hands you are in",
    description:
      "A small, senior team who do this all day, every day. Ask for someone by name when you book and we will hold their diary.",
  },
  groups: {
    eyebrow: "§ TOGETHER",
    heading: "Bridal parties & team days",
    description:
      "The spa taken over for the morning — a wedding party before the day, or a company that has decided its people are worth an afternoon off.",
  },
  vouchers: {
    eyebrow: "§ THE BEST GIFT IN KAMPALA",
    heading: "Give the calmest hour in the city",
    description:
      "A single treatment, a half-day retreat, or an amount to spend as they like — sent by email within the hour, or written up at reception. Values are indicative and confirmed on purchase.",
  },
} as const;
