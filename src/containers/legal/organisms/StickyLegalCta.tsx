import { LegalStickyBar } from "@/containers/legal/molecules/LegalStickyBar";

export interface StickyLegalCtaProps {
  whatsappHref: string;
  contentsAnchorId: string;
}

/**
 * The page-scoped sticky "ask" bar. A Server Component whose only job is to
 * hand already-resolved strings to the client `LegalStickyBar`, so the
 * Zod-validated content layer stays off the client (DECISIONS.md D25).
 */
export function StickyLegalCta({ whatsappHref, contentsAnchorId }: StickyLegalCtaProps) {
  return <LegalStickyBar whatsappHref={whatsappHref} contentsHref={`#${contentsAnchorId}`} />;
}
