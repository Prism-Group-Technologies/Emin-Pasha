import { z } from "zod";

/**
 * Lounges, signature spaces and meeting/event spaces —
 * docs/02_CONTENT_SOURCE_OF_TRUTH.md §5 (lounges) and §7 (meetings/events).
 */
export const spaceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  namedForNote: z.string().optional(),
  // TODO(EMIN-Q12): capacities by layout (theatre/classroom/banquet/U-shape/
  // cabaret) not in source (forbidden to invent) — Kudara Hall/meeting rooms only.
  capacities: z
    .object({
      theatre: z.number().int().positive().optional(),
      classroom: z.number().int().positive().optional(),
      banquet: z.number().int().positive().optional(),
      uShape: z.number().int().positive().optional(),
      cabaret: z.number().int().positive().optional(),
    })
    .optional(),
  // TODO(EMIN-Q47): floor plan / capacity diagram asset not supplied.
  floorPlanAssetId: z.string().optional(),
});

export type Space = z.infer<typeof spaceSchema>;
