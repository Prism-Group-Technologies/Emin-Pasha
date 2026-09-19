/**
 * One interface for every outbound message the site sends.
 *
 * The provider is an **open question** (TODO(EMIN-Q34)) — no account has been
 * chosen, so none is signed up for or hard-coded. What exists is the seam:
 * when a provider lands it becomes one new file implementing `MailAdapter`
 * and one line in `lib/mail/index.ts`. No route handler, schema or form
 * changes.
 */
export type EnquiryKind =
  "booking" | "rfp" | "spa" | "dining" | "story" | "transfer" | "spaces" | "contact" | "newsletter";

export interface MailMessage {
  kind: EnquiryKind;
  /** Which inbox this belongs to — drives department routing. */
  to: string;
  replyTo?: string;
  subject: string;
  /** Ordered label/value pairs; adapters render these however they like. */
  fields: { label: string; value: string }[];
}

export type MailResult =
  | { status: "sent"; id?: string }
  /** Accepted and logged, but no provider is configured to deliver it. */
  | { status: "pending" }
  | { status: "failed"; reason: string };

export interface MailAdapter {
  readonly id: string;
  send(message: MailMessage): Promise<MailResult>;
}
