import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { fillImageSx, photoOverlineSx, photoScrimSx } from "@/containers/gallery/styles";
import type { GalleryItem } from "@/containers/gallery/types";
import { radiusTokens } from "@/theme/tokens";

export interface PhotoTileProps {
  item: GalleryItem;
  onOpen: () => void;
  openLabel: string;
}

const SIZES = "(max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw";

/**
 * One photograph on the wall — a real `<button>` that opens the lightbox. The
 * image fills the tile and eases in on hover. The caption is always visible on
 * touch screens and slides up on hover where a pointer can hover, so phones
 * never hide the one thing that tells a guest what they are looking at.
 */
export function PhotoTile({ item, onOpen, openLabel }: PhotoTileProps) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onOpen}
      aria-label={`${openLabel}: ${item.title}`}
      sx={{
        ...fillImageSx,
        position: "relative",
        display: "block",
        width: "100%",
        height: "100%",
        p: 0,
        border: 0,
        cursor: "zoom-in",
        overflow: "hidden",
        textAlign: "start",
        borderRadius: `${radiusTokens.md}px`,
        bgcolor: "action.hover",
        "& img": { transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)" },
        "&:hover img, &:focus-visible img": { transform: "scale(1.05)" },
        "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
        "@media (hover: hover)": {
          "& .tile-caption": { opacity: 0, transform: "translateY(8px)" },
          "&:hover .tile-caption, &:focus-visible .tile-caption": { opacity: 1, transform: "none" },
        },
        "@media (prefers-reduced-motion: reduce)": {
          "& img, & .tile-caption": { transition: "none" },
        },
      }}
    >
      <AssetImage asset={item.asset} sizes={SIZES} />
      <Box
        className="tile-caption"
        aria-hidden
        sx={{
          ...photoScrimSx,
          p: { xs: 2, md: 3 },
          pt: { xs: 5, md: 6 },
          transition: "opacity 240ms ease, transform 240ms ease",
        }}
      >
        <Text variant="overline" component="span" sx={{ ...photoOverlineSx, fontSize: "0.625rem" }}>
          {item.categoryLabel}
        </Text>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}
        >
          <Text variant="body2" component="span" sx={{ color: "inherit", fontWeight: 600 }}>
            {item.title}
          </Text>
          <Icon name="search" fontSize="small" sx={{ display: { xs: "none", md: "block" } }} />
        </Box>
      </Box>
    </Box>
  );
}
