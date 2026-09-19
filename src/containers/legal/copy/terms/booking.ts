/** ⚠️ INVENTED LEGAL COPY — NOT LEGAL ADVICE. Windows and percentages are placeholders. */
import { LEGAL_ENTITY as E } from "@/containers/legal/copy/entity";
import type { LegalSection } from "@/containers/legal/types";

export const termsSectionsBooking: LegalSection[] = [
  {
    id: "about-these-terms",
    title: "About these terms",
    blocks: [
      {
        kind: "p",
        text: `These terms apply to rooms, dining, spa, events and other services booked with ${E.tradingName}, operated by ${E.registeredName}. Using this website or confirming a booking means you accept them. Event contracts and group agreements may add their own conditions.`,
      },
    ],
  },
  {
    id: "making-a-booking",
    title: "Making a booking",
    blocks: [
      {
        kind: "list",
        items: [
          "A booking is confirmed once we send written confirmation by email or WhatsApp.",
          "The lead guest must be 18 or over and present valid photo ID or a passport at check-in.",
          "Please check names, dates and room types on your confirmation and tell us of any error straight away.",
        ],
      },
    ],
  },
  {
    id: "rates-and-payment",
    title: "Rates, deposits and payment",
    blocks: [
      {
        kind: "p",
        text: "Rates are per room, per night, and include applicable taxes unless stated. We accept major cards, bank transfer and mobile money. A deposit of the first night is taken at booking; non-refundable rates are charged in full.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Currency",
        text: "Prices may be shown in USD for convenience and settled in UGX at the exchange rate on the day of payment.",
      },
    ],
  },
  {
    id: "changes-and-cancellations",
    title: "Changes and cancellations",
    blocks: [
      {
        kind: "table",
        caption: "Cancellation charges by rate type (placeholders to confirm)",
        columns: ["Rate", "Cancel free until", "After that"],
        rows: [
          ["Flexible", "72 hours before arrival", "First night charged"],
          ["Advance purchase", "Non-refundable", "Full stay charged"],
          ["Groups (5+ rooms)", "21 days before arrival", "Per group contract"],
          ["Events", "Per event contract", "Per event contract"],
        ],
      },
      {
        kind: "p",
        text: "Leaving earlier than booked, or not arriving, is charged as a late cancellation. Spa appointments cancel free until 4 hours before.",
      },
    ],
  },
];
