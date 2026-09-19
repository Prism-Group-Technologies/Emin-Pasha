/** ⚠️ INVENTED LEGAL COPY — NOT LEGAL ADVICE. See ../index.ts. */
import { LEGAL_ENTITY } from "@/containers/legal/copy/entity";
import { privacyHighlights, privacySummary } from "@/containers/legal/copy/privacy/bands";
import { privacySectionsCollect } from "@/containers/legal/copy/privacy/collect";
import { privacySectionsRights } from "@/containers/legal/copy/privacy/rights";
import type { LegalDocument } from "@/containers/legal/types";

export const privacyDocument: LegalDocument = {
  id: "privacy",
  navLabel: "Privacy policy",
  teaser: "What we collect, why, how long we keep it — and your rights over it.",
  icon: "lock",
  hero: {
    eyebrow: "§ PRIVACY POLICY",
    headline: "Your details, looked after like our guests",
    lede: "What we collect when you browse, book, dine or message us — why we need it, who else sees it, and how to see, correct or delete it with a single message.",
  },
  updated: LEGAL_ENTITY.updated,
  version: "1.0",
  summary: privacySummary,
  sections: [...privacySectionsCollect, ...privacySectionsRights],
  highlights: privacyHighlights,
};
