import { EventPage } from "@/containers/events/EventPage";
import { businessCentrePageIntro, meetingSpaces } from "@/content/meetings";

const centre = meetingSpaces.find((space) => space.id === "business-centre");

export function BusinessCentreContainer() {
  return (
    <EventPage
      eyebrow="§ BUSINESS CENTRE"
      heading={centre?.name ?? "The Business Centre"}
      intro={businessCentrePageIntro}
      breadcrumb="Business Centre"
      assetId="meetings-business-centre"
      inclusions={[
        "Fully equipped for virtual sessions, including waiting-room functionality",
        "Bluetooth speakerphones, conference bars and collaboration displays",
        "Internet, bottled water, projectors and notebooks as standard",
        "Dedicated staff assigned to business centre guests",
      ]}
      relatedHrefs={["/meeting-rooms", "/kudara-hall", "/accommodation"]}
      showGroupTerms={false}
    />
  );
}
