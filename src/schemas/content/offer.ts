import { z } from "zod";

/** docs/02_CONTENT_SOURCE_OF_TRUTH.md §10. "Reopening packages" is deliberately
 * excluded from content/offers.ts — its framing may be stale (Q08). */
export const offerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  priceUgx: z.number().int().positive().optional(),
  schedule: z.string().optional(),
});

export type Offer = z.infer<typeof offerSchema>;
