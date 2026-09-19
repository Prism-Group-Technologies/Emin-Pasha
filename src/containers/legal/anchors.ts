/**
 * Route paths, in-page anchor ids and WhatsApp topic phrases for the legal
 * pages — deliberately **import-free**, the same split `containers/faq/anchors.ts`
 * makes. The client islands (table of contents, sticky bar, cookie settings
 * panel) need these values, and pulling in the Zod-validated content layer to
 * get them would drag it into a client bundle (DECISIONS.md D25).
 */

export type LegalPageId = "privacy" | "cookies" | "terms" | "accessibility" | "cookie-settings";

/** The four long-form documents; Cookie Settings is a control panel, not a document. */
export type LegalDocId = Exclude<LegalPageId, "cookie-settings">;

export const LEGAL_PATH: Record<LegalPageId, string> = {
  privacy: "/privacy-policy",
  cookies: "/cookie-policy",
  terms: "/terms",
  accessibility: "/accessibility",
  "cookie-settings": "/cookie-settings",
};

/** Order the cross-links render in, in the switcher and the related band. */
export const LEGAL_PAGE_ORDER: LegalPageId[] = [
  "privacy",
  "cookies",
  "cookie-settings",
  "terms",
  "accessibility",
];

/** The layered "at a glance" summary — every "read the summary" CTA points here. */
export const SUMMARY_ANCHOR_ID = "at-a-glance";

/** The full document body with its sticky table of contents. */
export const DOCUMENT_ANCHOR_ID = "full-document";

/** The live consent controls on /cookie-settings. */
export const SETTINGS_ANCHOR_ID = "your-choices";

/**
 * How each page reads inside the reviewed `legalTopic` WhatsApp template —
 * "I have a question about {topic}." A closed list.
 */
export const LEGAL_TOPIC_PHRASE: Record<LegalPageId, string> = {
  privacy: "your privacy policy and how you use my personal data",
  cookies: "the cookies your website uses",
  terms: "your booking terms and conditions",
  accessibility: "accessibility at the hotel",
  "cookie-settings": "my cookie preferences on your website",
};

/** Data-rights request phrases — the privacy page's rights cards use these only. */
export const LEGAL_REQUEST_PHRASE = {
  access: "a request for a copy of my personal data",
  correct: "a request to correct my personal data",
  erase: "a request to delete my personal data",
  object: "objecting to marketing or profiling",
  portability: "a request to transfer my personal data",
  withdraw: "withdrawing my consent",
  assistance: "arranging accessibility assistance for my visit",
  feedback: "an accessibility barrier on your website",
} as const;

export type LegalRequestId = keyof typeof LEGAL_REQUEST_PHRASE;
