/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface DiningFaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Six questions the reservations desk fields most. Answers stay inside what
 * the source supports — 24/7 in-room dining, breakfast entitlement for
 * resident guests, the garden setting, transfers — and flag anything not yet
 * confirmed rather than inventing a policy.
 */
export const diningFaq: DiningFaqItem[] = [
  {
    id: "dress-code",
    question: "Is there a dress code?",
    answer:
      "Smart-casual across all the outlets. Sir Samuel Baker leans a little more formal in the evening — a collared shirt or equivalent is the right note. The Rooftop Terrace is relaxed.",
  },
  {
    id: "dietary",
    question: "Can you cater for dietary requirements and allergies?",
    answer:
      "Yes. Vegetarian and vegan options are on every menu, and the kitchen will adapt dishes for allergies, coeliac, halal and other needs. Tell us when you reserve so the brigade can plan — 24 hours' notice for the tasting menu.",
  },
  {
    id: "children",
    question: "Are children welcome?",
    answer:
      "Children are welcome at Hakki Pasha and, earlier in the evening, on the Rooftop Terrace, with a children's menu and high chairs available. Sir Samuel Baker's tasting menu is better suited to older children and adults.",
  },
  {
    id: "walk-ins",
    question: "Do you take walk-ins, or do I need to book?",
    answer:
      "Walk-ins are welcome at Hakki Pasha and the Rooftop Terrace when there is space, but sunset tables and weekend evenings fill quickly — a reservation is the safe bet. Sir Samuel Baker is by reservation only.",
  },
  {
    id: "corkage",
    question: "Can I bring my own wine?",
    answer:
      "The reservations desk can confirm current corkage terms and any per-bottle limit when you book. The Manutea list is deep enough that most guests do not need to.",
  },
  {
    id: "private-hire",
    question: "Can I book a room for a private party or business dinner?",
    answer:
      "Yes — a chef's table for up to eight, a private dining room for up to twenty-four, or the whole rooftop for a standing reception. Start with the reservation form below and note the occasion and numbers.",
  },
];
