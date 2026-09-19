/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { InventedFaq } from "@/containers/faq/types";

/**
 * Events and policy questions the approved FAQ does not cover. The LPO and
 * 48-hour rules echo `content/faq.ts`; planning lead times, AV provision and
 * the booking-guarantee wording are to confirm — TODO(EMIN-COPY).
 */
export const eventsPoliciesFaqs: InventedFaq[] = [
  {
    id: "event-lead-time",
    topic: "events",
    question: "How far in advance should I plan an event?",
    answer:
      "For conferences and corporate events, four to eight weeks gives the most choice of dates and rooms. Weddings are usually planned six to twelve months ahead — but do ask about shorter notice, as dates open up.",
  },
  {
    id: "site-visit",
    topic: "events",
    question: "Can I see the venues before booking?",
    answer:
      "Yes. The events team will walk you through Kudara Hall, the meeting rooms and the gardens, and talk through layouts, menus and timings. Message us to arrange a visit at a time that suits you.",
  },
  {
    id: "event-av-equipment",
    topic: "events",
    question: "Is audio-visual equipment available for meetings?",
    answer:
      "Yes — projection, screens, sound and a fast fibre connection can be set up for your meeting, with the business centre on hand for printing and support. List what you need when you enquire.",
  },
  {
    id: "event-guest-rooms",
    topic: "events",
    question: "Can you hold rooms for our event guests?",
    answer:
      "Yes. We can hold a block of rooms for delegates or wedding guests alongside your event, so everyone stays, meets and dines on the same estate.",
  },
  {
    id: "book-direct",
    topic: "policies",
    popular: true,
    question: "Is it better to book directly with the hotel?",
    answer:
      "Booking direct is never more expensive than a booking site, and it is the only way to ask for a specific room, a late check-out or an airport pick-up in the same conversation.",
  },
  {
    id: "booking-guarantee",
    topic: "policies",
    question: "Do I need to pay a deposit to book?",
    answer:
      "It depends on your dates and the type of booking. When the team confirms your quote, they tell you exactly how the reservation is guaranteed — by card, by transfer or, for local companies, with an LPO.",
  },
  {
    id: "company-invoicing",
    topic: "policies",
    question: "Can my company be invoiced for a stay?",
    answer:
      "Yes. Local company bookings are accepted with an LPO issued before arrival, or with full prepayment. We can send a proforma invoice to your finance team on request.",
  },
  {
    id: "changing-dates",
    topic: "policies",
    question: "Can I change the dates of my booking?",
    answer:
      "Yes, subject to availability. Send changes in writing — WhatsApp or email is fine — as early as you can. Changes made within 48 hours of arrival may fall under the cancellation policy.",
  },
];
