import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import { STORY_ANCHOR_ID } from "@/containers/story/anchors";
import { sections } from "@/containers/story/copy";
import { StoryArticle } from "@/containers/story/organisms/StoryArticle";
import { StoryToc } from "@/containers/story/organisms/StoryToc";
import type { RevealDirection } from "@/theme/motion";

/**
 * The preserved pillar. The sticky table of contents and the verbatim
 * `StoryArticle` — every chapter an `<h2>`/`<h3>` with a stable `id` and
 * `scroll-margin`, so an answer engine can cite one passage on its own — are
 * carried unchanged inside the new funnel shell (CLAUDE.md §9). No narrative
 * is added here; the surrounding bands are the marketing wrapper.
 */
export function FullStorySection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={STORY_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.fullStory.eyebrow}
      heading={sections.fullStory.heading}
      description={sections.fullStory.description}
      variant="raised"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 240px) minmax(0, 1fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "start",
        }}
      >
        <StoryToc />
        <StoryArticle />
      </Box>
    </SectionShell>
  );
}
