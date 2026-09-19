import { EventPage } from "@/containers/events/EventPage";
import { businessCentrePageIntro, meetingSpaces } from "@/content/meetings";

const centre = meetingSpaces.find((space) => space.id === "business-centre");

/**
 * The Business Centre — bookable office space and small meeting pods. Keeps
 * its own hero and inclusions; the indicative capacity table is shown for the
 * pods. Group terms are hidden (`showGroupTerms={false}`): individual and
 * company day-desk bookings do not run to a rooming list.
 */
export function BusinessCentreContainer() {
  return (
    <EventPage
      heroKey="business-centre"
      eyebrow="§ BUSINESS CENTRE"
      heading={centre?.name ?? "The Business Centre"}
      intro={businessCentrePageIntro}
      breadcrumb="Business Centre"
      stats={[
        { value: "By the day", label: "or the half-day" },
        { value: "Virtual-ready", label: "waiting-room control" },
        { value: "Dedicated", label: "on-site staff" },
        { value: "Nakasero", label: "10 min from the CBD" },
      ]}
      venueIds={["business-centre"]}
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
