"use client";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import type { GalleryItem } from "@/containers/gallery/types";
import { useSwipe } from "@/hooks/useSwipe";
import { radiusTokens } from "@/theme/tokens";

export interface LightboxStageProps {
  item: GalleryItem;
  onNext: () => void;
  onPrevious: () => void;
}

const navSx = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  bgcolor: "rgba(11,11,10,0.55)",
  color: "#FBFAF7",
  "&:hover, &:focus-visible": { bgcolor: "rgba(11,11,10,0.8)" },
} as const;

/**
 * The enlarged photograph with overlaid previous / next controls and swipe.
 * The frame is capped by viewport height through the photo's own ratio, so a
 * portrait never pushes the caption and thumbnails below the fold.
 * `touch-action: pan-y` hands horizontal drags to the swipe handler while
 * leaving vertical scrolling to the browser.
 */
export function LightboxStage({ item, onNext, onPrevious }: LightboxStageProps) {
  const swipe = useSwipe({ onNext, onPrevious });
  const ratio = item.asset.width / item.asset.height;

  return (
    <Box
      {...swipe}
      sx={{
        position: "relative",
        // `alignSelf`, not `mx: auto` — the parent Stack resets child margins.
        alignSelf: "center",
        width: `min(100%, ${(52 * ratio).toFixed(1)}vh)`,
        borderRadius: `${radiusTokens.md}px`,
        overflow: "hidden",
        touchAction: "pan-y",
        userSelect: "none",
      }}
    >
      <AssetImage
        key={item.id}
        asset={item.asset}
        sizes="(max-width: 1200px) 100vw, 1100px"
        priority
      />
      <IconButton aria-label="Previous photograph" onClick={onPrevious} sx={{ ...navSx, left: 8 }}>
        <Icon name="chevron-left" />
      </IconButton>
      <IconButton aria-label="Next photograph" onClick={onNext} sx={{ ...navSx, right: 8 }}>
        <Icon name="chevron-right" />
      </IconButton>
    </Box>
  );
}
