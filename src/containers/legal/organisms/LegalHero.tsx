import { PageHero } from "@/components/organisms/PageHero";
import { LEGAL_TOPIC_PHRASE, SUMMARY_ANCHOR_ID } from "@/containers/legal/anchors";
import { legalSections } from "@/containers/legal/copy";
import { readingMinutes } from "@/containers/legal/readingTime";
import type { LegalDocument } from "@/containers/legal/types";
import { pageHeroImage } from "@/content/pageHeroes";
import { whatsappLegalTopicUrl } from "@/lib/directions";

const { hero } = legalSections;

/**
 * A legal document's above-the-fold promise: what it covers in one line,
 * a jump to the plain-English summary, and WhatsApp. The figure rail is
 * derived from the document itself — reading time and section count cannot
 * drift from the page.
 */
export function LegalHero({ document }: { document: LegalDocument }) {
  return (
    <PageHero
      image={pageHeroImage("legal")}
      eyebrow={document.hero.eyebrow}
      headline={document.hero.headline}
      lede={document.hero.lede}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: document.navLabel }]}
      primaryCta={{ label: hero.primaryCta, href: `#${SUMMARY_ANCHOR_ID}` }}
      secondaryCta={{
        label: hero.secondaryCta,
        href: whatsappLegalTopicUrl(LEGAL_TOPIC_PHRASE[document.id]),
      }}
      minHeight={{ xs: 480, md: 560 }}
      stats={[
        { value: document.updated, label: hero.updated },
        { value: String(readingMinutes(document.sections)), label: hero.readTime },
        { value: String(document.sections.length), label: hero.sections },
        { value: document.version, label: hero.version },
      ]}
    />
  );
}
