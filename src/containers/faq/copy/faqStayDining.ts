/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { InventedFaq } from "@/containers/faq/types";

/**
 * Stay and dining questions the approved FAQ does not cover. Nothing here
 * contradicts `content/faq.ts` (early check-in "subject to availability and
 * charges", complimentary transfers on stays of more than one week); lead
 * times and service details are wording to confirm — TODO(EMIN-COPY).
 */
export const stayDiningFaqs: InventedFaq[] = [
  {
    id: "early-arrival-luggage",
    topic: "stay",
    question: "Can I leave my luggage if I arrive before check-in?",
    answer:
      "Of course. The porters store your bags securely from the moment you arrive, and you are welcome to relax in the lounges or the gardens until your room is ready. Landing early? Ask about early check-in when you book — it is subject to availability and charges.",
  },
  {
    id: "choosing-a-room",
    topic: "stay",
    question: "How do I choose between a room and a suite?",
    answer:
      "Superior Rooms suit short business stays, Deluxe Rooms are our value-led way in, and the Deluxe and Superior Suites add space to spread out on longer or shared stays. Tell us on WhatsApp who is travelling and why, and we will recommend the one that fits.",
  },
  {
    id: "long-stay-rates",
    topic: "stay",
    question: "Do you offer rates for longer stays?",
    answer:
      "Yes. Stays of a week or more are quoted individually, and airport pick-up and drop-off are complimentary on stays of more than one week. Send your dates and we will put a long-stay rate together.",
  },
  {
    id: "accessibility-needs",
    topic: "stay",
    question: "Can you help with accessibility needs?",
    answer:
      "Please tell us about any access needs when you book. We will allocate the room with the easiest route from the entrance, and arrange help with luggage and transport so that arriving is simple.",
  },
  {
    id: "dine-without-staying",
    topic: "dining",
    question: "Can I dine at the hotel without staying?",
    answer:
      "Yes — the restaurants, the rooftop terrace and the lounges welcome non-residents for lunch, dinner and drinks. Reserving a table ahead is recommended, especially at weekends.",
  },
  {
    id: "dietary-requirements",
    topic: "dining",
    question: "Can the kitchen cater for dietary requirements?",
    answer:
      "Yes. Let us know about allergies or dietary needs — vegetarian, vegan, gluten-free or otherwise — when you book, and remind your server on the day. The chefs adapt dishes wherever they can.",
  },
  {
    id: "in-room-dining",
    topic: "dining",
    question: "Is there in-room dining?",
    answer:
      "Yes. In-room dining brings a selection from the kitchen to your door, so a late arrival or an early start never means going without. Ask the desk for the current menu and hours.",
  },
  {
    id: "private-dining",
    topic: "dining",
    question: "Can I book a private dinner or celebration?",
    answer:
      "Yes. The lounges and the gardens can be reserved for private dinners, birthdays and anniversaries, with a menu planned with the chef. Share the date and the number of guests and we will suggest the right setting.",
  },
];
