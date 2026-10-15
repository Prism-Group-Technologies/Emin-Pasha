import { identity } from "@/content/identity";
import { type EnquirySpec, subjectOf } from "@/lib/enquiry/types";
import { inboxFor } from "@/lib/mail/inbox";
import { accessKeyFor } from "@/lib/web3forms/keys";

const ENDPOINT = "https://api.web3forms.com/submit";

interface Web3FormsReply {
  success?: boolean;
  message?: string;
}

export type Web3FormsOutcome =
  | { status: "sent" }
  /** No key for this desk — the caller should fall back to the API route. */
  | { status: "unconfigured" }
  | { status: "failed"; reason: string };

/**
 * One enquiry → the Web3Forms payload.
 *
 * `access_key`, `subject`, `from_name`, `replyto` and `botcheck` are the
 * provider's reserved names; every other key is rendered in the email in
 * insertion order, which is why the spec's `toFields` is an ordered list and
 * not an object. Labels are unique within a spec, so collapsing them into
 * object keys loses nothing and gives the desk a readable table.
 *
 * `Department` is included even though the key already determines the inbox:
 * when only one key is configured both desks' mail lands together, and this
 * line is what lets the team triage it. `Form` names the kind for filtering.
 */
function payloadFor<Values>(
  spec: EnquirySpec<Values>,
  values: Values,
  accessKey: string,
  inbox: string,
): Record<string, string | boolean> {
  const fields: Record<string, string> = {};
  for (const field of spec.toFields(values)) {
    fields[field.label] = field.value;
  }
  return {
    access_key: accessKey,
    subject: subjectOf(spec, values),
    from_name: `${identity.name} website`,
    ...(spec.replyTo?.(values) ? { replyto: spec.replyTo(values) as string } : {}),
    // Web3Forms' own honeypot. The site's `website` field is checked before we
    // get here, so this is belt and braces rather than the only guard.
    botcheck: false,
    Form: spec.kind,
    Department: inbox,
    ...fields,
  };
}

export async function submitToWeb3Forms<Values>(
  spec: EnquirySpec<Values>,
  values: Values,
): Promise<Web3FormsOutcome> {
  const inbox = spec.to ? spec.to(values) : inboxFor(spec.kind);
  const accessKey = accessKeyFor(inbox);
  if (!accessKey) {
    return { status: "unconfigured" };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payloadFor(spec, values, accessKey, inbox)),
    });
    const reply = (await response.json().catch(() => ({}))) as Web3FormsReply;
    if (!response.ok || reply.success !== true) {
      return { status: "failed", reason: reply.message ?? `http ${response.status}` };
    }
    return { status: "sent" };
  } catch (error) {
    return { status: "failed", reason: error instanceof Error ? error.message : "network" };
  }
}
