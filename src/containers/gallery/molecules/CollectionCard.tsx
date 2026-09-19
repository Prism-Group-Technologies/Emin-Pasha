import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import {
  fillImageSx,
  photoMutedSx,
  photoOverlineSx,
  photoScrimSx,
} from "@/containers/gallery/styles";
import type { GalleryCollectionView } from "@/containers/gallery/types";
import { radiusTokens } from "@/theme/tokens";

/**
 * A sibling collection as one clickable photo card: lead photograph, mood,
 * title and the indicative "from" price on a bottom scrim. The whole card is
 * the link, so the target is as large as the image.
 */
export function CollectionCard({ collection }: { collection: GalleryCollectionView }) {
  const lead = collection.items[0];

  return (
    <Link
      href={`/gallery/${collection.slug}`}
      underline="none"
      sx={{
        ...fillImageSx,
        position: "relative",
        display: "block",
        height: "100%",
        minHeight: { xs: 280, md: 340 },
        overflow: "hidden",
        borderRadius: `${radiusTokens.lg}px`,
        bgcolor: "action.hover",
        "& img": { transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)" },
        "&:hover img, &:focus-visible img": { transform: "scale(1.05)" },
        "@media (prefers-reduced-motion: reduce)": { "& img": { transition: "none" } },
      }}
    >
      {lead && <AssetImage asset={lead.asset} sizes="(max-width: 900px) 100vw, 33vw" />}
      <Box sx={{ ...photoScrimSx, gap: 1, p: { xs: 4, md: 5 }, pt: 10 }}>
        <Text variant="overline" component="p" sx={photoOverlineSx}>
          {collection.mood}
        </Text>
        <Text variant="h4" component="h3" sx={{ color: "inherit" }}>
          {collection.title}
        </Text>
        <Text variant="body2" sx={photoMutedSx}>
          {`From ${formatUsd(collection.priceUsd)} ${collection.priceUnit} · indicative`}
        </Text>
      </Box>
    </Link>
  );
}
