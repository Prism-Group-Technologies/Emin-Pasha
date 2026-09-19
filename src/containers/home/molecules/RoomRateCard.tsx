import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { cardMedia, cardSurface } from "@/components/templates/sectionShellStyles";
import { roomsSection } from "@/containers/home/copy";
import type { AssetRef } from "@/schemas/content/assetRef";
import { formatUgx } from "@/utils/currency";

const rateSx = {
  fontFamily: "var(--font-display)",
  fontSize: { xs: "1.5625rem", md: "1.9375rem" },
  lineHeight: 1.1,
};

const rateCtaSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 2,
  mt: 3,
  transition: "gap 150ms cubic-bezier(0.16,1,0.3,1)",
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
};

export interface RoomRateCardProps {
  name: string;
  rateUgx: number;
  capacity: string;
  sellTo: string;
  tagline?: string;
  href: string;
  /**
   * The room's photograph, resolved by the caller. Optional so a category
   * without a registered slot degrades to the original all-type card rather
   * than to a labelled placeholder in a 300px-wide box.
   */
  image?: AssetRef;
  /** Passed through to `AssetImage`; the card cannot know the grid it is in. */
  imageSizes?: string;
}

/**
 * A room category with its rate on the homepage rather than two clicks away.
 *
 * Publishing the price here is the deliberate move: an undisclosed rate is the
 * largest single source of drop-off on a hotel site, because the visitor has
 * to commit to a booking flow before learning whether the property is even in
 * their band. The rate comes from `content/rooms.ts` — the approved rate card,
 * in UGX via `formatUgx`, never USD.
 *
 * `sellTo` is rendered as the card's own strapline. It already exists in the
 * content layer as sales guidance and nothing displayed it, and it is the one
 * line that tells a visitor whether *this* of the four rooms is theirs — which
 * is also what gives four short cards enough body to sit level in a row.
 *
 * The photograph leads, because a rate is only meaningful next to what it buys:
 * four price figures in a row invite a comparison on price alone, and the image
 * is what makes the gap between UGX 250,000 and UGX 350,000 legible as a
 * difference in room rather than as a surcharge.
 */
export function RoomRateCard({
  name,
  rateUgx,
  capacity,
  sellTo,
  tagline,
  href,
  image,
  imageSizes = "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw",
}: RoomRateCardProps) {
  return (
    <Link
      href={href}
      underline="none"
      sx={[
        cardSurface(),
        {
          color: "text.primary",
          "&:hover .rate-cta, &:focus-visible .rate-cta": { gap: 3 },
        },
      ]}
    >
      {image && (
        <Box sx={cardMedia()}>
          <AssetImage asset={image} sizes={imageSizes} />
        </Box>
      )}
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "primary.main", mb: 2 }}
      >
        {capacity}
      </Text>
      <Text variant="h3" component="h3" sx={{ mb: 3 }}>
        {name}
      </Text>
      {tagline && (
        <Text variant="body2" color="text.secondary" sx={{ mb: 3, textWrap: "pretty" }}>
          {tagline}
        </Text>
      )}
      <Text
        variant="body2"
        sx={{ mb: 5, pb: 4, borderBottom: "1px solid", borderColor: "divider", opacity: 0.8 }}
      >
        {sellTo}
      </Text>

      <Box sx={{ mt: "auto", display: "grid", gap: 2 }}>
        <Text
          variant="overline"
          component="p"
          sx={{ color: "text.secondary", fontFamily: "var(--font-cartographic)" }}
        >
          {roomsSection.fromLabel}
        </Text>
        <Text component="p" sx={rateSx}>
          {formatUgx(rateUgx)}
        </Text>
        <Text variant="body2" color="text.secondary">
          {roomsSection.rateNote}
        </Text>
        <Text className="rate-cta" variant="overline" component="span" sx={rateCtaSx}>
          {roomsSection.reserveLabel}
          <Icon name="arrow-forward" fontSize="small" sx={{ color: "primary.main" }} />
        </Text>
      </Box>
    </Link>
  );
}
