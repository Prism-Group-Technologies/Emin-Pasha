import "server-only";

import { consoleAdapter } from "@/lib/mail/consoleAdapter";
import type { MailAdapter, MailMessage, MailResult } from "@/lib/mail/types";

export type { EnquiryKind, MailMessage, MailResult } from "@/lib/mail/types";
/** Re-exported so server callers keep importing routing from `@/lib/mail`. */
export { inboxFor } from "@/lib/mail/inbox";

/**
 * The active adapter, used only when no Web3Forms access key is configured.
 *
 * Submission is client-side now (`lib/submitEnquiry.ts` posts straight to
 * Web3Forms), so in a configured environment this adapter is never reached.
 * It stays as the honest fallback: with no key set the forms still post to
 * these routes, the enquiry is logged, and the UI shows its `pending` copy
 * rather than claiming an email was sent (CLAUDE.md §3.5).
 */
const adapter: MailAdapter = consoleAdapter;

export function sendEnquiry(message: MailMessage): Promise<MailResult> {
  return adapter.send(message);
}
