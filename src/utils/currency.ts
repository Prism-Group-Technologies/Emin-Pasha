import { identity } from "@/content/identity";

const groups = new Intl.NumberFormat("en-UG");

/**
 * Formats a rate as the approved copy writes it: `UGX 250,000`.
 *
 * Deliberately **not** `Intl.NumberFormat(…, { style: "currency" })`. That
 * renders UGX as **"USh"** — verified, not assumed — which is a legitimate
 * symbol but not the presentation
 * 02_CONTENT_SOURCE_OF_TRUTH.md uses anywhere ("Rates from UGX 250,000 per
 * night", §4, §12.2, §12.3). Shipping "USh" would quietly contradict the
 * approved copy on the same page, and `check:content`'s no-USD guard would
 * not catch it because "USh" is not "USD".
 *
 * Only the grouping comes from `Intl`; the currency code is
 * `identity.currency`, the single approved source.
 */
export function formatUgx(amount: number): string {
  return `${identity.currency} ${groups.format(amount)}`;
}
