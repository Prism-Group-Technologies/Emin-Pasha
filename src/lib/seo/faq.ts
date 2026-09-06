import { site } from "@/config/site";
import type { FaqItem } from "@/schemas/content/faqItem";

/**
 * `FAQPage` — mirrors `/faq` exactly. Both render from the same
 * `content/faq.ts` array in the same order, so the markup and the visible
 * page can never disagree, which is the specific failure CLAUDE.md §9 warns
 * gets a page dropped from answer engines.
 */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${site.url}/faq#faqpage`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
