/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { WellnessFaqItem } from "@/containers/wellness/copy/faq";

/**
 * The transfer FAQ. Typed against the wellness FAQ item shape (id, question,
 * answer), which the shared `Accordion` expects. The complimentary benefit
 * and reservations@ are approved §8 facts; waiting times, payment methods and
 * the cancellation window are invented (TODO(EMIN-Q09)). Import-type only, so
 * the client FAQ island can read it (D25).
 */
export const transferFaq: WellnessFaqItem[] = [
  {
    id: "find-driver",
    question: "How will I find my chauffeur at Entebbe?",
    answer:
      "Walk out of customs into the arrivals hall and look for your name on an Emin Pasha board. The evening before, we WhatsApp you the chauffeur's name, photo and number plate, so you know exactly who to look for.",
  },
  {
    id: "delay",
    question: "What if my flight is delayed or lands early?",
    answer:
      "We track every flight live and move the pickup to match, at no charge. Your first 60 minutes after landing are free for immigration and bags; after that, waiting is US$10 per 30 minutes, and never for an airline delay.",
  },
  {
    id: "price",
    question: "Is the fare per person or per car?",
    answer:
      "Per car, fixed, and including the Expressway toll and airport parking. The fares on this page are indicative — reservations confirms the exact figure when you book, and it does not change after that.",
  },
  {
    id: "complimentary",
    question: "Who gets a complimentary transfer?",
    answer:
      "Guests staying more than one week — eight nights or more — get their airport transfers on us, arrival and departure, in any car that fits the party. Add-ons like VIP meet & assist are still charged.",
  },
  {
    id: "payment",
    question: "How do I pay?",
    answer:
      "Nothing is taken when you book. Hotel guests can add the fare to their room bill; otherwise pay the chauffeur by card, mobile money, or cash in US dollars or Ugandan shillings.",
  },
  {
    id: "non-guests",
    question: "Can I book a transfer if I'm not staying at the hotel?",
    answer:
      "Yes. Anyone can book an airport transfer or a chauffeur by the hour — we just need a pickup address in Kampala if it isn't the hotel.",
  },
  {
    id: "children",
    question: "Do you have child seats?",
    answer:
      "Yes — infant, child and booster seats, fitted and checked before collection. Add them in the booking form so we bring the right size.",
  },
  {
    id: "cancel",
    question: "What if my plans change?",
    answer:
      "Cancel or change for free up to 12 hours before pickup. If your flight is cancelled by the airline, there is never a charge — just message us when you have the new flight.",
  },
];
