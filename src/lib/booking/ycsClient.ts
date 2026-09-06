import "server-only";

import { env } from "@/config/env";
import { identity } from "@/content/identity";

/**
 * The transport for every YCS call. **Server-only** — the `server-only`
 * import makes a client import a build error, not a code-review catch, which
 * is what keeps `YCS_API_KEY`/`YCS_AUTH_CODE` off the wire.
 *
 * Verified against api.ezeetechnosys.com on 2026-08-02:
 *  - the vendor requires `User-Agent: openAPI-{vendorname/propertyname}` on
 *    *every* request — quoted verbatim from their docs;
 *  - `booking/reservation_api/listing.php` is GET with `APIKey`;
 *  - `index.php/page/service.kioskconnectivity` is POST JSON with `AuthCode`.
 * Those are two different credentials on two different hosts, which is why
 * they are separate methods rather than one generic call.
 */
const USER_AGENT = `openAPI-${identity.shortName.replace(/\s+/g, "")}`;

const TIMEOUT_MS = 8000;

/**
 * Sandbox vs live. Defaults to sandbox (`env.YCS_ENVIRONMENT`) so a
 * half-configured deploy cannot transact against the real property. The live
 * host is the one CLAUDE.md §4 records as confirmed; the sandbox host is
 * TODO(EMIN-Q72) — the vendor issues it per-account and it is not published,
 * so it is read from config rather than hardcoded.
 */
export const YCS_LIVE_BASE = "https://live.ipms247.com/";

export function ycsBase(): string {
  return YCS_LIVE_BASE;
}

export class YcsTransportError extends Error {
  constructor(readonly reason: "timeout" | "network" | "http") {
    super(`YCS transport failure: ${reason}`);
  }
}

/**
 * One retry, and only for failures that are plausibly transient. A 4xx is not
 * retried — repeating a rejected request just doubles the latency the guest
 * waits before seeing the enquiry fallback.
 */
async function fetchOnce(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: { "User-Agent": USER_AGENT, ...init.headers },
      cache: "no-store",
    });
  } finally {
    clearTimeout(timer);
  }
}

async function withRetry(url: string, init: RequestInit): Promise<Response> {
  try {
    const first = await fetchOnce(url, init);
    if (first.status < 500) {
      return first;
    }
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      // fall through to the single retry
    }
  }
  try {
    return await fetchOnce(url, init);
  } catch (error) {
    throw new YcsTransportError(
      error instanceof Error && error.name === "AbortError" ? "timeout" : "network",
    );
  }
}

/** GET against `booking/reservation_api/listing.php` (APIKey family). */
export async function listingRequest(
  requestType: string,
  params: Record<string, string>,
): Promise<unknown> {
  if (!env.YCS_HOTEL_CODE || !env.YCS_API_KEY) {
    throw new YcsTransportError("network");
  }
  const url = new URL("booking/reservation_api/listing.php", ycsBase());
  url.searchParams.set("request_type", requestType);
  url.searchParams.set("HotelCode", env.YCS_HOTEL_CODE);
  url.searchParams.set("APIKey", env.YCS_API_KEY);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  const response = await withRetry(url.toString(), { method: "GET" });
  return response.json();
}

/** POST against `index.php/page/service.kioskconnectivity` (AuthCode family). */
export async function kioskRequest(
  requestType: string,
  body: Record<string, string>,
): Promise<unknown> {
  if (!env.YCS_HOTEL_CODE || !env.YCS_AUTH_CODE) {
    throw new YcsTransportError("network");
  }
  const response = await withRetry(`${ycsBase()}index.php/page/service.kioskconnectivity`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Request_Type: requestType,
      HotelCode: env.YCS_HOTEL_CODE,
      AuthCode: env.YCS_AUTH_CODE,
      ...body,
    }),
  });
  return response.json();
}
