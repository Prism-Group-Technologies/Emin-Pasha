import { z } from "zod";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §12.7 — the approved CTA library.
 * `href` is left optional: real booking-engine deep links are not yet known
 * (TODO(EMIN-Q49)/TODO(EMIN-Q50)) — the enquiry-form fallback route is used
 * until then.
 */
export const ctaSchema = z.object({
  id: z.string().min(1),
  context: z.string().min(1),
  label: z.string().min(1),
  href: z.string().optional(),
});

export type Cta = z.infer<typeof ctaSchema>;
