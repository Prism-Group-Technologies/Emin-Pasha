import { SectionShell } from "@/components/templates/SectionShell";
import { roomDetailMotion as m } from "@/containers/accommodation/detailMotion";
import { ClosingSection } from "@/containers/accommodation/organisms/ClosingSection";
import { GuestVoices } from "@/containers/accommodation/organisms/GuestVoices";
import { OtherRooms } from "@/containers/accommodation/organisms/OtherRooms";
import { PackagesSection } from "@/containers/accommodation/organisms/PackagesSection";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { RoomDetailBody } from "@/containers/accommodation/organisms/RoomDetailBody";
import { RoomDetailHero } from "@/containers/accommodation/organisms/RoomDetailHero";
import { RoomGallery } from "@/containers/accommodation/organisms/RoomGallery";
import { RoomInclusions } from "@/containers/accommodation/organisms/RoomInclusions";
import { RoomPolicies } from "@/containers/accommodation/organisms/RoomPolicies";
import type { RoomCategory } from "@/schemas/content/roomCategory";

/**
 * One approved category. The descriptive prose is the §4 `[DRAFT — VERIFY]`
 * text (transcribed in `copy/rooms.ts`, rendered by `RoomIntro` pending
 * TODO(EMIN-Q15)); every other field on the page is verified.
 *
 * The order is a funnel, not a brochure — the same argument the hub makes,
 * narrowed to one room:
 *
 *   hero          — name, from-rate, capacity, and the two in-page CTAs
 *   gallery       — the mosaic and its lightbox: see the room, then book it
 *   body          — the argument for this room, beside the sticky rate card
 *   inclusions    — what the nightly rate buys
 *   policies      — children, extra beds, and the five booking questions
 *   packages      — four reasons to be here, priced from the same rate card
 *   guest voices  — three attributed reviews, accommodation first
 *   other rooms   — the three this page is not about, so it is not a dead end
 *   related       — the spa, a transfer and dining, to extend the stay
 *   closing       — the last exit, on all three contact channels
 *
 * The bands alternate tone from `inclusions` down — raised, cream, raised,
 * cream — because a page that runs one unbroken field from the hero to the
 * footer makes every section on it look equally optional. `PackagesSection`
 * and `ClosingSection` are raised where they stand, so the order above is
 * also what keeps two raised bands from ever landing side by side.
 *
 * Conversion surfaces are spread rather than stacked: the hero jumps straight
 * to `#book`, the lightbox footer offers it again at peak intent, and the
 * closing band carries it for anyone who read the whole page. A Server
 * Component throughout — the client islands are the gallery mosaic, the
 * deferred booking widget and the FAQ accordion.
 */
export function RoomDetailContainer({ room }: { room: RoomCategory }) {
  return (
    <>
      <RoomDetailHero room={room} />
      <RoomGallery roomId={room.id} roomName={room.name} motion={m.gallery} />
      <RoomDetailBody room={room} motion={m.body} />
      <RoomInclusions motion={m.inclusions} />
      <RoomPolicies motion={m.policies} />
      <PackagesSection motion={m.packages} />
      <GuestVoices motion={m.guestVoices} />
      <OtherRooms currentRoomId={room.id} motion={m.otherRooms} />

      <SectionShell motion={m.related} heading="Make more of your stay">
        <RelatedLinks hrefs={["/spa", "/experiences/airport-transfer", "/dining"]} />
      </SectionShell>

      <ClosingSection motion={m.closing} />
    </>
  );
}
