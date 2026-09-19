/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface StoryFaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * A short FAQ for the pillar page — kept inside what the record and
 * `content/identity.ts` support. Anything not confirmed (the building's exact
 * date, tour availability) is flagged rather than invented.
 */
export const storyFaq: StoryFaqItem[] = [
  {
    id: "who",
    question: "Who was Emin Pasha, in one line?",
    answer:
      "A German-born doctor, naturalist and linguist — born Eduard Schnitzer — who took the name Mehemet Emin in Khartoum, governed the province of Equatoria, and grew so attached to this part of Africa that he refused to be rescued from it. The full account is above.",
  },
  {
    id: "why-name",
    question: "Why is the hotel named after him?",
    answer:
      "Because his instinct was to understand rather than to conquer, he was fluent in the languages of the people around him, and he was actively opposed to the slave trade. Among the figures of the colonial age, he is a genuinely unusual one to admire — and the one the hotel chooses to.",
  },
  {
    id: "building",
    question: "Is the building historic?",
    answer:
      "The hotel is a boutique property in Nakasero whose architecture is designed to read as heritage and whose décor draws on Uganda's own. The precise construction history is confirmed by the front desk rather than published here.",
  },
  {
    id: "visit",
    question: "Can I visit for the history without staying?",
    answer:
      "The public rooms, the gardens, the spa and the pool are open to visitors, and several spaces carry names from the story. For a stay built around the history, send the enquiry above and we will put something together.",
  },
  {
    id: "sources",
    question: "Where does the account come from?",
    answer:
      "It is a straight retelling of the published biographical record — no date, place or claim has been added by the hotel. If a detail cannot be stood behind, it is not on the page.",
  },
];
