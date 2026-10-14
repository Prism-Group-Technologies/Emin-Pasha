import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { PortraitPlate } from "@/components/molecules/PortraitPlate";
import { SectionShell } from "@/components/templates/SectionShell";
import { assets } from "@/content/assets";
import { ctas } from "@/content/ctas";
import { identity } from "@/content/identity";
import { story } from "@/content/story";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const readHistory = ctas.find((cta) => cta.id === "story-read");
const portrait = assets.find((asset) => asset.id === "story-emin-pasha-portrait");

/** Half the engraving's 477px intrinsic width — see `CutoutPortrait`. */
const PORTRAIT_WIDTH = { xs: 200, md: 236 } as const;

/**
 * The media track.
 *
 * Fixed, not fractional, and this is the whole correction. The artwork is
 * capped to its 477px source, so a `0.8fr` track — ~480px of the container —
 * left a 236px engraving floating in roughly 250px of nothing, with the
 * dissolved hem offering no edge to read the gap against. A track sized to
 * what actually fills it cannot open a hole.
 *
 * 340px rather than the artwork's own 236px because `PortraitPlate` adds its
 * frame and padding around it; the plate reaches both track edges at every
 * breakpoint.
 */
const MEDIA_TRACK = 340;

/**
 * The namesake teaser.
 *
 * "Who was Emin Pasha" is a real search with weak commercial competition, so
 * the pillar page it links to is this site's intended link magnet — this block
 * exists to send people there, not to summarise it. `story.lifeIntro` runs as
 * a pull quote in the display face rather than as body copy, because the
 * sentence is the hook and burying it in a paragraph wastes it.
 *
 * The lock-up leads the grid here, so it takes the section's own direction and
 * the copy comes back against it — the mirror of `IntroBlock`, where the copy
 * leads.
 *
 * Aligned to `start`, not `center`: the plate is shorter than the copy, and
 * centring it against a tall column opened dead space above *and* below on top
 * of the horizontal gap. Starting both columns on one line is also what makes
 * the eyebrow and the plate's top edge agree.
 */
export function StorySection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell topRule motion={motion}>
      <Box
        sx={{
          maxWidth: { lg: 1120 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: `minmax(0, ${MEDIA_TRACK}px) minmax(0, 1fr)` },
          gap: { xs: 6, md: 8 },
          alignItems: "start",
        }}
      >
        <Reveal direction={motion} media>
          {/* The engraved portrait, presented on a plate rather than loose on
              the page ground. `PortraitPlate` carries the reasoning: the
              cutout's own treatment dissolves its edges, which is right for
              the artwork and leaves it unable to hold a column by itself. */}
          {portrait && (
            <PortraitPlate
              asset={portrait}
              width={PORTRAIT_WIDTH}
              sizes={`(max-width: 899px) ${PORTRAIT_WIDTH.xs}px, ${PORTRAIT_WIDTH.md}px`}
              dates={story.lifeDates}
              caption={story.portraitCaption}
            />
          )}
        </Reveal>
        <Reveal index={1} direction={oppositeOf(motion)}>
          <Stack spacing={5} sx={{ maxWidth: "68ch" }}>
            <Text
              variant="overline"
              component="p"
              sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
            >
              § OUR NAMESAKE
            </Text>
            {/* The heading is the namesake's own name — the approved form.
                There is no approved teaser headline, and slicing a sentence
                out of the approved story copy to manufacture one would be
                editing approved text. */}
            <Text variant="h2" component="h2">
              {identity.shortName}
            </Text>
            <Text
              variant="h3"
              component="p"
              sx={{
                pl: 5,
                borderLeft: "2px solid",
                borderColor: "primary.main",
                fontFamily: "var(--font-display)",
                textWrap: "pretty",
              }}
            >
              {story.lifeIntro}
            </Text>
            <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {story.whyWeCarryThisName}
            </Text>
            {readHistory?.href && (
              <Button href={readHistory.href} variant="ghost" sx={{ alignSelf: "flex-start" }}>
                {readHistory.label}
              </Button>
            )}
          </Stack>
        </Reveal>
      </Box>
    </SectionShell>
  );
}
