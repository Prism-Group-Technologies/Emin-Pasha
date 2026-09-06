import "server-only";

/**
 * Hook point for a CAPTCHA/challenge provider — Turnstile, reCAPTCHA or
 * similar. **Open question, TODO(EMIN-Q35):** none is chosen, so none is
 * signed up for or hard-coded.
 *
 * The seam is typed and already called by every route handler, in the right
 * place (after the cheap rejections, before delivery). Adding a provider is
 * one implementation of `verifyToken` plus a server-side secret in
 * `config/env.ts`; no route, schema or form changes.
 *
 * It passes by default, and that is deliberate rather than an oversight: with
 * no provider configured the alternative is rejecting every real enquiry.
 * The honeypot and rate limiter carry the load until this is wired.
 */
export interface SpamVerdict {
  ok: boolean;
  reason?: string;
}

export async function verifySpamToken(token: string | undefined): Promise<SpamVerdict> {
  void token;
  return Promise.resolve({ ok: true, reason: "no-provider-configured" });
}
