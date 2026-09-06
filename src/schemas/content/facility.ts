import { z } from "zod";

/**
 * General-purpose facility/guest-service shape — gym, pool, CG Shop, airport
 * transfer — docs/02_CONTENT_SOURCE_OF_TRUTH.md §6, §8, §9.
 */
export const facilitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  hours: z.string().optional(),
  rules: z.array(z.string().min(1)).optional(),
  // TODO(EMIN-Q12)/TODO(EMIN-Q09): membership pricing, day-pass pricing and
  // transfer pricing are not in source (forbidden to invent).
  priceNoteUgx: z.number().int().positive().optional(),
});

export type Facility = z.infer<typeof facilitySchema>;
