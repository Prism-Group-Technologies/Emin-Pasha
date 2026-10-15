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
  /**
   * The namesake's life dates and the one-line label under his portrait.
   *
   * Both are **historical reference**, not approved marketing copy, which is
   * why they are optional: they describe the man the way a gallery card
   * would, and they carry none of the hotel's voice. They sit here rather
   * than in a container because `timeline` already makes this module the
   * namesake's biography, and because two pages render the same portrait.
   */
  lifeDates: z.string().min(1).optional(),
  portraitCaption: z.string().min(1).optional(),
  timeline: z.array(timelineChapterSchema).min(1),
  whatWeTakeFromIt: z.string().min(1),
  generalManagerMessage: z.string().min(1),
  // TODO(EMIN-Q21): GM name/photo not confirmed — message ships unattributed.
  generalManagerName: z.string().optional(),
  generalManagerPhotoAssetId: z.string().optional(),
});

export type Story = z.infer<typeof storySchema>;
