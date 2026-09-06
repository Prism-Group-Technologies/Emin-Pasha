import { z } from "zod";

/**
 * Pre-filled WhatsApp opening lines — the first message already sitting in
 * the guest's compose box when a `wa.me` link opens.
 *
 * A **closed set**, deliberately. Every string here is put in a guest's mouth
 * and sent to the property under their name, so the whole inventory has to be
 * reviewable in one screen rather than scattered across the call sites that
 * link out. Adding an intent means adding a key here and getting it signed
 * off — which is the point.
 *
 * The same rule as the rest of the content layer applies, and applies harder:
 * **no factual claim.** No rate, no availability, no reply time. A guest whose
 * own opening message says "you reply within minutes" has been handed a
 * promise the property never made.
 *
 * Status: TODO(EMIN-Q68) — chrome copy pending client sign-off, same as
 * `content/shell.ts` (DECISIONS.md D24).
 */
export const whatsappOpeningsSchema = z.object({
  /** Default. Chrome and NAP rows, where the guest's intent is unknown. */
  general: z.string().min(1),
  /** Surfaces that sit beside a booking CTA and have already named the intent. */
  booking: z.string().min(1),
});

export type WhatsAppOpenings = z.infer<typeof whatsappOpeningsSchema>;
