import { FAQ_TOPIC_ORDER } from "@/containers/faq/anchors";
import { approvedFaqTopics, inventedFaqs } from "@/containers/faq/copy";
import type { FaqEntry, FaqPlacement, InventedFaq } from "@/containers/faq/types";
import { faqItems } from "@/content/faq";
import type { FaqItem } from "@/schemas/content/faqItem";

/**
 * Merges the approved answers — **verbatim**, from `content/faq.ts` — with
 * the invented ones from `copy/`, grouped in topic order (approved first
 * within each topic). Throws at module load if an approved answer has no
 * topic or two answers share an id, because every id is also a shareable
 * `#anchor` on the page.
 */
export function buildFaqCatalogue(
  approved: FaqItem[],
  placements: Record<string, FaqPlacement>,
  invented: InventedFaq[],
): FaqEntry[] {
  const fromApproved = approved.map((item): FaqEntry => {
    const placement = placements[item.id];
    if (!placement) {
      throw new Error(`FAQ "${item.id}" has no topic — add it to containers/faq/copy/topics.ts.`);
    }
    return { ...item, topic: placement.topic, popular: placement.popular ?? false, approved: true };
  });
  const fromInvented = invented.map((item): FaqEntry => ({
    ...item,
    popular: item.popular ?? false,
    approved: false,
  }));
  const all = [...fromApproved, ...fromInvented];

  const seen = new Set<string>();
  for (const entry of all) {
    if (seen.has(entry.id)) {
      throw new Error(`Duplicate FAQ id "${entry.id}".`);
    }
    seen.add(entry.id);
  }

  return FAQ_TOPIC_ORDER.flatMap((topic) => all.filter((entry) => entry.topic === topic));
}

/** Every answer on `/faq`, in render order. */
export const faqCatalogue = buildFaqCatalogue(faqItems, approvedFaqTopics, inventedFaqs);

/** The "Most asked" set — the aside list and the panel badges. */
export const popularFaqs = faqCatalogue.filter((entry) => entry.popular);

export const faqById = (id: string) => faqCatalogue.find((entry) => entry.id === id);
