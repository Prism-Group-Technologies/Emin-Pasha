import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { storyChapters } from "@/containers/story/catalogue";
import { StoryChapterCard } from "@/containers/story/molecules/StoryChapterCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * A card is the same width whether two chapters render or three.
 *
 * The column count follows how many chapters survive the exclusion, so the row
 * is always full — three across on the pillar page, two on a chapter page,
 * never two thirds and a hole. But two cards sharing the full 1280px container
 * are ~900px each holding one short line of blurb, which reads as a layout
 * fault rather than as generous spacing. Capping the row at roughly the
 * three-up card width keeps the density identical in both cases.
 *
 * Left-aligned rather than centred: the section header above it is
 * left-aligned, and a centred row under a left-aligned heading reads as two
 * different grids.
 */
const THREE_UP_ROW = 880;

function gridSx(count: number) {
  return {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: count > 1 ? "repeat(2, minmax(0, 1fr))" : "1fr",
      md: `repeat(${count}, minmax(0, 1fr))`,
    },
    gap: { xs: 4, md: 5 },
    alignItems: "stretch",
    maxWidth: { md: count < 3 ? THREE_UP_ROW : "none" },
  };
}

/**
 * The Our Story chapter pages as a numbered card band — the pillar page and
 * each chapter page point at the other two, so the section is one linked
 * cluster rather than three orphans (`yarn check:seo` §4).
 *
 * Every piece of content resolves by href in `catalogue.ts`, which is also
 * where the ordinals are fixed to the *full* set: a chapter page that excludes
 * itself still shows 01 and 03, because renumbering the survivors would
 * contradict the heading beside them.
 *
 * Paper-surfaced and typographic against `NamedAfterSection`'s dark,
 * photographic index — the two bands are adjacent on two routes, and the
 * contrast between the forms is what stops them reading as one component
 * rendered twice.
 */
export function StoryChaptersSection({
  eyebrow,
  heading,
  exclude,
  motion = "up",
}: {
  eyebrow: string;
  heading: string;
  /** A chapter page passes its own href so it does not link to itself. */
  exclude?: string;
  motion?: RevealDirection;
}) {
  const chapters = storyChapters(exclude);

  return (
    <SectionShell variant="raised" eyebrow={eyebrow} heading={heading} motion={motion}>
      <Box sx={gridSx(chapters.length)}>
        {chapters.map((chapter, index) => (
          <Reveal key={chapter.href} index={index} fill>
            <StoryChapterCard chapter={chapter} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
