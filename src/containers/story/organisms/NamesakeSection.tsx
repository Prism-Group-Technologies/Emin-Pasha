import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { PortraitPlate } from "@/components/molecules/PortraitPlate";
import { SectionShell } from "@/components/templates/SectionShell";
import { STORY_ANCHOR_ID } from "@/containers/story/anchors";
import { namesakeCopy, sections } from "@/containers/story/copy";
import { assets } from "@/content/assets";
import { story } from "@/content/story";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens } from "@/theme/tokens";

const portrait = assets.find((asset) => asset.id === "story-emin-pasha-portrait");

/**
 * Capped at half the engraving's 477px intrinsic width so a 2× display still
 * draws from real pixels — see `CutoutPortrait`.
 */
const PORTRAIT_WIDTH = { xs: 200, md: 236 } as const;

/**
 * The media track — the artwork's cap plus the plate's frame and padding.
 *
 * This column used to be sized to the artwork itself, which kept the hole
 * small here but did not close it: a bare cutout still had no edge, so the
 * leftover width and the gap below the faded hem read as one undifferentiated
 * gap. The plate fills the track instead. Matches the home page's
 * `StorySection`, so the namesake presents identically in both places.
 */
const MEDIA_TRACK = 340;

const pullQuoteSx = {
  mb: 5,
  p: { xs: 4, md: 5 },
  borderLeft: "3px solid",
  borderColor: "primary.main",
  borderRadius: `0 ${radiusTokens.md}px ${radiusTokens.md}px 0`,
  bgcolor: "background.paper",
} as const;

/**
 * The namesake teaser: the engraved portrait beside an invented standfirst
 * and a pull quote lifted verbatim from `story.whyWeCarryThisName`, handing
 * the reader down into the preserved full account. A Server Component.
 *
 * The portrait is a background-removed cutout, so it goes through
 * `PortraitPlate` rather than `AssetImage` — the latter would put a grey plate
 * behind every transparent pixel and crop the figure to a ratio it was never
 * cut to. The plate supplies the edge the cutout gives up by dissolving, and
 * carries the museum label; the grid aligns to `start` so its top edge meets
 * the standfirst's first line.
 */
export function NamesakeSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.namesake.eyebrow}
      heading={sections.namesake.heading}
      description={sections.namesake.description}
    >
      <Box
        sx={{
          maxWidth: { lg: 1060 },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: `minmax(0, ${MEDIA_TRACK}px) minmax(0, 1fr)`,
          },
          columnGap: { md: 7 },
          rowGap: { xs: 5, md: 0 },
          alignItems: "start",
        }}
      >
        {portrait && (
          <PortraitPlate
            asset={portrait}
            width={PORTRAIT_WIDTH}
            sizes={`(max-width: 899px) ${PORTRAIT_WIDTH.xs}px, ${PORTRAIT_WIDTH.md}px`}
            dates={story.lifeDates}
            caption={story.portraitCaption}
          />
        )}

        <Box>
          <Text
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "62ch", mb: { xs: 5, md: 6 } }}
          >
            {namesakeCopy.standfirst}
          </Text>

          <Box component="figure" sx={{ m: 0 }}>
            <Text
              component="blockquote"
              variant="h4"
              sx={{
                ...pullQuoteSx,
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                textWrap: "balance",
              }}
            >
              {namesakeCopy.pullQuote}
            </Text>
          </Box>

          <Button href={`#${STORY_ANCHOR_ID}`} variant="ghost">
            {namesakeCopy.ctaLabel}
          </Button>
        </Box>
      </Box>
    </SectionShell>
  );
}
