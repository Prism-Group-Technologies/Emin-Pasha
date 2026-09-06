import { z } from "zod";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §4. `rateUgx` is the only currency this
 * schema accepts — see content/rooms.ts and check:content for the "no USD on
 * room rates" guardrail (CLAUDE.md §0.1).
 */
export const roomCategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  rateUgx: z.number().int().positive(),
  capacity: z.string().min(1),
  sellTo: z.string().min(1),
  inclusions: z.array(z.string().min(1)).min(1),
  // [DRAFT — VERIFY] in the source; not publishable without a DECISIONS.md
  // approval entry — see TODO(EMIN-Q15). Left undefined until then.
  description: z.string().optional(),
  bookingHref: z.url().optional(),
});

export type RoomCategory = z.infer<typeof roomCategorySchema>;
