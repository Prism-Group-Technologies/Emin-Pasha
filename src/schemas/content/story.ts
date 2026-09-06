import { z } from "zod";

/**
 * Not one of the 16 named schemas in this step's brief, but content/story.ts
 * still has to "parse through a schema at module load" like every other
 * content file — docs/02_CONTENT_SOURCE_OF_TRUTH.md §12.4–§12.5.
 */
const timelineChapterSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const storySchema = z.object({
  whyWeCarryThisName: z.string().min(1),
  lifeIntro: z.string().min(1),
  timeline: z.array(timelineChapterSchema).min(1),
  whatWeTakeFromIt: z.string().min(1),
  generalManagerMessage: z.string().min(1),
  // TODO(EMIN-Q21): GM name/photo not confirmed — message ships unattributed.
  generalManagerName: z.string().optional(),
  generalManagerPhotoAssetId: z.string().optional(),
});

export type Story = z.infer<typeof storySchema>;
