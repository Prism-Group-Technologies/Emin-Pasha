/** ⚠️ INVENTED LEGAL COPY — NOT LEGAL ADVICE. See ../index.ts. */
import { LEGAL_ENTITY as E } from "@/containers/legal/copy/entity";
import type { LegalSection } from "@/containers/legal/types";

export const privacySectionsRights: LegalSection[] = [
  {
    id: "international-transfers",
    title: "International transfers",
    blocks: [
      {
        kind: "p",
        text: "Some of our service providers store data outside Uganda. Where they do, we rely on the safeguards the Data Protection and Privacy Act requires — adequate protection in the destination country or contractual clauses — and, for EU and UK guests, the equivalent GDPR mechanisms.",
      },
    ],
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    blocks: [
      {
        kind: "table",
        caption: "Retention periods (placeholders to confirm)",
        columns: ["Record", "Kept for"],
        rows: [
          ["Guest registration and invoices", "7 years after departure (tax and legal)"],
          ["Enquiries that did not become a booking", "12 months"],
          ["Spa health disclosures", "3 years after your last treatment"],
          ["CCTV footage", "30 days, unless needed for an incident"],
          ["Newsletter subscription", "Until you unsubscribe"],
        ],
      },
    ],
  },
  {
    id: "security",
    title: "How we keep it secure",
    blocks: [
      {
        kind: "list",
        items: [
          "Access restricted by role, with staff trained in confidentiality.",
          "Encrypted connections (HTTPS) across this website.",
          "Card details handled by PCI DSS-certified processors — never stored in full by us.",
          "Breaches reported to the regulator and affected guests as the law requires.",
        ],
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    blocks: [
      {
        kind: "p",
        text: "You can ask to access, correct or delete your data, object to or restrict how we use it, receive a portable copy, and withdraw consent. We will reply within 30 days and may ask you to confirm your identity first. There is no charge for a reasonable request.",
      },
      {
        kind: "callout",
        tone: "info",
        title: "Not happy with our answer?",
        text: `You may complain to ${E.regulator}. If you live in the EU or UK, you may also contact your local supervisory authority.`,
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    blocks: [
      {
        kind: "p",
        text: "We collect children's details only as part of a booking made by a parent or guardian. This website is not directed at children, and we do not knowingly collect their data online.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    blocks: [
      {
        kind: "p",
        text: `We review this policy at least once a year. This version was last updated on ${E.updated}; material changes will be highlighted on this page.`,
      },
    ],
  },
];
