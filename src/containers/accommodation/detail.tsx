import { SectionShell } from "@/components/templates/SectionShell";
import { GuestVoices } from "@/containers/accommodation/organisms/GuestVoices";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { RoomDetailBody } from "@/containers/accommodation/organisms/RoomDetailBody";
import { RoomDetailHero } from "@/containers/accommodation/organisms/RoomDetailHero";
import { RoomGallery } from "@/containers/accommodation/organisms/RoomGallery";
import type { RoomCategory } from "@/schemas/content/roomCategory";
import { alternatingDirection } from "@/theme/motion";

/**
 * One approved category. The descriptive prose is the §4 `[DRAFT — VERIFY]`
 * text (transcribed in `copy/rooms.ts`, rendered by `RoomIntro` pending
 * TODO(EMIN-Q15)); every other field on the page is verified. A Server
 * Component — the only client island is the deferred booking widget inside
 * `RoomDetailBody`.
 *
 *   hero          — name, from-rate, capacity, and the #book CTA
 *   gallery       — the category's photography (placeholder until Q44)
 *   detail        — description, inclusions, and the sticky booking widget
 *   guest voices  — three attributed reviews, accommodation first
 *   related       — the spa, a transfer and dining, to extend the stay
 */
export function RoomDetailContainer({ room }: { room: RoomCategory }) {
  return (
    <>
      <RoomDetailHero room={room} />

      <SectionShell motion={alternatingDirection(1)} variant="bleed">
        <RoomGallery roomId={room.id} roomName={room.name} />
      </SectionShell>

      <RoomDetailBody room={room} motion={alternatingDirection(2)} />

      <GuestVoices motion={alternatingDirection(3)} />

      <SectionShell
        motion={alternatingDirection(4)}
        heading="Make more of your stay"
        variant="raised"
      >
        <RelatedLinks hrefs={["/spa", "/experiences/airport-transfer", "/dining"]} />
      </SectionShell>
    </>
  );
}
