import { EventPage } from "@/containers/events/EventPage";
import { BoardroomDaySection } from "@/containers/events/organisms/BoardroomDaySection";
import { BoardroomGallerySection } from "@/containers/events/organisms/BoardroomGallerySection";
import { BoardroomShowcaseSection } from "@/containers/events/organisms/BoardroomShowcaseSection";
import { BoardroomTechnologySection } from "@/containers/events/organisms/BoardroomTechnologySection";
import { meetingSpaces, meetingsPageIntro } from "@/content/meetings";
import { alternatingDirection } from "@/theme/motion";

const boardroom = meetingSpaces.find((space) => space.id === "boardroom");

/** Alternates against the shared intro band (index 0), so the page keeps flowing. */
const m = (index: number) => alternatingDirection(index + 1);

/**
 * The Boardroom — one fitted room for board sessions, interviews and the
 * meetings that do not belong in an open-plan office.
 *
 * Rebuilt in 2026 from a thin wrapper into a lead funnel of its own, for two
 * reasons. The first is factual: the page previously sold "three newly
 * designed rooms" at 8–40 guests across theatre, U-shape, cabaret and banquet
 * layouts. The delivered photography shows one room with one fixed table and
 * one screen. None of those layouts exist and neither do the other two rooms,
 * so every figure on the page was describing a venue the hotel cannot provide.
 * Syndicate breakouts, which that copy also promised here, are run in Kudara
 * Hall and are now sold there.
 *
 * The second is commercial: a fixed room cannot compete on flexibility, so the
 * page argues the opposite case — permanence. It keeps the shared `EventPage`
 * shell (hero, inclusions, capacity table, then the common process / packages
 * / differentiators / voices / RFP / FAQ / closing funnel) and injects:
 *
 *   showcase    — the pitch, six permanent facts, the primary CTA
 *   technology  — what is built into the room, in six scannable groups
 *   day         — an illustrative board day, sold on what you never have to do
 *   gallery     — eight real frames of the room, every angle
 *
 * The seat count is the only invented figure and is labelled indicative
 * wherever it renders; see `containers/events/copy/boardroom*`.
 */
export function MeetingRoomsContainer() {
  return (
    <EventPage
      heroKey="meeting-rooms"
      eyebrow="§ THE BOARDROOM"
      heading={boardroom?.name ?? "The Boardroom"}
      intro={boardroom?.description ?? meetingsPageIntro}
      breadcrumb="The Boardroom"
      stats={[
        { value: "16", label: "seats (indicative)" },
        { value: "Fixed", label: "table, always set" },
        { value: "Built-in", label: "interactive display" },
        { value: "Dedicated", label: "F&B support team" },
      ]}
      venueIds={["boardroom"]}
      inclusions={[
        "A private room with its own door — yours for the whole day",
        "An interactive display with wired and wireless connection",
        "Power and data in the tabletop, so no cable crosses the floor",
        "A dedicated F&B support team serving breaks to the room",
        "Lunch in either restaurant, and secure parking on site",
        "Rooms upstairs for directors travelling in the night before",
      ]}
      relatedHrefs={["/kudara-hall", "/accommodation", "/dining"]}
    >
      <BoardroomShowcaseSection motion={m(0)} />
      <BoardroomTechnologySection motion={m(1)} />
      <BoardroomDaySection motion={m(2)} />
      <BoardroomGallerySection motion={m(3)} />
    </EventPage>
  );
}
