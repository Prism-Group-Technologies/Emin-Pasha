/** ⚠️ INVENTED LEGAL COPY — NOT LEGAL ADVICE. See ../index.ts. */
import { LEGAL_ENTITY as E } from "@/containers/legal/copy/entity";
import type { LegalSection } from "@/containers/legal/types";

export const privacySectionsCollect: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    blocks: [
      {
        kind: "p",
        text: `${E.tradingName} is operated by ${E.registeredName} (registration no. ${E.registrationNumber}), ${E.address}. We are the data controller for the personal data described in this policy, registered with ${E.regulator} under ${E.pdpoRegistration}.`,
      },
      {
        kind: "p",
        text: `Our Data Protection Officer is ${E.dpoName}, reachable at ${E.dpoEmail}, on ${E.telephone}, or by WhatsApp using the buttons on this page.`,
      },
    ],
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    blocks: [
      {
        kind: "table",
        caption: "Personal data we collect, and where it comes from",
        columns: ["Category", "Examples", "Source"],
        rows: [
          [
            "Identity",
            "Name, title, nationality, passport or ID number",
            "You, at booking or check-in",
          ],
          ["Contact", "Email, phone, WhatsApp number, postal address", "You, or your travel agent"],
          ["Stay", "Dates, room, guests, special requests, dietary and access needs", "You"],
          [
            "Payment",
            "Card type and last four digits, invoices, billing company",
            "You, payment processor",
          ],
          ["Wellness", "Health disclosures for treatments, spa history", "You, at the spa"],
          ["Security", "CCTV images in public areas, key-card logs", "Our systems"],
          ["Online", "Device, pages viewed, cookie choices", "Our website, with consent"],
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Sensitive data",
        text: "Health information for spa treatments and any access needs you share are special-category data. We use them only to keep you safe and comfortable, with your explicit consent.",
      },
    ],
  },
  {
    id: "why-we-use-it",
    title: "Why we use it, and our legal basis",
    blocks: [
      {
        kind: "table",
        caption: "Purposes and the lawful basis for each",
        columns: ["Purpose", "Lawful basis"],
        rows: [
          ["Taking and managing bookings, check-in and billing", "Performance of a contract"],
          ["Registering guests as required by Ugandan law", "Legal obligation"],
          ["Safety of guests and staff, including CCTV", "Legitimate interests"],
          ["Answering enquiries on WhatsApp, phone or email", "Legitimate interests"],
          ["Newsletters and offers", "Consent — withdraw any time"],
          ["Analytics and marketing cookies", "Consent — see the Cookie policy"],
          ["Spa health screening", "Explicit consent"],
        ],
      },
    ],
  },
  {
    id: "who-we-share-with",
    title: "Who we share it with",
    blocks: [
      {
        kind: "list",
        items: [
          "Payment processors and our bank, to take deposits and settle bills.",
          "Booking platforms and travel agents, where you booked through them.",
          "Airport transfer drivers, who receive only your name, flight and pick-up time.",
          "IT, hosting and email providers acting on our written instructions.",
          "Authorities, where Ugandan law requires guest registration or a lawful request is made.",
        ],
      },
      {
        kind: "p",
        text: "We never sell personal data, and we do not share it with third parties for their own marketing.",
      },
    ],
  },
];
