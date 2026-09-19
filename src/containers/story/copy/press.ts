/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface PressQuote {
  id: string;
  quote: string;
  /** Placeholder source — no real publication is named or implied. */
  source: string;
}

/**
 * Placeholder press / recognition lines. These are **not** real coverage:
 * every `source` is the literal word "placeholder", exactly as the visitor
 * voices are attributed, so nothing here can be mistaken for a genuine
 * citation. Replace wholesale once confirmed press and any awards are
 * supplied and cleared (TODO(EMIN-COPY)).
 */
export const pressQuotes: PressQuote[] = [
  {
    id: "placeholder-1",
    quote: "A boutique hotel that treats its own name as a subject worth studying.",
    source: "Travel title — placeholder",
  },
  {
    id: "placeholder-2",
    quote: "One of the quietest addresses in Nakasero, and one of the most considered.",
    source: "City guide — placeholder",
  },
  {
    id: "placeholder-3",
    quote: "Heritage architecture, a spa in the garden, and a story it actually tells well.",
    source: "Design publication — placeholder",
  },
];
