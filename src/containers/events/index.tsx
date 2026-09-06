import { EventPage } from "@/containers/events/EventPage";
import { CapacityTable } from "@/containers/events/molecules/CapacityTable";
import { eventsAndWeddingsOverview, meetingSpaces, meetingsPageIntro } from "@/content/meetings";

export function EventsContainer() {
  return (
    <EventPage
      eyebrow="§ MEETINGS & EVENTS"
      heading="Meetings & Events"
      intro={meetingsPageIntro}
      breadcrumb=""
      assetId="meetings-kudara-hall"
      inclusions={[eventsAndWeddingsOverview]}
      relatedHrefs={[
        "/kudara-hall",
        "/meeting-rooms",
        "/business-centre",
        "/weddings",
        "/accommodation",
        "/dining",
      ]}
    >
      <CapacityTable spaces={meetingSpaces} />
    </EventPage>
  );
}
