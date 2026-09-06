import type { ApiEnvelope } from "@/lib/api/envelope";

/**
 * The one client-side call every form makes. Centralised so the
 * success/pending/failure contract is interpreted identically everywhere —
 * in particular `pending`, which means "we have it, but no provider is wired"
 * and must never be shown as "we emailed you" (TODO(EMIN-Q34)).
 */
export async function submitEnquiry(
  endpoint: string,
  values: unknown,
  fallbackMessage: string,
): Promise<{ ok: boolean; message: string; pending: boolean }> {
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
