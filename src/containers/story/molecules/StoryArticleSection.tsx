import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

export interface StoryArticleSectionProps {
  /** Stable anchor — the pillar page's table of contents links to it. */
  id: string;
  heading: string;
  children: ReactNode;
  /**
   * Gap under the heading. Defaults to `space-4`; the timeline block uses
   * `space-5` because a dated list needs more air above its first row than a
   * paragraph does.
   */
  headingGap?: number;
  /** Omitted on the last section, which has nothing following it. */
  last?: boolean;
}

/**
 * One `<h2>`-headed block of the namesake pillar page.
 *
 * The four blocks were written out inline, each repeating the same
 * `scrollMarginTop: 120` — the offset that stops the sticky header covering a
 * heading when the table of contents jumps to it. Four copies of that number
 * is four chances for one of them to drift, and a heading that lands under the
 * header is a broken anchor as far as a reader is concerned. It is declared
 * once here instead.
 *
 * The heading is deliberately not revealed on its own. `StoryArticle` reveals
 * each block as a unit, so the heading and the prose it introduces arrive
 * together rather than the heading racing its own paragraph.
 */
export function StoryArticleSection({
  id,
  heading,
  children,
  headingGap = 4,
  last = false,
}: StoryArticleSectionProps) {
  return (
    <Box id={id} sx={{ scrollMarginTop: 120, mb: last ? 0 : 8 }}>
      <Text variant="h2" component="h2" sx={{ mb: headingGap }}>
        {heading}
      </Text>
      {children}
    </Box>
  );
}
