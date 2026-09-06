import { NextResponse } from "next/server";

import { bookingCopy } from "@/content/booking";
import { ycsApiAdapter } from "@/lib/booking/ycsApi";
import { bookingSearchSchema } from "@/schemas/booking";

/**
 * (B) API-BACKED FLOW — phase 2. The only door to `ycsApiAdapter`, which is
 * `server-only`: keeping the credentials behind a route handler is the whole
 * reason this file exists rather than the widgets calling YCS directly.
 *
 * Not wired into the UI yet. `lib/booking/index.ts` ships the deep-link
 * adapter as primary, per the mode decision; this endpoint exists so phase 2
 * is a one-line change at the composition root rather than new plumbing.
 *
 * `force-dynamic` because it takes a request body and must never be cached —
 * availability is the definition of data that goes stale.
 */
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ kind: "error", message: bookingCopy.errors.dates }, { status: 400 });
  }

  const parsed = bookingSearchSchema.safeParse(body);
  if (!parsed.success) {
    // The guest's own client already validated this; a failure here means a
    // malformed request, so it gets the generic sentence and no field detail.
    return NextResponse.json(
      { kind: "error", message: bookingCopy.validation.required },
      { status: 422 },
    );
  }

  const outcome = await ycsApiAdapter.submit(parsed.data, {});

  // Always 200: every outcome — quote, no-availability, vendor error — is a
  // successful answer to "what is open?", already translated out of
  // vendor-speak by the adapter. The guest never receives a raw code.
  return NextResponse.json(outcome, { status: 200 });
}
