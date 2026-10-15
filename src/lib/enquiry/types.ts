import type { EnquiryKind } from "@/lib/mail/types";

export interface EnquiryField {
  label: string;
  value: string;
}

/**
 * Everything about one enquiry kind that is **not** its Zod schema: which desk
 * owns it, what the subject line reads, and how validated values become the
 * ordered field list a human reads in the email.
 *
 * One spec, two consumers. The route handler spreads it into `handleEnquiry`
 * (the no-key fallback path); the browser imports it at submit time to build
 * the Web3Forms payload. Before this existed the field mapping lived inline in
 * each route, which made client-side submission impossible without
 * duplicating it — and a duplicated mapping is one that drifts.
 *
 * Specs live in one file per kind and are reached through `registry.ts`, whose
 * dynamic imports keep every kind the current page does not submit out of its
 * bundle.
 */
export interface EnquirySpec<Values> {
  kind: EnquiryKind;
  subject: string | ((values: Values) => string);
  /** Per-message inbox override. Omitted, the kind's default desk applies. */
  to?: (values: Values) => string;
  replyTo?: (values: Values) => string | undefined;
  toFields: (values: Values) => EnquiryField[];
  messages: { success: string; failure: string; rateLimited: string };
}

export const subjectOf = <Values,>(spec: EnquirySpec<Values>, values: Values): string =>
  typeof spec.subject === "function" ? spec.subject(values) : spec.subject;

/**
 * A spec whose value type the holder does not know — what the registry hands
 * back, since a dynamic import resolves to a union of all eleven.
 *
 * `never` rather than `unknown`: a spec's value type appears only in parameter
 * position, and parameters are contravariant, so every `EnquirySpec<Values>`
 * is assignable to `EnquirySpec<never>` and none is assignable to
 * `EnquirySpec<unknown>`. This is the family's top type, and reaching it costs
 * one cast — in `registry.ts`, where the kind and its values were matched by
 * the endpoint the form posted.
 */
export type AnyEnquirySpec = EnquirySpec<never>;
