import { z } from "zod";

import { identitySchema } from "@/schemas/identity";

/**
 * Site-wide identity, brand and homepage content — docs/02_CONTENT_SOURCE_OF_TRUTH.md
 * §2 (positioning), §3 (setting), §11 (segments/USPs), §12.2 (homepage).
 */
const pillarSchema = z.object({
  name: z.enum(["History", "Culture", "Nature", "Serenity"]),
  description: z.string().min(1),
  cues: z.array(z.string().min(1)).min(1),
});

const heroOptionSchema = z.object({
  id: z.enum(["A", "B", "C"]),
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  ctaLabel: z.string().min(1),
});

const featureTileSchema = z.object({
  id: z.string().min(1),
  headline: z.string().min(1),
  supportingLine: z.string().min(1),
  ctaLabel: z.string().min(1),
});

const targetSegmentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  leadWith: z.array(z.string().min(1)).min(1),
  notes: z.string().optional(),
});

export const siteConfigSchema = z.object({
  identity: identitySchema,
  positioning: z.object({
    statement: z.string().min(1),
    oneLiner: z.string().min(1),
    elevatorPitch: z.string().min(1),
  }),
  pillars: z.array(pillarSchema).length(4),
  setting: z.object({
    description: z.string().min(1),
    whySells: z.string().min(1),
  }),
  targetSegments: z.array(targetSegmentSchema).min(1),
  usps: z.array(z.string().min(1)).min(1),
  homepage: z.object({
    heroOptions: z.array(heroOptionSchema).length(3),
    defaultHeroId: z.enum(["A", "B", "C"]),
    introParagraphs: z.array(z.string().min(1)).min(1),
    introCtas: z.array(z.string().min(1)).min(1),
    featureTiles: z.array(featureTileSchema).min(1),
    closing: z.object({
      text: z.string().min(1),
      ctaLabel: z.string().min(1),
    }),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
