/**
 * Eyebrow / heading / lede for every bespoke Kudara Hall band, in scroll
 * order. One object so the venue page reads as a single argument — the same
 * shape as `./sections.ts` for the hub. Figures referenced in this copy are
 * indicative placeholders and are labelled as such wherever they render.
 */
export const kudaraSections = {
  showcase: {
    eyebrow: "§ KUDARA HALL",
    heading: "Kampala's pillar-free hall — one room, every format",
    description:
      "A single 24-metre span with a built-in stage, in-house production and three kitchens behind it. Plenary conference by day, gala dinner by night, on one contract and one site.",
  },
  layouts: {
    eyebrow: "§ THE SPACE, SET",
    heading: "Six ways to lay the room",
    description:
      "The floor is column-free, so the seating plan is a choice, not a compromise. Indicative maximums per layout — your exact figure is confirmed on the proposal.",
  },
  production: {
    eyebrow: "§ STAGE & PRODUCTION",
    heading: "The AV is already in the room",
    description:
      "Stage, screens, line-array sound, lighting rig, streaming and a duty technician are built in — there is no third-party AV company to brief, schedule or mark up.",
  },
  catering: {
    eyebrow: "§ CATERING",
    heading: "Three kitchens, no outside caterer",
    description:
      "Asian, European and African menus from the hotel's own restaurants — tastings on site, dietaries handled, served to 300+ without the room going cold. Rates are per delegate and indicative.",
  },
  caseStudies: {
    eyebrow: "§ IN THIS ROOM",
    heading: "What the hall has already run",
    description:
      "Placeholder case notes — the format, the numbers and the outcome — until client references are collected and signed off. No real organisation is named.",
  },
  estimator: {
    eyebrow: "§ BUILD YOUR ESTIMATE",
    heading: "Price the day in under a minute",
    description:
      "Pick a layout, set your delegate count, choose catering and extras, and watch an indicative total build. Send the numbers straight to the events team — nothing here is a booking or a quote.",
  },
  planning: {
    eyebrow: "§ PLANNING AIDS",
    heading: "What you get before the brief is even signed",
    description:
      "A named planner, a sample run of show to react to, and a one-page fact sheet for your internal sign-off.",
  },
} as const;
