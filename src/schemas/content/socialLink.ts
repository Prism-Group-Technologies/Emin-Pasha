import { z } from "zod";

/**
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §12.8 — approved social bios. `url` is
 * optional: the source gives a LinkedIn bio but no LinkedIn URL in the §1
 * NAP table — TODO(EMIN-Q67).
 */
export const socialLinkSchema = z.object({
  platform: z.enum(["instagram", "facebook", "x", "linkedin"]),
  url: z.url().optional(),
  bioText: z.string().min(1),
  charLimit: z.number().int().positive().optional(),
});

export type SocialLink = z.infer<typeof socialLinkSchema>;
