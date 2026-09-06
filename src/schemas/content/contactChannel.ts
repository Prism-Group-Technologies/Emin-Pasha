import { z } from "zod";

/**
 * Department-routed contact methods — docs/02_CONTENT_SOURCE_OF_TRUTH.md §1,
 * §9. `responseSlaHours` is TODO(EMIN-Q10) — no SLA is confirmed in source.
 */
export const contactChannelSchema = z.object({
  id: z.string().min(1),
  department: z.string().min(1),
  email: z.email().optional(),
  telephone: z.string().optional(),
  purpose: z.string().min(1),
  responseSlaHours: z.number().int().positive().optional(),
});

export type ContactChannel = z.infer<typeof contactChannelSchema>;
