import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { type GalleryShot, eventsAsset } from "@/containers/events/copy";

/**
 * The dressed-room gallery as a horizontal scroll rail — one set-up per
 * frame, each with a cartographic caption. Scrolls inside its own
 * `overflow-x: auto` container so the page body never scrolls sideways;
 * snaps frame to frame on touch. Imagery is placeholder (see `copy/media.ts`).
 */
export function GalleryStrip({ shots }: { shots: GalleryShot[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridAutoFlow: "column",
        gridAutoColumns: { xs: "82%", sm: "48%", md: "31%" },
        gap: { xs: 3, md: 4 },
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        pb: 2,
        mx: { xs: -2, md: 0 },
        px: { xs: 2, md: 0 },
      }}
    >
      {shots.map((shot) => {
        const asset = eventsAsset(shot.assetId);
        if (!asset) {
          return null;
        }
        return (
          <Box key={shot.assetId} sx={{ scrollSnapAlign: "start", display: "grid", gap: 2 }}>
            <MediaFrame hoverZoom>
              <AssetImage
                asset={asset}
                sizes="(max-width: 600px) 82vw, (max-width: 900px) 48vw, 31vw"
              />
            </MediaFrame>
            <Text
              variant="caption"
              component="p"
              sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
            >
              {shot.caption}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
