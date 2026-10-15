import type { IconName } from "@/components/atoms/Icon";

/**
 * The four things a guest walks up to the desk for. Used as both the filter
 * axis on the services index and the grouping on the compact strips — one id
 * per group, so a service can never belong to two and the filter can never
 * show a card twice.
 */
export type ReceptionGroupId = "arrival" | "concierge" | "practical" | "transport";

export interface ReceptionGroup {
  id: ReceptionGroupId;
  /** Filter-chip label — short enough to sit in a row of four on a phone. */
  label: string;
  /** The one line that says what this group of services is for. */
  blurb: string;
  icon: IconName;
}

export interface ReceptionService {
  id: string;
  group: ReceptionGroupId;
  title: string;
  /** The answer to "what actually happens if I ask?" — one sentence. */
  description: string;
  icon: IconName;
  /**
   * Where the guest goes to act on it. Omitted for services that are only
   * ever arranged by asking — a card with no destination renders without a
   * link rather than sending the guest to a page that cannot help them.
   */
  href?: string;
  /** Link text, required whenever `href` is set. */
  linkLabel?: string;
  /**
   * Set when the facts in `description` come from the approved content layer
   * (`@/content/policies`, `@/content/faq`) rather than from this module's
   * invented copy. `yarn check:content` does not police container copy, so the
   * flag is what keeps the two provenances legible to a reviewer.
   */
  approvedSource?: boolean;
}
