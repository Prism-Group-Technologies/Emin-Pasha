"use client";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import type { LightboxPhoto } from "@/components/molecules/lightboxPhoto";
import { radiusTokens } from "@/theme/tokens";

export interface PhotoRailFrameProps {
  photo: LightboxPhoto;
  onOpen: () => void;
}

/**
 * One frame in a `PhotoRail` — the photograph as a button that enlarges it,
 * with its caption beneath.
 *
 * It is a real `<button>` rather than a click handler on the image, so the
 * whole rail is tabbable, announces "Enlarge: …" and responds to Enter and
 * Space without any of that being reimplemented. `cursor: zoom-in` is the
 * affordance that tells a pointer user the frame opens.
 */
export function PhotoRailFrame({ photo, onOpen }: PhotoRailFrameProps) {
  return (
    <Box sx={{ scrollSnapAlign: "start", display: "grid", gap: 2 }}>
      <Box
        component="button"
        type="button"
        onClick={onOpen}
        aria-label={`Enlarge: ${photo.caption}`}
        sx={{
          p: 0,
          border: 0,
          bgcolor: "transparent",
          cursor: "zoom-in",
          borderRadius: `${radiusTokens.md}px`,
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: 3,
          },
        }}
      >
        <MediaFrame hoverZoom>
          {/* The frame is already the button, so the image must not be a
              second one — a <button> inside a <button> is invalid HTML and
              the rail's own lightbox is the one that should open. */}
          <AssetImage
            asset={photo.asset}
            sizes="(max-width: 600px) 82vw, (max-width: 900px) 48vw, 31vw"
            zoomable={false}
          />
        </MediaFrame>
      </Box>
      <Text
        variant="caption"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
      >
        {photo.caption}
      </Text>
    </Box>
  );
}
