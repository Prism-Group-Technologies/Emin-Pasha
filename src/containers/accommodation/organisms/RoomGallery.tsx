import { SectionShell } from "@/components/templates/SectionShell";
import { GALLERY_ANCHOR_ID, ROOM_GALLERY_IDS } from "@/containers/accommodation/constants";
import { roomGallerySection } from "@/containers/accommodation/copy";
import { RoomGalleryMosaic } from "@/containers/accommodation/organisms/RoomGalleryMosaic";
import { assets } from "@/content/assets";
import type { RevealDirection } from "@/theme/motion";

/**
 * The room's photography, resolved on the server and handed to the mosaic as
 * plain data.
 *
 * This half stays a Server Component on purpose: `content/assets` and the id
 * table never cross the boundary, so the client island receives four
 * serialisable fields per photograph and nothing else — the same split the
 * gallery page's catalogue uses.
 *
 * The band is headed rather than bare. An unlabelled strip of photographs
 * between a dark hero and a wall of copy reads as decoration; a heading and
 * a count tell the guest this is the room, in full, and that there is more
 * behind it.
 */
export function RoomGallery({
  roomId,
  roomName,
  motion = "up",
}: {
  roomId: string;
  roomName: string;
  motion?: RevealDirection;
}) {
  const ids = ROOM_GALLERY_IDS[roomId] ?? [roomId];
  const photos = ids.flatMap((id) => assets.filter((asset) => asset.id === id));

  if (photos.length === 0) {
    return null;
  }

  return (
    <SectionShell
      id={GALLERY_ANCHOR_ID}
      motion={motion}
      eyebrow={roomGallerySection.eyebrow}
      heading={roomGallerySection.heading(roomName)}
      description={roomGallerySection.description}
    >
      <RoomGalleryMosaic photos={photos} roomName={roomName} />
    </SectionShell>
  );
}
