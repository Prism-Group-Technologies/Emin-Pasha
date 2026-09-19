import type { IconName } from "@/components/atoms/Icon";

/**
 * In-page anchor ids and the topic vocabulary for the FAQ page — deliberately
 * **runtime import-free** (the one import is type-only and erased), the same
 * split `containers/offers/anchors.ts` makes. The client islands (the search
 * explorer, the sticky bar) need these values, and pulling in the
 * Zod-validated content layer to get them would drag it into a client bundle
 * (DECISIONS.md D25).
 */

/** The searchable explorer — every "search the answers" CTA points here. */
export const QUESTIONS_ANCHOR_ID = "questions";

/** The plan-your-stay guide cards. */
export const GUIDES_ANCHOR_ID = "plan-your-stay";

/** Filter-chip labels, in the order the chips and the catalogue are written. */
export const FAQ_TOPIC_LABEL = {
  stay: "Your stay",
  arrival: "Getting here",
  dining: "Dining",
  wellness: "Spa & wellness",
  events: "Meetings & events",
  policies: "Payments & policies",
} as const;

export type FaqTopicId = keyof typeof FAQ_TOPIC_LABEL;

export const FAQ_TOPIC_ORDER = Object.keys(FAQ_TOPIC_LABEL) as FaqTopicId[];

export const FAQ_TOPIC_ICON: Record<FaqTopicId, IconName> = {
  stay: "king-bed",
  arrival: "flight",
  dining: "restaurant",
  wellness: "spa",
  events: "celebration",
  policies: "receipt",
};

/**
 * How each topic reads inside the reviewed `faqTopic` WhatsApp template —
 * "I have a question about {topic}." A closed list, so the messages the
 * property can receive under a guest's name stay reviewable in one place.
 */
export const FAQ_TOPIC_PHRASE: Record<FaqTopicId, string> = {
  stay: "my stay",
  arrival: "getting to the hotel",
  dining: "dining",
  wellness: "the spa, pool or gym",
  events: "meetings and events",
  policies: "payments and policies",
};
