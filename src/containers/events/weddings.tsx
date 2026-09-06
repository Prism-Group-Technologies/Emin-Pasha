import { EventPage } from "@/containers/events/EventPage";
import { CapacityTable } from "@/containers/events/molecules/CapacityTable";
import { eventsAndWeddingsOverview } from "@/content/meetings";
import { spaces } from "@/content/spaces";

const gardens = spaces.find((space) => space.id === "equatorial-gardens");

export function WeddingsContainer() {
  return (
    <EventPage
      eyebrow="§ WEDDINGS"
      heading="Weddings & Celebrations"
      intro={eventsAndWeddingsOverview}
      breadcrumb="Weddings & Celebrations"
      assetId="weddings-equatorial-gardens"
      inclusions={[
        gardens?.description ?? "",
        "Poolside parties and events",
        "Three restaurants for catering",
        "Secure parking",
        "Accommodation on site",
      ].filter(Boolean)}
      relatedHrefs={["/kudara-hall", "/lounges-and-spaces", "/accommodation", "/dining"]}
    >
      <CapacityTable spaces={gardens ? [gardens] : []} />
    </EventPage>
  );
}
