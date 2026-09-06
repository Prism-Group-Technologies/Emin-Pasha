import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { PullQuote } from "@/containers/story/molecules/PullQuote";
import { StoryArticleSection } from "@/containers/story/molecules/StoryArticleSection";
import { Timeline } from "@/containers/story/molecules/Timeline";
import { assets } from "@/content/assets";
import { story } from "@/content/story";
import { revealSx } from "@/theme/motion";

const portrait = assets.find((asset) => asset.id === "story-emin-pasha-portrait");

/** One measure, applied to every prose block on the page. */
const MEASURE = "68ch";

/**
 * The four `<h2>` blocks of the namesake pillar page, in reading order.
 *
 * Lifted out of `StoryContainer`, which had grown past the repo's
 * lines-per-function ceiling with the whole article inlined inside a grid
 * inside a section. The container now composes three sections; this organism
 * owns the article, and each block owns its own anchor.
 *
 * **Reveal direction is fixed to `up` here, not alternated.** This is a column
 * of continuous prose that a reader works down in order, and swinging each
 * heading in from alternating sides would fight the reading rather than
 * decorate it — lateral motion is for the marketing bands, where the page is
 * being browsed rather than read. Each block still staggers, so the article
 * assembles as the reader descends it.
 *
 * All narrative is the approved §12.5 copy verbatim.
 */
export function StoryArticle() {
  return (
    <Box component="article">
      <Box sx={revealSx({ index: 0 })}>
        <StoryArticleSection id="why-this-name" heading="Why we carry this name">
          {portrait && (
            <Box sx={{ float: { md: "right" }, ml: { md: 6 }, mb: 4, maxWidth: { md: 320 } }}>
              <AssetImage asset={portrait} sizes="(max-width: 900px) 100vw, 320px" />
            </Box>
          )}
          <Text variant="body1" color="text.secondary" sx={{ maxWidth: MEASURE }}>
            {story.whyWeCarryThisName}
          </Text>
          <PullQuote>His aim was not to conquer but to understand and to learn.</PullQuote>
        </StoryArticleSection>
      </Box>

      <Box sx={revealSx({ index: 1 })}>
        <StoryArticleSection id="the-life" heading="The life" headingGap={5}>
          <Timeline />
        </StoryArticleSection>
      </Box>

      <Box sx={revealSx({ index: 2 })}>
        <StoryArticleSection id="what-we-take" heading="What we take from it">
          <Text variant="body1" color="text.secondary" sx={{ maxWidth: MEASURE }}>
            {story.whatWeTakeFromIt}
          </Text>
        </StoryArticleSection>
      </Box>

      <Box sx={revealSx({ index: 3 })}>
        <StoryArticleSection id="from-the-gm" heading="From the General Manager" last>
          <Text variant="body1" color="text.secondary" sx={{ maxWidth: MEASURE }}>
            {story.generalManagerMessage}
          </Text>
          {/* TODO(EMIN-Q21): the GM's name and photograph are not supplied,
              so the message ships unattributed beyond the title — exactly
              as approved in §12.4. */}
        </StoryArticleSection>
      </Box>
    </Box>
  );
}
