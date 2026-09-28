import { z } from "zod";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §12.7 — the approved CTA library.
 * `href` stays optional because two approved CTAs still have no destination at
 * all (`dining-menu`, `newsletter-join` — TODO(EMIN-Q14)). A value may be an
 * internal route or an absolute booking-engine URL; `Button`/`ExternalLink`
 * decide how to render each.
 */
export const ctaSchema = z.object({
  id: z.string().min(1),
  context: z.string().min(1),
  label: z.string().min(1),
  href: z.string().optional(),
});

export type Cta = z.infer<typeof ctaSchema>;
