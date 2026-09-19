import type { FaqTopicId } from "@/containers/faq/anchors";

/**
 * One answer as the page renders it — plain data, so it crosses the server →
 * client boundary into the search explorer as props.
 */
export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  topic: FaqTopicId;
  /** Flagged "Most asked" and listed in the explorer's aside. */
  popular: boolean;
  /** True for the governed `content/faq.ts` answers — the only ones in `FAQPage` markup. */
  approved: boolean;
}

/** Where an approved `content/faq.ts` answer sits on the page. */
export interface FaqPlacement {
  topic: FaqTopicId;
  popular?: boolean;
}

/** An invented answer from `containers/faq/copy` — not client-approved. */
export interface InventedFaq {
  id: string;
  question: string;
  answer: string;
  topic: FaqTopicId;
  popular?: boolean;
}
