import { z } from "zod";

/** docs/02_CONTENT_SOURCE_OF_TRUTH.md §14 — publish as written. */
export const policySectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

export type PolicySection = z.infer<typeof policySectionSchema>;
