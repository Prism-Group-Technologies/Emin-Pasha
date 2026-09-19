/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { WellnessFaqItem } from "@/containers/wellness/copy/faq";

/**
 * The pool-specific questions the wellness desk fields most. Answers stay
 * inside what the source supports — public access (§6), the 1.60m maximum
 * depth, the "no lifeguard on duty" notice and the accompanied-children rule
 * (§6 / §14) — and flag anything not yet confirmed (exact day-pass rates, the
 * live opening times) rather than inventing a policy. Import is type-only, so
 * the client FAQ accordion can read this without pulling the content layer.
 */
export const poolFaq: WellnessFaqItem[] = [
  {
    id: "public-access",
    question: "Can I swim if I am not staying at the hotel?",
    answer:
      "Yes. The pool is open to the general public on a day pass, alongside hotel guests. There is no membership requirement for a single visit — message the wellness desk and we will confirm the current rate and hold you a lounger.",
  },
  {
    id: "lifeguard",
    question: "Is there a lifeguard on duty?",
    answer:
      "No. There is no lifeguard at the pool. Everyone swims at their own risk, and children may use the pool only when accompanied and actively supervised by a parent, adult or guardian. For children's parties we can add a dedicated swim marshal at the shallow end.",
  },
  {
    id: "children",
    question: "Are children welcome, and is it safe for young swimmers?",
    answer:
      "Children are very welcome when accompanied by an adult. The maximum depth is 1.60m, so much of the pool is manageable for confident young swimmers, but an adult must supervise at all times. Learn-to-swim lessons run one-to-one in the shallow end from age 4.",
  },
  {
    id: "hours",
    question: "What are the opening times?",
    answer:
      "The pool keeps daytime hours and closes in the evening; sunrise lane hire runs before public opening. Exact times shift a little with the season and with private events, so the wellness desk confirms the hours for the day you want when you enquire.",
  },
  {
    id: "what-to-bring",
    question: "What should I bring?",
    answer:
      "Swimwear and something for the sun. Towels and lockers are available, and there are warm showers and changing rooms by the pool. Leave valuables in your room or at reception — a secure place is provided but the hotel does not accept liability for loss or damage.",
  },
  {
    id: "private-hire",
    question: "Can I book the pool for a party or an event?",
    answer:
      "Yes. The pool and the poolside gardens book as one venue for birthdays, company sundowners and wedding-weekend brunches, with a dedicated host, lighting, a bar and a kitchen menu. Send the planner with your date and rough numbers and we will come back with a quote.",
  },
];
