/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface WellnessFaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * The questions the wellness desk fields most. Answers stay inside what the
 * source supports — public pool and gym access, non-resident membership, the
 * spa etiquette policy's arrival and age lines (§14) — and flag anything not
 * yet confirmed (exact prices, the live class timetable) rather than
 * inventing a policy.
 */
export const wellnessFaq: WellnessFaqItem[] = [
  {
    id: "non-guest",
    question: "Can I use the spa, gym or pool if I am not staying at the hotel?",
    answer:
      "Yes. The pool is open to the general public, gym membership is available to non-residents of the neighbourhood, and the spa takes external bookings alongside hotel guests. Message the wellness desk and we will sort access.",
  },
  {
    id: "prices",
    question: "Are the prices on this page final?",
    answer:
      "They are indicative, so you can plan. Treatment, membership and day-pass prices are confirmed by the wellness desk when you book — they can shift with the season, the length of the treatment and any package you add.",
  },
  {
    id: "arrival",
    question: "How early should I arrive for a treatment?",
    answer:
      "Fifteen minutes before your start time. That covers changing, a short health form and settling into the relaxation lounge. Arriving late may mean a shorter treatment, as the next guest's time is held.",
  },
  {
    id: "ages",
    question: "Is there a minimum age?",
    answer:
      "The spa is for guests aged 16 and over. Children are welcome at the pool when accompanied by a parent or guardian, and children's swim lessons start at age 4. There is no lifeguard on duty, so an adult must supervise at all times.",
  },
  {
    id: "bring",
    question: "What do I need to bring?",
    answer:
      "For the spa, nothing — robe, slippers and towels are provided. For the gym and pool, bring training kit and swimwear; towels and lockers are available. Leave valuables in your room or at reception.",
  },
  {
    id: "cancellation",
    question: "What is the cancellation policy?",
    answer:
      "Let the wellness desk know at least 24 hours ahead and there is no charge. Inside 24 hours, or a no-show, may be charged in full — the therapist's or trainer's time was held for you. The exact terms are confirmed when you book.",
  },
];
