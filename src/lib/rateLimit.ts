import "server-only";

interface Bucket {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

const buckets = new Map<string, Bucket>();

/**
 * A small fixed-window limiter for the enquiry routes.
 *
 * **In-memory, and honest about it:** this holds state per server instance,
 * so it will not coordinate across a horizontally-scaled or serverless
 * deployment. It stops the trivial case — a bot hammering one endpoint from
 * one address — which together with the honeypot covers what an unauthenticated
 * contact form realistically faces. A durable limiter needs a shared store
 * (Redis/Upstash) and depends on the hosting decision, Q23 — TODO(EMIN-Q35).
 *
 * Fails open on a missing IP: better to accept a lead we cannot attribute
 * than to drop a real enquiry because a proxy header was absent.
 */
export function checkRateLimit(key: string | null): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  if (!key) {
    return { allowed: true, retryAfterSeconds: 0 };
  }
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (bucket.count >= MAX_PER_WINDOW) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Trusts the first hop in `x-forwarded-for`, falling back to `x-real-ip`. */
export function clientKey(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }
  return request.headers.get("x-real-ip");
}
