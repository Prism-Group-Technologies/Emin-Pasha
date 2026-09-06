import { z } from "zod";

import { shell } from "@/content/shell";

/**
 * Footer newsletter signup — CLAUDE.md §4 (react-hook-form + Zod). Error
 * copy lives in `src/content/shell.ts` so the same string is never declared
 * twice (CLAUDE.md §5.4). The list platform itself is TODO(EMIN-Q14): the
 * form validates and calls a typed service, which is stubbed until a
 * provider is confirmed.
 */
const { errors } = shell.newsletter;

export const newsletterFormSchema = z.object({
  email: z.email({ error: errors.email }),
  // `boolean().refine(...)` rather than `literal(true)`: the field's *type*
  // has to stay `boolean` so the checkbox can default to unticked. Opt-in
  // consent that arrives pre-ticked is not consent (and is not lawful under
  // GDPR-style regimes), so the default must be representable.
  consent: z.boolean().refine((value) => value, { error: errors.consent }),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

export const newsletterResultSchema = z.object({
  status: z.enum(["subscribed", "pending", "failed"]),
  message: z.string().min(1),
});

export type NewsletterResult = z.infer<typeof newsletterResultSchema>;
