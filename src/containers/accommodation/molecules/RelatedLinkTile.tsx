import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { routePhoto } from "@/content/pageHeroes";
import { easingTokens, motionTokens, radiusTokens, shadowTokens } from "@/theme/tokens";

/**
 * Up to four across from `md`, two below it — a tile is never full-width, so
 * it is never asked for more pixels than it occupies.
 */
const TILE_SIZES = "(max-width: 900px) 50vw, 25vw";

const EASE = easingTokens.emin;
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

/**
 * The tile is the single hover target, so the image, label and arrow all key
 * off these selectors rather than each owning a listener — the same contract
 * `navCardStyles.ts` makes.
 */
const tileSx = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  color: "text.primary",
  borderRadius: `${radiusTokens.lg}px`,
  "&:hover .RelatedTile-img, &:focus-visible .RelatedTile-img": { transform: "scale(1.05)" },
  "&:hover .RelatedTile-label, &:focus-visible .RelatedTile-label": { color: "primary.main" },
  "&:hover .RelatedTile-arrow, &:focus-visible .RelatedTile-arrow": {
    transform: "translateX(3px)",
  },
  "&:hover .RelatedTile-media, &:focus-visible .RelatedTile-media": { boxShadow: shadowTokens.md },
  "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 4 },
  [REDUCED_MOTION]: {
    "&:hover .RelatedTile-img, &:focus-visible .RelatedTile-img": { transform: "none" },
    "&:hover .RelatedTile-arrow, &:focus-visible .RelatedTile-arrow": { transform: "none" },
  },
};

/**
 * 16:9 and fixed. The photographs behind it are a mix of 3:2 and 4:3, and
 * letting each tile take its own ratio made a row of cross-links look like a
 * mistake; a constant ratio is also what reserves the space before the image
 * decodes, so the band cannot shift (CLS stays at 0).
 */
const mediaSx = {
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  borderRadius: `${radiusTokens.lg}px`,
  bgcolor: "action.hover",
  border: "1px solid",
  borderColor: "divider",
  transition: `box-shadow ${motionTokens.cardHover}ms ${EASE}`,
  "& img": { transition: `transform ${motionTokens.imageZoom}ms ${EASE}` },
  [REDUCED_MOTION]: { transition: "none", "& img": { transition: "none" } },
};

/**
 * Left-packed, so the arrow sits immediately after the label.
 *
 * Pushing it to the tile's right edge (`flex: 1` on the label) is the row
 * idiom, and it strands the glyph three hundred pixels from the word it
 * belongs to once the tile is wide — it stops reading as "go here" and starts
 * reading as a stray mark in the corner.
 */
const bodySx = { display: "flex", alignItems: "center", gap: 1, mt: 2.5, minWidth: 0 };

const labelSx = {
  minWidth: 0,
  textWrap: "balance",
  // Two tiles share a phone's width, so the label steps down rather than
  // breaking "Lounges & Spaces" across three lines.
  fontSize: { xs: "0.9375rem", md: "1.125rem" },
  transition: `color ${motionTokens.buttonHover}ms ${EASE}`,
  [REDUCED_MOTION]: { transition: "none" },
};

const arrowSx = {
  flexShrink: 0,
  color: "primary.main",
  transition: `transform ${motionTokens.buttonHover}ms ${EASE}`,
  [REDUCED_MOTION]: { transition: "none" },
};

/**
 * One cross-link, as a photographic tile.
 *
 * **Why a photograph rather than the icon badge it replaced.** The badge
 * resolved from a six-entry map, so thirteen of the nineteen destinations the
 * site actually links to fell through to a generic `arrow_forward` glyph —
 * a disc containing an arrow, set directly beside the tile's own trailing
 * arrow. Two identical arrows per row is what made the most-reused module on
 * the site read as unfinished. These destinations are rooms, tables and
 * treatments; a photograph is both the honest signifier and the one that
 * sells them.
 *
 * The image is decorative (`alt=""`) on purpose: the whole tile is one link
 * whose accessible name is the label beside it, so describing the photograph
 * again would make screen readers announce each destination twice.
 */
export function RelatedLinkTile({ href, label }: { href: string; label: string }) {
  const photo = routePhoto(href);

  return (
    <Link href={href} underline="none" sx={tileSx}>
      <Box className="RelatedTile-media" sx={mediaSx}>
        <Image
          className="RelatedTile-img"
          src={photo}
          alt=""
          fill
          sizes={TILE_SIZES}
          blurDataURL={photo.blurDataURL}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Box sx={bodySx}>
        <Text variant="h6" component="span" className="RelatedTile-label" sx={labelSx}>
          {label}
        </Text>
        <Icon
          name="arrow-forward"
          fontSize="small"
          aria-hidden
          className="RelatedTile-arrow"
          sx={arrowSx}
        />
      </Box>
    </Link>
  );
}
