"use client";

import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import { Image } from "@/components/atoms/Image";
import { useSwipe } from "@/hooks/useSwipe";
import { colorTokens, radiusTokens } from "@/theme/tokens";
import type { ZoomImage } from "@/types/imageZoom";

export interface LightboxStageProps {
  image: ZoomImage;
  onNext: () => void;
  onPrevious: () => void;
  /** Drops the arrows for a set of one, where they would go nowhere. */
  navigable?: boolean;
}

const navSx = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  bgcolor: "rgba(8,5,3,0.55)",
  color: colorTokens.ink.contrastCopy,
  "&:hover, &:focus-visible": { bgcolor: "rgba(8,5,3,0.8)" },
} as const;

/**
 * The enlarged photograph with overlaid previous / next controls and swipe —
 * the one stage in the product. The gallery wall, the room mosaic, `PhotoRail`
 * and the site-wide image modal all mount this, which is what stops four
 * surfaces each re-deriving the viewport cap and the arrow placement.
 *
 * It speaks `ZoomImage`, not `AssetRef`: the site-wide modal reconstructs its
 * photographs from DOM data attributes and has no access to the content layer
 * (D25), so the stage's input is the smallest shape all four callers can
 * produce. The caption is the `alt` — in a dialog whose entire subject is one
 * photograph, there is no such thing as a decorative image.
 *
 * The frame is capped by viewport height through the photograph's own ratio,
 * so a portrait never pushes the caption and thumbnails below the fold.
 * `touch-action: pan-y` hands horizontal drags to the swipe handler while
 * leaving vertical scrolling to the browser.
 */
export function LightboxStage({ image, onNext, onPrevious, navigable = true }: LightboxStageProps) {
  const swipe = useSwipe({ onNext, onPrevious });
  const ratio = image.width / image.height;

  return (
    <Box
      {...(navigable ? swipe : {})}
      sx={{
        position: "relative",
        // `alignSelf`, not `mx: auto` — the parent Stack resets child margins.
        alignSelf: "center",
        width: `min(100%, ${(52 * ratio).toFixed(1)}vh)`,
        aspectRatio: `${image.width} / ${image.height}`,
        borderRadius: `${radiusTokens.md}px`,
        overflow: "hidden",
        bgcolor: "action.hover",
        touchAction: "pan-y",
        userSelect: "none",
      }}
    >
      <Image
        key={image.id}
        src={image.src}
        alt={image.caption}
        fill
        sizes="(max-width: 1200px) 100vw, 1100px"
        priority
        style={{ objectFit: "contain" }}
      />
      {navigable && (
        <>
          <IconButton
            aria-label="Previous photograph"
            onClick={onPrevious}
            sx={{ ...navSx, left: 8 }}
          >
            <Icon name="chevron-left" />
          </IconButton>
          <IconButton aria-label="Next photograph" onClick={onNext} sx={{ ...navSx, right: 8 }}>
            <Icon name="chevron-right" />
          </IconButton>
        </>
      )}
    </Box>
  );
}
