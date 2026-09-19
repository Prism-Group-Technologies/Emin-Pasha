/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { JourneyStep } from "@/containers/wellness/copy/journey";

/**
 * The Turkish bath, broken into the movements a first-timer wants named
 * before they commit 75 minutes and UGX 320,000 to it. The sequence —
 * steam, black-soap cleanse, exfoliation on the heated marble, a foam
 * massage, a cool rinse, tea — is the standard hammam order and is exactly
 * what `content/wellness.ts` already approves as "a full, rejuvenating
 * Turkish bath experience". No duration or price is asserted here; those
 * live on the treatment card, flagged indicative.
 */
export const turkishBathRitual: JourneyStep[] = [
  {
    step: 1,
    title: "Warm up in the steam",
    description:
      "Fifteen minutes in the steam room to open the skin and let the shoulders drop before anyone touches you.",
    icon: "spa",
  },
  {
    step: 2,
    title: "The black-soap cleanse",
    description:
      "Olive-based savon noir is worked over the whole body and left to soften while the heat does its work.",
    icon: "check-circle",
  },
  {
    step: 3,
    title: "Exfoliation on the marble",
    description:
      "The kese mitt, head to foot, on the heated marble slab. This is the part people describe as a fresh layer of skin.",
    icon: "auto-awesome",
  },
  {
    step: 4,
    title: "A foam massage",
    description:
      "Warm cushions of olive-oil foam, then a slow massage through them — the quietest ten minutes of the week.",
    icon: "spa",
  },
  {
    step: 5,
    title: "Cool rinse & hair wash",
    description:
      "A cool-to-warm rinse to close everything back down, and a proper hair wash to finish.",
    icon: "pool",
  },
  {
    step: 6,
    title: "Tea in the lounge",
    description:
      "Wrapped, still, and handed a glass of tea in the relaxation lounge for as long as you want to stay.",
    icon: "event",
  },
];
