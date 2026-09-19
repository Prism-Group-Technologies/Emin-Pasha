import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { sections } from "@/containers/faq/copy";
import { faqSectionMotion as m } from "@/containers/faq/motion";
import { FaqClosingSection } from "@/containers/faq/organisms/FaqClosingSection";
import { FaqExplorerSection } from "@/containers/faq/organisms/FaqExplorerSection";
import { FaqHero } from "@/containers/faq/organisms/FaqHero";
import { PlanYourStaySection } from "@/containers/faq/organisms/PlanYourStaySection";
import { QuickAnswersSection } from "@/containers/faq/organisms/QuickAnswersSection";
import { StickyFaqCta } from "@/containers/faq/organisms/StickyFaqCta";
import { VoicesTrustSection } from "@/containers/faq/organisms/VoicesTrustSection";

/**
 * The FAQ, rebuilt as a help centre that converts — the same funnel shape as
 * the Contact, Offers and Spaces redesigns. A Server Component that composes
 * the section organisms and holds no logic of its own; the client islands are
 * the search explorer and the sticky bar. Every "ask a person" CTA is WhatsApp.
 *
 *   hero      — search or ask on WhatsApp, with a figure rail
 *   quick     — six at-a-glance answers that jump to the full ones
 *   questions — search + topic chips + accordion, beside "Most asked" and an
 *               ask-us card, #questions
 *   guides    — plan-your-stay cards cross-selling transfers, dining, spa, events
 *   voices    — the three approved reviews over three service promises
 *   closing   — dark band, WhatsApp or call
 *   related   — onward links
 *
 * **Structured data.** `app/faq/page.tsx` still builds `FAQPage` JSON-LD from
 * `content/faq.ts` alone. Those 13 approved answers render verbatim here, each
 * in the DOM and at its own `#id` whether or not its panel is open; the 24
 * invented answers in `copy/` are visible but deliberately kept out of the
 * markup until they are signed off.
 */
export function FaqContainer() {
  return (
    <>
      <FaqHero />
      <QuickAnswersSection motion={m.quick} />
      <FaqExplorerSection motion={m.questions} />
      <PlanYourStaySection motion={m.guides} />
      <VoicesTrustSection motion={m.voices} />
      <FaqClosingSection motion={m.closing} />
      <SectionShell
        motion={m.related}
        eyebrow={sections.related.eyebrow}
        heading={sections.related.heading}
      >
        <RelatedLinks hrefs={["/accommodation", "/offers", "/contact"]} />
      </SectionShell>

      <StickyFaqCta />
    </>
  );
}
