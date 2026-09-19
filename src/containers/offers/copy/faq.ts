/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface OffersFaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * What guests ask before claiming an offer. Check-in and check-out are the
 * approved `content/identity.ts` times; every policy line below is invented
 * wording to confirm with the hotel — TODO(EMIN-COPY), TODO(EMIN-Q08).
 */
export const offersFaq: OffersFaqItem[] = [
  {
    id: "how-to-claim",
    question: "How do I claim an offer?",
    answer:
      "Tap “Claim on WhatsApp” on the offer. The message opens already naming the package — add your dates and the number of guests, and our team confirms availability and holds it for you.",
  },
  {
    id: "combine",
    question: "Can I combine two offers?",
    answer:
      "Offers cannot usually be stacked on the same room night, but you can pair them across a stay — a Weekender with the Sunday Garden Brunch, for example. Ask and we will price the combination.",
  },
  {
    id: "residents",
    question: "Are the offers open to Kampala residents and non-residents alike?",
    answer:
      "Yes. Every offer on this page is open to everyone; a few seasonal packages add a residents' rate, which we apply when you claim.",
  },
  {
    id: "changes",
    question: "What if my plans change?",
    answer:
      "Dates can be changed free of charge up to 48 hours before arrival. Seasonal and gala packages carry their own cancellation terms, which we send in writing before you pay.",
  },
  {
    id: "check-in",
    question: "What are check-in and check-out times on a package?",
    answer:
      "Check-in is from 2pm and check-out is by 10am. Packages that include a late check-out extend that to 2pm, subject to the day's arrivals.",
  },
  {
    id: "gift",
    question: "Can I buy an offer as a gift?",
    answer:
      "Most stay, spa and dining offers can be issued as a gift voucher in the recipient's name. Tell us who it is for and we will send a voucher you can print or forward.",
  },
];
