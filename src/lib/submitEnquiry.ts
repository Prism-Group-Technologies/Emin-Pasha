import { kindFromEndpoint, loadSpec } from "@/lib/enquiry/registry";
import type { ApiEnvelope } from "@/lib/api/envelope.types";
import { submitToWeb3Forms } from "@/lib/web3forms/submit";

export interface EnquiryOutcome {
  ok: boolean;
  message: string;
  /** Recorded but not delivered — no provider configured (CLAUDE.md §3.5). */
  pending: boolean;
}

/**
 * The one client-side call every form makes.
 *
 * Two paths, chosen by whether a Web3Forms access key is configured:
 *
 *  1. **Configured** — the enquiry goes straight to Web3Forms from the
 *     browser, which is how the provider is designed to be used. The kind's
 *     spec (looked up from the endpoint, loaded on demand) supplies the
 *     subject, the desk and the ordered field list, so the email a Web3Forms
 *     submission produces is the same email the API route would have composed.
 *  2. **Not configured** — the original behaviour: post the API route, which
 *     logs the enquiry and answers `pending`, so the UI can say "we have it,
 *     but our inbox is not connected yet" instead of claiming an email was
 *     sent. This is what local development and un-keyed previews do.
 *
 * `pending` is therefore only ever true on path 2. Every hook already branches
 * on it, which is why wiring the provider changed no form, no component and no
 * copy: a real send simply stops taking the `pending` branch.
 *
 * The honeypot is enforced here on path 1, since the server's check in
 * `lib/api/envelope.ts` is no longer in the request path. A filled trap is
 * reported as success and nothing is sent — a bot told it failed retries with
 * the field cleared, one told it succeeded goes away.
 */
export async function submitEnquiry(
  endpoint: string,
  values: unknown,
  fallbackMessage: string,
): Promise<EnquiryOutcome> {
  const kind = kindFromEndpoint(endpoint);
  if (kind) {
    const spec = await loadSpec(kind);
    if (isHoneypotFilled(values)) {
      return { ok: true, message: spec.messages.success, pending: false };
    }
    const outcome = await submitToWeb3Forms(spec, values as never);
    if (outcome.status === "sent") {
      return { ok: true, message: spec.messages.success, pending: false };
    }
    if (outcome.status === "failed") {
      return { ok: false, message: spec.messages.failure, pending: false };
    }
    // `unconfigured` falls through to the API route below.
  }
  return postToRoute(endpoint, values, fallbackMessage);
}

const isHoneypotFilled = (values: unknown) =>
  typeof values === "object" &&
  values !== null &&
  typeof (values as { website?: unknown }).website === "string" &&
  (values as { website: string }).website.length > 0;

/** The pre-Web3Forms path, kept intact as the no-key fallback. */
async function postToRoute(
  endpoint: string,
  values: unknown,
  fallbackMessage: string,
): Promise<EnquiryOutcome> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const payload = (await response.json()) as ApiEnvelope;
    return {
      ok: response.ok && payload.ok,
      message: payload.message ?? fallbackMessage,
      pending: payload.pending === true,
    };
  } catch {
    return { ok: false, message: fallbackMessage, pending: false };
  }
}
