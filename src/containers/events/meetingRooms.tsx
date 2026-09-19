import { EventPage } from "@/containers/events/EventPage";
import { meetingSpaces, meetingsPageIntro } from "@/content/meetings";

const rooms = meetingSpaces.find((space) => space.id === "private-meeting-rooms");

/**
 * The private meeting rooms — board sessions, breakouts and interviews. Keeps
 * its own hero, inclusions and indicative capacity table, then inherits the
 * shared events funnel. Capacity figures are invented placeholders from
 * `copy/venues.ts`, labelled indicative where the table renders them.
 */
export function MeetingRoomsContainer() {
  return (
    <EventPage
      heroKey="meeting-rooms"
      eyebrow="§ MEETING ROOMS"
      heading={rooms?.name ?? "Private Meeting Rooms"}
      intro={rooms?.description ?? meetingsPageIntro}
      breadcrumb="Private Meeting Rooms"
      stats={[
        { value: "3", label: "configurable rooms" },
        { value: "8–40", label: "guests per room" },
        { value: "VC-ready", label: "waiting-room control" },
        { value: "Dedicated", label: "F&B support team" },
      ]}
      venueIds={["private-meeting-rooms"]}
      inclusions={[
        "Boardroom, U-shape, cabaret or theatre — reset between sessions",
        "Video-conference kit with waiting-room functionality",
        "A dedicated F&B support team and secure parking",
        "Private dinner in a restaurant to close the day",
        "Accommodation on site for out-of-town attendees",
      ]}
      relatedHrefs={["/kudara-hall", "/business-centre", "/accommodation", "/dining"]}
    />
  );
}
