import { NextResponse } from "next/server";

import "server-only";
import type { z } from "zod";

import { verifySpamToken } from "@/lib/api/spamCheck";
import { inboxFor, sendEnquiry } from "@/lib/mail";
import type { EnquiryKind, MailMessage } from "@/lib/mail/types";
import { checkRateLimit, clientKey } from "@/lib/rateLimit";

/** The one response shape every enquiry endpoint returns. */
export interface ApiEnvelope {
  ok: boolean;
  message: string;
  /** Present only when delivery is accepted but not yet configured. */
  pending?: boolean;
}

export interface HandlerConfig<Schema extends z.ZodType> {
  kind: EnquiryKind;
  schema: Schema;
  subject: string;
  /** Turns validated input into the ordered field list for the message. */
  toFields: (values: z.output<Schema>) => { label: string; value: string }[];
  replyTo?: (values: z.output<Schema>) => string | undefined;
  messages: { success: string; failure: string; rateLimited: string };
}

const json = (body: ApiEnvelope, status: number, headers?: Record<string, string>) =>
  NextResponse.json(body, { status, headers });

/** Reads the body once, tolerating a malformed payload. */
async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body: unknown = await request.json();
    return typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  } catch {
    return null;
  }
}

const isHoneypotFilled = (record: Record<string, unknown>) =>
  typeof record.website === "string" && record.website.length > 0;

/**
 * The shared pipeline behind every enquiry route: **rate limit → honeypot →
 * schema → spam check → deliver → log**.
 *
 * Order is deliberate — cheapest rejection first, so a bot never reaches
 * parsing or a network call. The honeypot returns **200, not 403**: a bot
 * told it failed retries with the field cleared; one told it succeeded goes
 * away. Nothing is sent either way.
 *
 * A `pending` delivery still returns `ok: true` with `pending: true`, so the
 * UI can be honest — we have the enquiry, but no provider is wired yet
 * (TODO(EMIN-Q34)). It never claims an email was sent.
 */
export async function handleEnquiry<Schema extends z.ZodType>(
  request: Request,
  config: HandlerConfig<Schema>,
): Promise<NextResponse<ApiEnvelope>> {
  const ip = clientKey(request);
  const limit = checkRateLimit(ip ? `${config.kind}:${ip}` : null);
  if (!limit.allowed) {
    return json({ ok: false, message: config.messages.rateLimited }, 429, {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  const record = await readBody(request);
  if (record === null) {
    return json({ ok: false, message: config.messages.failure }, 400);
  }
  if (isHoneypotFilled(record)) {
    return json({ ok: true, message: config.messages.success }, 200);
  }

  const parsed = config.schema.safeParse(record);
  if (!parsed.success) {
    return json({ ok: false, message: config.messages.failure }, 422);
  }

  const spam = await verifySpamToken(
    typeof record.spamToken === "string" ? record.spamToken : undefined,
  );
  if (!spam.ok) {
    return json({ ok: false, message: config.messages.failure }, 403);
  }

  const values = parsed.data as z.output<Schema>;
  const message: MailMessage = {
    kind: config.kind,
    to: inboxFor(config.kind),
    replyTo: config.replyTo?.(values),
    subject: config.subject,
    fields: config.toFields(values),
  };

  const result = await sendEnquiry(message);
  if (result.status === "failed") {
    console.error(
      JSON.stringify({ event: "enquiry.failed", kind: config.kind, reason: result.reason }),
    );
    return json({ ok: false, message: config.messages.failure }, 502);
  }

  return json(
    { ok: true, message: config.messages.success, pending: result.status === "pending" },
    200,
  );
}
