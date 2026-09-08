import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface RoomCardMediaProps {
  asset?: AssetRef;
  /** The category's approved `capacity` string — shown as a chip on the image. */
  capacity: string;
  /** Flags the "Most requested" ribbon — see `ROOM_POPULAR_ID`. */
  popular?: boolean;
}

const chipBase = {
  position: "absolute",
  px: 2.5,
  py: 0.75,
  borderRadius: 999,
  fontFamily: "var(--font-cartographic)",
  fontSize: "0.6875rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
} as const;

/**
 * The room card's image: a rounded `MediaFrame` with a hover zoom, the
 * capacity pinned bottom-left, and — for the one category guests ask for by
 * name — a "Most requested" chip top-right, clear of the placeholder's own
 * id label. Aspect ratio comes from the asset (all four are 3:2), so the
 * cards line up in a row and stay put when real photography lands.
 */
export function RoomCardMedia({ asset, capacity, popular = false }: RoomCardMediaProps) {
  return (
    <MediaFrame radius="md" hoverZoom>
      {asset ? (
        <AssetImage
          asset={asset}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      ) : (
        <Box sx={{ width: "100%", aspectRatio: "3 / 2", bgcolor: "action.hover" }} />
      )}
      {popular && (
        <Text
          component="span"
          sx={{ ...chipBase, top: 12, right: 12, bgcolor: "primary.main", color: "primary.contrastText" }}
        >
          Most requested
        </Text>
      )}
      <Text
        component="span"
        sx={{ ...chipBase, bottom: 12, left: 12, bgcolor: "rgba(11,11,10,0.72)", color: "common.white" }}
      >
        {capacity}
      </Text>
    </MediaFrame>
  );
}
