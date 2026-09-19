/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface ContactFaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * The questions the desk fields before anyone books. Check-in and check-out
 * times match `content/identity.ts`; everything else is service wording to
 * confirm — TODO(EMIN-COPY).
 */
export const contactFaq: ContactFaqItem[] = [
  {
    id: "reply",
    question: "How quickly will I hear back?",
    answer:
      "WhatsApp messages are usually answered within the hour between 7am and 11pm. Emails and the form get a personal reply the same working day — enquiries sent late at night are picked up first thing.",
  },
  {
    id: "best-rate",
    question: "Is it cheaper to book with you directly?",
    answer:
      "Booking direct is never more expensive than a booking site, and it is the only way to ask for a specific room, a late check-out or an airport pick-up in the same conversation.",
  },
  {
    id: "check-in",
    question: "What are check-in and check-out times?",
    answer:
      "Check-in is from 2:00pm and check-out is by 10:00am. Early arrivals and late departures can often be arranged — ask when you enquire.",
  },
  {
    id: "transfer",
    question: "Can you collect me from Entebbe airport?",
    answer:
      "Yes. Send your flight number and arrival time and a driver will meet you at arrivals. The drive to Nakasero takes around an hour, depending on traffic.",
  },
  {
    id: "visitors",
    question: "Can I visit the restaurants or spa without staying?",
    answer:
      "Of course. The restaurants, terrace, spa, gym and pool all welcome visitors. For a table or a treatment, reserve ahead so we can hold the time for you.",
  },
  {
    id: "site-visit",
    question: "Can I see the rooms or event spaces before booking?",
    answer:
      "Yes — tell us when suits you and we will walk you through the rooms, the gardens and the event spaces, usually with coffee on the terrace.",
  },
];
