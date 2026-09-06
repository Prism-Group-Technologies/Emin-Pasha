import { z } from "zod";

/**
 * Spa treatment categories, docs/02_CONTENT_SOURCE_OF_TRUTH.md §6. Only the
 * four category names are approved copy — no individual treatment, price or
 * duration exists in the source (§0.7 forbids inventing these).
 */
export const spaServiceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  // TODO(EMIN-Q12): spa menu with prices/durations not in source.
  priceUgx: z.number().int().positive().optional(),
  durationMinutes: z.number().int().positive().optional(),
});

export type SpaService = z.infer<typeof spaServiceSchema>;
