import { identity } from "@/content/identity";

/**
 * The two Web3Forms access keys, one per approved inbox (§1).
 *
 * Web3Forms delivers to the address that owns the key — a per-message `to` is
 * not honoured — so the site's existing department routing is expressed as a
 * **choice of key**. `enquirySpec.to` (or the kind's default desk) resolves to
 * an address, and that address picks the form the enquiry is posted to.
 *
 * These are `NEXT_PUBLIC_` and therefore inlined into the browser bundle,
 * which is how Web3Forms is designed to work: an access key identifies a form,
 * it does not authorise anything, and their own documented integration puts it
 * in the page. Nothing else here may follow that precedent — the YCS
 * credentials in `config/env.ts` stay server-only.
 *
 * Both are optional. With neither set, `submitEnquiry` falls back to posting
 * the API routes, where the console adapter logs the enquiry and the UI shows
 * its honest `pending` copy (CLAUDE.md §3.5). With only one set, that key
 * takes every enquiry: delivery is never silently dropped, and the intended
 * desk still travels in the email as its `Department` field, so a half-
 * configured environment degrades to "all mail in one inbox, correctly
 * labelled" rather than to nothing.
 *
 * Read as separate literals on purpose. Next inlines `process.env.NEXT_PUBLIC_*`
 * only at a statically analysable reference, so a computed lookup
 * (`process.env[name]`) would be `undefined` in the browser.
 */
const INFO_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY_INFO ?? "";
const RESERVATIONS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY_RESERVATIONS ?? "";

/** True when at least one key is configured — i.e. real delivery is possible. */
export const web3formsConfigured = (): boolean =>
  INFO_KEY.length > 0 || RESERVATIONS_KEY.length > 0;

export function accessKeyFor(inbox: string): string | null {
  const preferred = inbox === identity.reservationsEmail ? RESERVATIONS_KEY : INFO_KEY;
  const fallback = inbox === identity.reservationsEmail ? INFO_KEY : RESERVATIONS_KEY;
  return preferred || fallback || null;
}
