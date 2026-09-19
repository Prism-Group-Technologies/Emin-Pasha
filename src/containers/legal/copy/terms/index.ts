/** ⚠️ INVENTED LEGAL COPY — NOT LEGAL ADVICE. See ../index.ts. */
import { LEGAL_ENTITY } from "@/containers/legal/copy/entity";
import { termsHighlights, termsSummary } from "@/containers/legal/copy/terms/bands";
import { termsSectionsBooking } from "@/containers/legal/copy/terms/booking";
import { termsSectionsStay } from "@/containers/legal/copy/terms/stay";
import type { LegalDocument } from "@/containers/legal/types";

export const termsDocument: LegalDocument = {
  id: "terms",
  navLabel: "Terms",
  teaser: "Bookings, deposits, cancellations and the house rules — in plain English.",
  icon: "gavel",
  hero: {
    eyebrow: "§ TERMS & CONDITIONS",
    headline: "Fair terms for a stay worth looking forward to",
    lede: "How booking, deposits, changes and cancellations work at the estate — plus the few house rules that keep the gardens quiet for everyone.",
  },
  updated: LEGAL_ENTITY.updated,
  version: "1.0",
  summary: termsSummary,
  sections: [...termsSectionsBooking, ...termsSectionsStay],
  highlights: termsHighlights,
};
