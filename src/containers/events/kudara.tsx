import { EventPage } from "@/containers/events/EventPage";
import { CapacityTable } from "@/containers/events/molecules/CapacityTable";
import { meetingSpaces, meetingsPageIntro } from "@/content/meetings";

const hall = meetingSpaces.find((space) => space.id === "kudara-hall");

export function KudaraHallContainer() {
  return (
    <EventPage
      eyebrow="§ KUDARA HALL"
      heading={hall?.name ?? "Kudara Hall"}
      intro={hall?.description ?? meetingsPageIntro}
      breadcrumb="Kudara Hall"
      assetId="meetings-kudara-hall"
      inclusions={["Secure parking", "Three restaurants for catering", "Accommodation on site"]}
      relatedHrefs={["/meeting-rooms", "/business-centre", "/weddings", "/accommodation"]}
    >
      <CapacityTable spaces={hall ? [hall] : []} />
    </EventPage>
  );
}
