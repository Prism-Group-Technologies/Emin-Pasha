import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { STORY_ANCHOR_ID } from "@/containers/story/anchors";
import { namesakeCopy, sections } from "@/containers/story/copy";
import { assets } from "@/content/assets";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens } from "@/theme/tokens";

const portrait = assets.find((asset) => asset.id === "story-emin-pasha-portrait");

const pullQuoteSx = {
  mb: 5,
  p: { xs: 4, md: 5 },
  borderLeft: "3px solid",
  borderColor: "primary.main",
  borderRadius: `0 ${radiusTokens.md}px ${radiusTokens.md}px 0`,
  bgcolor: "background.paper",
} as const;

/**
 * The namesake teaser: a portrait placeholder beside an invented standfirst
 * and a pull quote lifted verbatim from `story.whyWeCarryThisName`, handing
 * the reader down into the preserved full account. A Server Component.
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
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 300px) minmax(0, 1fr)" },
          columnGap: { md: 7 },
          rowGap: { xs: 5, md: 0 },
          alignItems: "start",
        }}
      >
        {portrait && (
          <Box sx={{ maxWidth: { xs: 260, md: "none" } }}>
            <AssetImage asset={portrait} sizes="(max-width: 900px) 260px, 300px" />
          </Box>
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
