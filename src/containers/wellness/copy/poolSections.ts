/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * Eyebrow / heading / lede for every band on the Swimming Pool page, in
 * scroll order — the same shape as `sections.ts` and `spaSections.ts`, kept
 * in its own file so none of the three crosses the repo's `max-lines`
 * ceiling. Import-free, so the client FAQ island can read it without dragging
 * the Zod-validated asset layer into its bundle (DECISIONS.md D25).
 *
 * Traceability: public access, the poolside gardens, the stone finishing, the
 * 1.60m maximum depth and the "no lifeguard" notice are all approved §6 / §14
 * facts. Prices, session names, cabana and event packages are invented
 * placeholders (TODO(EMIN-Q11)) and flagged "indicative" wherever they render.
 */
export const poolSections = {
  hero: {
    eyebrow: "§ THE POOL",
    lede: "An ultra-modern pool set in lush tropical gardens in the middle of Nakasero — open to hotel guests and the city alike. Come for a fast set of lengths before work, a lounger and a book for the afternoon, or take the whole poolside for the evening.",
    primaryCtaLabel: "Book on WhatsApp",
    secondaryCtaLabel: "Plan your visit",
  },
  experience: {
    eyebrow: "§ A SWIM, OR A WHOLE AFTERNOON",
    heading: "One pool, set up for very different days",
    description:
      "Lap swimmers, families, sunbathers and party hosts all use this water. Here is what the pool actually is — and the safety rules that matter before anyone gets in.",
  },
  ways: {
    eyebrow: "§ WAYS TO SWIM",
    heading: "Pick the visit that fits the day",
    description:
      "Every option below is a day-rate — no membership needed. Prices are indicative; the wellness desk confirms the current rate and holds your place when you book.",
  },
  passes: {
    eyebrow: "§ SWIM OFTEN",
    heading: "Season passes for the regulars",
    description:
      "For the guests who are here every week rather than once. A single splash, a swim season, or a year for the whole family — indicative rates, settled with the wellness desk.",
  },
  privateHire: {
    eyebrow: "§ TAKE THE POOLSIDE",
    heading: "Poolside parties & private hire",
    description:
      "The pool and the gardens book as one venue for the evening — a birthday, a company sundowner, a wedding-weekend brunch. You get the water, the loungers, the lawn and a dedicated host.",
  },
  planner: {
    eyebrow: "§ PLAN YOUR VISIT",
    heading: "Build your pool day and send it to us",
    description:
      "Choose a visit, add a few extras, and see an indicative total as you go. Send it over and a member of the wellness team replies personally — usually the same day. Nothing is booked and no card is taken at this step.",
  },
  voices: {
    eyebrow: "§ AT THE WATER",
    heading: "What swimmers say afterwards",
    description: "Unedited notes from recent day guests, lane swimmers and party hosts.",
  },
  faq: {
    eyebrow: "§ GOOD TO KNOW",
    heading: "Before you come for a swim",
    description:
      "Public access, opening times, children, the no-lifeguard rule and private hire — the questions the wellness desk answers most about the pool.",
  },
  related: {
    eyebrow: "§ ALSO AT THE HOTEL",
    heading: "Round out the day",
  },
} as const;
