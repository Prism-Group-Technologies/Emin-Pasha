/** ⚠️ INVENTED COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * Shared UI strings for every legal page band, in scroll order. Plain strings
 * and no imports, so the client islands (table of contents, sticky bar,
 * cookie panel) can import this leaf directly without the content layer.
 */
export const legalSections = {
  hero: {
    primaryCta: "Read the summary",
    secondaryCta: "Ask on WhatsApp",
    updated: "Last updated",
    readTime: "Minute read",
    sections: "Sections",
    version: "Version",
  },
  summary: { badge: "Plain-English summary" },
  document: {
    eyebrow: "§ THE FULL DOCUMENT",
    tocLabel: "On this page",
    switcherLabel: "Policies & settings",
    askSection: "Ask about this section",
    backToTop: "Back to contents",
    progressLabel: "Reading progress",
  },
  aside: {
    heading: "Prefer to ask a person?",
    body: "Message the front desk on WhatsApp — questions about your data, a booking term or access needs are passed to the right person.",
    whatsapp: "Ask on WhatsApp",
    call: "Call the desk",
  },
  request: { cta: "Make this request" },
  promise: {
    eyebrow: "§ DISCRETION, BY DESIGN",
    heading: "Privacy has always been part of the welcome",
    body: "Diplomats, delegations and guests who simply want to be left alone have chosen the estate for its quiet. The same discretion applies to your details: collected only to look after you, never sold, and kept behind the garden walls.",
    points: [
      "Your details are never sold or rented",
      "Card payments handled by certified processors",
      "One message to see, correct or delete your data",
    ],
    primaryCta: "Plan a private stay",
    secondaryCta: "Book direct on WhatsApp",
  },
  closing: {
    eyebrow: "§ STILL HAVE A QUESTION?",
    heading: "Ask us plainly — a person will answer",
    supporting:
      "About your data, a booking term, cookies or access to the estate. One WhatsApp message, and the desk takes it from there.",
    whatsapp: "Ask on WhatsApp",
    call: "Call",
  },
  related: {
    eyebrow: "§ POLICIES & SETTINGS",
    heading: "Everything else, in one place",
    planEyebrow: "§ KEEP PLANNING",
    planHeading: "Now, back to the good part",
    current: "You are here",
  },
  sticky: {
    lead: "Questions about this policy?",
    whatsapp: "Ask on WhatsApp",
    contents: "Contents",
  },
};
