import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Chip } from "@/components/atoms/Chip";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { SignatureDish } from "@/containers/dining/menuView";
import { formatUgx } from "@/utils/currency";

/**
 * One signature dish as a card: a plated hero photo with its course pinned
 * over it, then the dish name, its one line of copy, and — unless it is a
 * no-separate-price tasting course — an indicative price.
 *
 * Built on the shared `cardSurface()` like `DiningOutletCard`, so a strip of
 * two or three still reads as a grid when the copy lengths differ. The chip
 * uses `background.default` / `text.primary` rather than a fixed colour, so it
 * carries in both schemes.
 *
 * The card carries the dish's asset id as its DOM id: the matching row in the
 * full menu links here, and `scrollMarginTop` keeps the sticky header clear of
 * the landing (the offset the FAQ and Story anchors also use).
 */
export function SignatureDishCard({ dish }: { dish: SignatureDish }) {
  return (
    <Box
      component="article"
      id={dish.asset?.id}
      sx={[cardSurface(), { p: 0, overflow: "hidden", scrollMarginTop: 120 }]}
    >
      {dish.asset && (
        <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
          <AssetImage
            asset={dish.asset}
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          />
          <Chip
            label={dish.course}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "background.default",
              color: "text.primary",
              fontFamily: "var(--font-cartographic)",
            }}
          />
        </MediaFrame>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: { xs: 4, md: 5 }, flex: 1 }}>
        <Text variant="h4" component="h3">
          {dish.name}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {dish.description}
        </Text>
        {dish.priceUgx > 0 && (
          <Text
            variant="body2"
            sx={{ mt: 1, fontFamily: "var(--font-cartographic)", color: "text.primary" }}
          >
            {formatUgx(dish.priceUgx)}
          </Text>
        )}
      </Box>
    </Box>
  );
}
