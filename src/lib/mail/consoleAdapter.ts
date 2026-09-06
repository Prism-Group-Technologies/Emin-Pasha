import "server-only";

import type { MailAdapter, MailMessage, MailResult } from "@/lib/mail/types";

/**
 * The development adapter, and the honest default in production too.
 *
 * It writes a structured record to the server log and returns `pending` — not
 * `sent`. That distinction is the whole point: a route that reported `sent`
 * with no provider behind it would let the UI tell a guest their enquiry had
 * been emailed when nothing left the building (CLAUDE.md §3.5).
 *
 * Values are logged; they are the enquiry. But this is the one place that is
 * true, so if log redaction is later required it is a single-file change.
 */
export const consoleAdapter: MailAdapter = {
  id: "console",
  send(message: MailMessage): Promise<MailResult> {
    console.warn(
      JSON.stringify({
        at: new Date().toISOString(),
        event: "enquiry.received",
        kind: message.kind,
        to: message.to,
        subject: message.subject,
        fields: message.fields,
        delivery: "not-configured",
        todo: "EMIN-Q34",
      }),
    );
    return Promise.resolve({ status: "pending" });
  },
};
