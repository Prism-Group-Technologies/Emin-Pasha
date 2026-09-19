import {
  DOCUMENT_ANCHOR_ID,
  LEGAL_TOPIC_PHRASE,
  type LegalDocId,
  SUMMARY_ANCHOR_ID,
} from "@/containers/legal/anchors";
import { legalDocuments } from "@/containers/legal/catalogue";
import { legalDocumentMotion as m } from "@/containers/legal/motion";
import { LegalBandSection } from "@/containers/legal/organisms/LegalBandSection";
import { LegalClosingSection } from "@/containers/legal/organisms/LegalClosingSection";
import { LegalDocumentSection } from "@/containers/legal/organisms/LegalDocumentSection";
import { LegalHero } from "@/containers/legal/organisms/LegalHero";
import { LegalPromiseSection } from "@/containers/legal/organisms/LegalPromiseSection";
import { LegalRelatedSection } from "@/containers/legal/organisms/LegalRelatedSection";
import { StickyLegalCta } from "@/containers/legal/organisms/StickyLegalCta";
import { whatsappLegalTopicUrl } from "@/lib/directions";

const PLAN_HREFS = ["/accommodation", "/offers", "/contact"];

/**
 * One shared funnel for the four legal documents (Privacy, Cookies, Terms,
 * Accessibility). A Server Component that only composes; the client islands
 * are the table of contents / progress bar and the sticky bar. Every "ask a
 * person" CTA is WhatsApp.
 *
 *   hero       — what the document covers, updated date, reading time
 *   summary    — layered plain-English "at a glance" cards, #at-a-glance
 *   document   — sticky contents + numbered sections, #full-document
 *   highlights — rights / choices / book-direct perks / on-site access
 *   promise    — discretion promise with a placeholder photo → book a stay
 *   closing    — dark band, WhatsApp or call
 *   related    — the other legal pages, then "keep planning"
 */
export function LegalDocumentContainer({ docId }: { docId: LegalDocId }) {
  const document = legalDocuments[docId];
  const whatsappHref = whatsappLegalTopicUrl(LEGAL_TOPIC_PHRASE[docId]);

  return (
    <>
      <LegalHero document={document} />
      <LegalBandSection id={SUMMARY_ANCHOR_ID} band={document.summary} motion={m.summary} />
      <LegalDocumentSection document={document} motion={m.document} />
      <LegalBandSection band={document.highlights} motion={m.highlights} />
      <LegalPromiseSection motion={m.promise} />
      <LegalClosingSection whatsappHref={whatsappHref} motion={m.closing} />
      <LegalRelatedSection
        currentId={docId}
        planHrefs={PLAN_HREFS}
        motion={{ related: m.related, plan: m.plan }}
      />
      <StickyLegalCta whatsappHref={whatsappHref} contentsAnchorId={DOCUMENT_ANCHOR_ID} />
    </>
  );
}
