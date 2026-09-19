/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface EventFaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * The questions the events desk fields most. Answers stay inside what the
 * source supports — secure parking, three restaurants for catering, on-site
 * accommodation, the §14 group booking terms (14-day confirmation, rooming
 * lists 7 days out, 50% deposit above 10 rooms) — and flag anything not yet
 * confirmed (exact capacities, response-time SLA, cancellation scale) rather
 * than inventing a policy.
 */
export const eventFaq: EventFaqItem[] = [
  {
    id: "hold",
    question: "Can you hold a date while we decide?",
    answer:
      "Yes. We place a provisional hold once you have a proposal, usually for ten working days. If another enquiry comes in for the same date we will call you first and give you the chance to confirm before releasing it.",
  },
  {
    id: "capacities",
    question: "Are the capacities on this page final?",
    answer:
      "They are indicative maximums so you can shortlist rooms. Your real number depends on staging, a dance floor, AV positions and catering style, so the exact figure for your layout is confirmed on the proposal and at the site visit.",
  },
  {
    id: "catering",
    question: "Do we have to use your catering?",
    answer:
      "Yes — and it is a feature, not a restriction. All food and drink come from the hotel's three restaurants, so there is no external caterer's mark-up, tastings happen on site, and dietary requirements are handled by the kitchen that will cook on the day.",
  },
  {
    id: "av",
    question: "Is AV included or brought in?",
    answer:
      "Kudara Hall has an in-house stage set, screens, projection and a sound system, and a technician is on site for the event. Specialist rigs — LED walls, multi-camera, simultaneous interpretation — are brought in through our partners and quoted in the proposal.",
  },
  {
    id: "deposit",
    question: "What are the payment terms?",
    answer:
      "A signed contract and a deposit confirm the booking, with the balance due before the event. Bookings over ten rooms follow our group terms — written confirmation within 14 days, rooming lists 7 days out, and a 50% deposit. The exact schedule is on your contract.",
  },
  {
    id: "rooms",
    question: "Can our delegates and guests stay on site?",
    answer:
      "Yes. We hold a room block against your event — delegate rates for a conference, a guest block and bridal suite for a wedding — on the same estate, so nobody is travelling across Kampala late at night. Unused rooms are released back on an agreed date.",
  },
];
