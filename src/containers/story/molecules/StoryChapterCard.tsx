import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { StoryChapter } from "@/containers/story/catalogue";

/**
 * The numeral is the card's image.
 *
 * These three cards carry no photography, and deliberately: the namesake
 * chapter's only asset is the background-removed engraving, which
 * `CutoutPortrait` exists precisely to keep out of a cover-cropped frame, and
 * giving two chapters a photograph and the third a substitute would say the
 * third matters less. An oversized cartographic ordinal gives the card the
 * mass a photograph would have given it, states the reading order, and needs
 * nothing shot.
 */
const ordinalSx = {
  fontFamily: "var(--font-cartographic)",
  fontSize: { xs: "2.5rem", md: "3.25rem" },
  lineHeight: 1,
  color: "primary.main",
  // Optical alignment: the cartographic face carries side bearings the card's
  // padding then doubles, which left the numeral visibly inset from the rule
  // and the heading below it.
  ml: "-0.06em",
};

const ruleSx = {
  mt: 3,
  mb: 4,
  height: "1px",
  bgcolor: "divider",
};

/** Pins the arrow to the card's foot, so a short blurb cannot float it upward. */
const footSx = {
  mt: "auto",
  pt: 4,
  display: "flex",
  justifyContent: "flex-end",
};

/**
 * One Our Story chapter, as a numbered editorial card.
 *
 * The whole card is the link — one tab stop, with the chapter label as its
 * accessible name. The arrow is `aria-hidden` for the same reason it is in
 * `NavCardBody`: it would otherwise announce itself as a second, meaningless
 * stop on a card that already has a name.
 *
 * Nothing here is written: the label resolves from `content/navigation.ts` and
 * the blurb from `content/nav-copy.ts`, both by href, so a chapter renamed
 * anywhere is renamed here too (CLAUDE.md §5.4).
 */
export function StoryChapterCard({ chapter }: { chapter: StoryChapter }) {
  return (
    <Link href={chapter.href} underline="none" sx={{ ...cardSurface(), color: "text.primary" }}>
      <Text component="span" aria-hidden sx={ordinalSx}>
        {chapter.ordinal}
      </Text>
      <Box aria-hidden sx={ruleSx} />
      <Text variant="h5" component="h3" sx={{ textWrap: "balance" }}>
        {chapter.label}
      </Text>
      {chapter.blurb && (
        <Text variant="body2" color="text.secondary" sx={{ mt: 2, textWrap: "pretty" }}>
          {chapter.blurb}
        </Text>
      )}
      <Box sx={footSx}>
        <Icon name="arrow-forward" fontSize="small" aria-hidden sx={{ color: "primary.main" }} />
      </Box>
    </Link>
  );
}
