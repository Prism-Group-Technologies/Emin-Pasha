import { z } from "zod";

import { assignedPhoto } from "@/content/photoAssignments";

/**
 * The resolved photograph for a slot — the shape `next/image` accepts as a
 * `src`, narrowed to the fields we actually use. It is a plain serialisable
 * object, which is what lets a Server Component resolve the photograph once
 * and hand the finished `AssetRef` to a client island as a prop.
 */
const deliveredImageSchema = z.object({
  src: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  /** Bundler-generated LQIP. Absent for formats Next does not blur. */
  blurDataURL: z.string().optional(),
});

/**
 * Every image/video the site needs — CLAUDE.md §6.6, docs/ASSET_MANIFEST.md.
 * `altText` is required unless `decorative: true` (CLAUDE.md §6.5 — a muted
 * decorative video gets empty alt, not a fake description); check:content
 * enforces the pairing since Zod alone can't express "one or the other."
 */
const assetRefInputSchema = z.object({
  id: z.string().min(1),
  page: z.string().min(1),
  subject: z.string().min(1),
  kind: z.enum(["image", "video"]),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  priority: z.enum(["lcp", "high", "normal", "low"]),
  altText: z.string(),
  decorative: z.boolean().optional(),
  status: z.enum(["placeholder", "delivered"]).default("placeholder"),
  image: deliveredImageSchema.optional(),
});

/**
 * Validates a slot **and resolves its photography in one step**.
 *
 * Every media module across the site funnels through `.parse()` here — the
 * approved content layer in `@/content/assets`, and the dozen container-local
 * modules that hold the not-yet-approved invented copy. Resolving delivery in
 * the transform rather than in each of those modules means a photograph
 * assigned in `@/content/photoAssignments` lights up its slot wherever that
 * slot is declared, and a slot can never drift into claiming `delivered`
 * while pointing at nothing.
 *
 * `status` is therefore derived, not declared: authors describe the shot they
 * need and leave delivery to the assignment table. An author who writes
 * `status: "delivered"` by hand is overruled here, which is the intent.
 *
 * Import boundary: this pulls the static photography registry in, so it stays
 * server-side. Client components import `AssetRef` as a **type only** and
 * receive resolved values as props (DECISIONS.md D25).
 */
export const assetRefSchema = assetRefInputSchema.transform((asset) => {
  const image = assignedPhoto(asset.id);
  return {
    ...asset,
    image,
    status: image ? ("delivered" as const) : ("placeholder" as const),
  };
});

export type AssetRef = z.infer<typeof assetRefSchema>;
export type DeliveredImage = z.infer<typeof deliveredImageSchema>;

/**
 * The shape an author writes. `image` and `status` are absent here on
 * purpose: both are filled in by the transform above from
 * `@/content/photoAssignments`, so a media module declares the shot it needs
 * and nothing about how it is served.
 */
export type AssetRefInput = z.input<typeof assetRefSchema>;
