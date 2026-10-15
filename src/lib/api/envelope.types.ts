/**
 * The one response shape every enquiry endpoint returns.
 *
 * Split out of `envelope.ts` because that module is `server-only` (it reaches
 * the mail adapter and the rate limiter) while `lib/submitEnquiry.ts` runs in
 * the browser and needs this type to read a route's reply on the no-key
 * fallback path. A `import type` from the server module would be erased at
 * build time, but the import graph is what `server-only` guards, so the type
 * lives here where both sides may have it.
 */
export interface ApiEnvelope {
  ok: boolean;
  message: string;
  /** Present only when delivery is accepted but not yet configured. */
  pending?: boolean;
}
