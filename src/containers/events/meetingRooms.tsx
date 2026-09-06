import { EventPage } from "@/containers/events/EventPage";
import { CapacityTable } from "@/containers/events/molecules/CapacityTable";
import { meetingSpaces, meetingsPageIntro } from "@/content/meetings";

const rooms = meetingSpaces.find((space) => space.id === "private-meeting-rooms");

export function MeetingRoomsContainer() {
  return (
    <EventPage
      eyebrow="§ MEETING ROOMS"
      heading={rooms?.name ?? "Private Meeting Rooms"}
      intro={rooms?.description ?? meetingsPageIntro}
      breadcrumb="Private Meeting Rooms"
      assetId="meetings-private-rooms"
      inclusions={[
        "Cutting-edge technology",
        "A dedicated F&B support team",
        "Secure parking",
        "Accommodation on site",
      ]}
      relatedHrefs={["/kudara-hall", "/business-centre", "/accommodation", "/dining"]}
    >
      <CapacityTable spaces={rooms ? [rooms] : []} />
    </EventPage>
  );
}
