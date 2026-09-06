import { z } from "zod";

/**
 * Every image/video the site needs — CLAUDE.md §6.6, docs/ASSET_MANIFEST.md.
 * `status: "placeholder"` until the real file is delivered (TODO(EMIN-Q43)
 * video, TODO(EMIN-Q44) photography) — `filename` stays undefined until then.
 * `altText` is required unless `decorative: true` (CLAUDE.md §6.5 — the hero
 * video is muted/decorative and gets empty alt, not a fake description);
 * check:content enforces the pairing since Zod alone can't express "one or
 * the other."
 */
export const assetRefSchema = z.object({
  id: z.string().min(1),
  page: z.string().min(1),
  subject: z.string().min(1),
  kind: z.enum(["image", "video"]),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  priority: z.enum(["lcp", "high", "normal", "low"]),
  altText: z.string(),
  decorative: z.boolean().optional(),
  status: z.enum(["placeholder", "delivered"]),
  filename: z.string().optional(),
});

export type AssetRef = z.infer<typeof assetRefSchema>;
