import type { IconName } from "@/components/atoms/Icon";
import type { LegalDocId, LegalRequestId } from "@/containers/legal/anchors";

/** One block of document body — prose, a list, a highlighted note, or a data table. */
export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "callout"; tone: "info" | "warning"; title: string; text: string }
  | { kind: "table"; caption: string; columns: string[]; rows: string[][] };

export interface LegalSection {
  /** In-page anchor, unique within its document. */
  id: string;
  title: string;
  blocks: LegalBlock[];
}

/** A card in the summary grid or a highlights band. */
export interface LegalPoint {
  icon: IconName;
  title: string;
  body: string;
  /** When set, the card carries a WhatsApp request CTA with this closed-list phrase. */
  request?: LegalRequestId;
}

export interface LegalCta {
  label: string;
  href: string;
}

export interface LegalBand {
  eyebrow: string;
  heading: string;
  description: string;
  items: LegalPoint[];
  cta?: LegalCta;
}

export interface LegalDocument {
  id: LegalDocId;
  /** Short label used in the switcher, the related band and breadcrumbs. */
  navLabel: string;
  /** One-line teaser for cross-link cards. */
  teaser: string;
  icon: IconName;
  hero: { eyebrow: string; headline: string; lede: string };
  /** Display date, e.g. "15 September 2026". */
  updated: string;
  version: string;
  summary: LegalBand;
  sections: LegalSection[];
  highlights: LegalBand;
}
