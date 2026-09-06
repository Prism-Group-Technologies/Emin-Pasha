import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { ROOM_ASSET_IDS } from "@/containers/accommodation/constants";
import { assets } from "@/content/assets";

/**
 * The room's imagery. Only one asset per category is manifested so far
 * (TODO(EMIN-Q44)), so this renders what exists rather than repeating the
 * same stand-in three times to fake a gallery — a padded gallery of
 * duplicates reads as a broken page, not a full one.
 *
 * The grid is already shaped for the multi-shot set: when the real
 * photography lands, adding ids to `ROOM_GALLERY_IDS` fills it with no
 * layout change, because each cell holds its aspect ratio from the manifest.
 */
const ROOM_GALLERY_IDS: Record<string, string[]> = {};

export function RoomGallery({ roomId, roomName }: { roomId: string; roomName: string }) {
  const ids = ROOM_GALLERY_IDS[roomId] ?? [ROOM_ASSET_IDS[roomId]].filter(Boolean);
  const gallery = ids.flatMap((id) => assets.filter((asset) => asset.id === id));

  if (gallery.length === 0) {
    return null;
  }

  return (
    <Box
      component="section"
      aria-label={`${roomName} photography`}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: gallery.length > 1 ? "repeat(2, 1fr)" : "1fr" },
        gap: 4,
      }}
    >
      {gallery.map((asset, index) => (
        <AssetImage
          key={asset.id}
          asset={asset}
          priority={index === 0}
          sizes={gallery.length > 1 ? "(max-width: 900px) 100vw, 50vw" : "100vw"}
        />
      ))}
    </Box>
  );
}
