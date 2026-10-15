import { z } from "zod";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §13. Title <=60 chars, description
 * <=155 chars, enforced here rather than trusted to the source table.
 */
export const seoMetaSchema = z.object({
  page: z.string().min(1),
  title: z.string().min(1).max(60),
  description: z.string().min(1).max(155),
  // Geo coordinates are not page metadata: they belong to the property, not
  // to a route, so they live once in `lib/geo.ts` and reach the `Hotel`
  // JSON-LD from there (EMIN-Q20 closed).
  // TODO(EMIN-Q13): starRating not verified — omit until confirmed.
});

export type SeoMeta = z.infer<typeof seoMetaSchema>;
