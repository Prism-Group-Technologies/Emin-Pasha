import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { StoryValue } from "@/containers/story/copy/values";

/**
 * One principle from `story.whatWeTakeFromIt` — the `title` is that phrase
 * verbatim, the `body` is the invented gloss on how it shows up for a guest.
 * Shares the sitewide `cardSurface` so a row of four reads as a grid whatever
 * the copy length.
 */
export function ValueCard({ value }: { value: StoryValue }) {
  return (
    <Box sx={cardSurface()}>
      <IconBadge name={value.icon} size={44} />
      <Text variant="h5" component="h3" sx={{ mt: 4, mb: 2, textWrap: "balance" }}>
        {value.title}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {value.body}
      </Text>
    </Box>
  );
}
