import { type RevealDirection, alternatingDirection } from "@/theme/motion";

/**
 * Scroll choreography for the legal pages, in scroll order — the same pattern
 * as `containers/faq/motion.ts`. The hero is absent on purpose: it is above
 * the fold, so a viewport-keyed reveal would only risk flashing the LCP.
 */
function choreograph<const T extends readonly string[]>(order: T) {
  return Object.fromEntries(order.map((id, index) => [id, alternatingDirection(index)])) as Record<
    T[number],
    RevealDirection
  >;
}

export const legalDocumentMotion = choreograph([
  "summary",
  "document",
  "highlights",
  "promise",
  "closing",
  "related",
  "plan",
] as const);

export const cookieSettingsMotion = choreograph([
  "settings",
  "steps",
  "faq",
  "promise",
  "closing",
  "related",
  "plan",
] as const);
