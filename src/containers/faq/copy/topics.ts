/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { FaqPlacement } from "@/containers/faq/types";

/**
 * Where each approved `content/faq.ts` answer sits on the page, keyed by its
 * id. The answers themselves are never restated here — only their topic and
 * whether they are flagged "Most asked". `catalogue.test.ts` fails if an
 * approved id is missing or a key here goes stale.
 */
export const approvedFaqTopics: Record<string, FaqPlacement> = {
  "where-is-the-hotel": { topic: "arrival" },
  "check-in-check-out-times": { topic: "stay", popular: true },
  "airport-transfers": { topic: "arrival", popular: true },
  "breakfast-included": { topic: "dining", popular: true },
  wifi: { topic: "stay" },
  parking: { topic: "arrival" },
  "non-guests-pool-spa-gym": { topic: "wellness", popular: true },
  "children-welcome": { topic: "stay" },
  "pool-lifeguard": { topic: "wellness" },
  "weddings-and-conferences": { topic: "events" },
  "payment-methods": { topic: "policies" },
  "cancellation-policy": { topic: "policies", popular: true },
  "gift-shop": { topic: "stay" },
};
