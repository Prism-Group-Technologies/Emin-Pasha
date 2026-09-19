"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { RoomGalleryTile } from "@/containers/accommodation/molecules/RoomGalleryTile";
import { RoomLightbox } from "@/containers/accommodation/organisms/RoomLightbox";
import { roomMosaic } from "@/containers/accommodation/roomMosaic";
import { useLightbox } from "@/hooks/useLightbox";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface RoomGalleryMosaicProps {
  photos: AssetRef[];
  roomName: string;
}

/**
 * 'use client' justification: opening a photograph is a click, and the
 * lightbox it opens is keyboard- and swipe-navigable state.
 *
 * The mosaic itself is a 12×6 grid whose placements come from `roomMosaic`,
 * so the arrangement is a tested property of the photo count rather than
 * something this file improvises. Below `md` the same cells collapse to two
 * columns. The lead photograph is the one `priority` image; the rest lazy-load.
 *
 * `sizes` is per-tile because the lead occupies two thirds of the container
 * and its neighbours a third — telling the browser they are all `100vw` is
 * how a gallery ends up shipping four times the bytes it renders.
 */
export function RoomGalleryMosaic({ photos, roomName }: RoomGalleryMosaicProps) {
  const { cells, ratio, hidden } = roomMosaic(photos.length);
  const lightbox = useLightbox(photos.length);
  // Paired rather than indexed twice, so the cell and its photograph are
  // narrowed together — `roomMosaic` never returns more cells than there are
  // photographs, but the types should not have to take that on trust.
  const tiles = cells.flatMap((cell, index) => {
    const asset = photos[index];
    return asset ? [{ cell, asset, index }] : [];
  });

  return (
    <Box sx={{ display: "grid", gap: { xs: 4, md: 5 } }}>
      <Box
        sx={{
          display: "grid",
          gap: { xs: 1.5, md: 2 },
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(12, 1fr)" },
          gridTemplateRows: { md: "repeat(6, 1fr)" },
          aspectRatio: { md: ratio },
        }}
      >
        {tiles.map(({ cell, asset, index }) => (
          <RoomGalleryTile
            key={asset.id}
            asset={asset}
            cell={cell}
            index={index}
            onOpen={lightbox.openAt}
            remaining={index === tiles.length - 1 ? hidden : 0}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: { xs: "stretch", sm: "flex-start" } }}>
        <Button
          variant="ghost"
          startIcon={<Icon name="camera" fontSize="small" />}
          onClick={() => lightbox.openAt(0)}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          {`View all ${photos.length} photographs`}
        </Button>
      </Box>

      <RoomLightbox photos={photos} lightbox={lightbox} roomName={roomName} />
    </Box>
  );
}
