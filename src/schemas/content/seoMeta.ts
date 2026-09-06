import { z } from "zod";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §13. Title <=60 chars, description
 * <=155 chars, enforced here rather than trusted to the source table.
 */
export const seoMetaSchema = z.object({
  page: z.string().min(1),
  title: z.string().min(1).max(60),
  description: z.string().min(1).max(155),
  // TODO(EMIN-Q20): geo coordinates for Hotel JSON-LD not verified.
  // TODO(EMIN-Q13): starRating not verified — omit until confirmed.
});

export type SeoMeta = z.infer<typeof seoMetaSchema>;
