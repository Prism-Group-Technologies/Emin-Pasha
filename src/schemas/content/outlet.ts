import { z } from "zod";

/** Dining outlets, docs/02_CONTENT_SOURCE_OF_TRUTH.md §5. */
export const outletSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(["restaurant", "bar", "in-room"]),
  description: z.string().min(1),
  namedForNote: z.string().optional(),
  // TODO(EMIN-Q12): outlet opening hours not in source (forbidden to invent).
  hours: z.string().optional(),
  // TODO(EMIN-Q12): restaurant menus not in source (forbidden to invent).
  menuUrl: z.url().optional(),
});

export type Outlet = z.infer<typeof outletSchema>;
