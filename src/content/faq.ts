import { type FaqItem, faqItemSchema } from "@/schemas/content/faqItem";

/** docs/02_CONTENT_SOURCE_OF_TRUTH.md §15 — publish as written; mirrors FAQPage schema. */
const raw: FaqItem[] = [
  {
    id: "where-is-the-hotel",
    question: "Where exactly is the hotel?",
    answer:
      "Plot 27 Akii Bua Road, Nakasero, Kampala — in the city's diplomatic and business quarter, close to the commercial district and cultural attractions, but set back inside landscaped private gardens.",
  },
  {
    id: "check-in-check-out-times",
    question: "What are check-in and check-out times?",
    answer:
      "Check-in from 14h00, check-out strictly by 10h00. Early check-in and late check-out are available on request, subject to availability and charges.",
  },
  {
    id: "airport-transfers",
    question: "Do you offer airport transfers?",
    answer:
      "Yes. Our chauffeured transfer service operates to and from the airport, with flight monitoring so that your driver is waiting regardless of delays. Airport pick-up and drop-off are complimentary on stays of more than one week. Arrange yours at reservations@eminpasha.com.",
  },
  {
    id: "breakfast-included",
    question: "Is breakfast included?",
    answer:
      "Yes — guests are entitled to an à la carte breakfast with a bespoke service offering. Children may not be eligible for complimentary breakfast.",
  },
  {
    id: "wifi",
    question: "Is there Wi-Fi?",
    answer: "Yes — fast, unlimited internet across a secure cabled and Wi-Fi fibre network.",
  },
  {
    id: "parking",
    question: "Is there parking?",
    answer:
      "Yes — adequate and secure parking in a state-of-the-art lot, manned by security personnel.",
  },
  {
    id: "non-guests-pool-spa-gym",
    question: "Can non-guests use the pool, spa or gym?",
    answer:
      "Yes. The pool is open to hotel guests and the general public, for swimming or as a venue for poolside parties and events. Gym membership is available for purchase, giving access to our modern facility and professional trainers. The spa welcomes non-resident bookings.",
  },
  {
    id: "children-welcome",
    question: "Are children welcome?",
    answer:
      "Yes. Children stay free using existing bedding, and may use the hotel pool accompanied by a parent or adult. Please note the Spa, Health Club and hydrothermal facilities are restricted to guests aged 16 and over.",
  },
  {
    id: "pool-lifeguard",
    question: "Is there a lifeguard at the pool?",
    answer:
      "No. The maximum depth is 1.60m, and children may only use the pool when accompanied by an adult, parent or guardian.",
  },
  {
    id: "weddings-and-conferences",
    question: "Do you host weddings and conferences?",
    answer:
      "Yes. Kudara Hall for conferences and corporate events, private meeting rooms for board-level sessions, and the Equatorial Gardens and wider grounds for weddings, receptions and outdoor events — with accommodation, three restaurants and a dedicated F&B support team on site.",
  },
  {
    id: "payment-methods",
    question: "What payment methods do you accept?",
    answer:
      "Visa, MasterCard and American Express. Electronic funds transfers must be completed one week before check-in with proof of payment sent for verification. Local company bookings require an LPO before arrival, or full prepayment.",
  },
  {
    id: "cancellation-policy",
    question: "What is your cancellation policy?",
    answer:
      "Cancellations must be made in writing at least 48 hours before arrival. No-shows and late cancellations are charged at one night's full accommodation including taxes; during high occupancy, the full number of nights will be charged.",
  },
  {
    id: "gift-shop",
    question: "Do you have a gift shop?",
    answer: "Yes — the Emin Pasha CG Shop, selling authentic Ugandan art pieces and décor.",
  },
];

export const faqItems: FaqItem[] = raw.map((item) => faqItemSchema.parse(item));
