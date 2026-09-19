import { EventPage } from "@/containers/events/EventPage";
import { eventsAndWeddingsOverview } from "@/content/meetings";
import { spaces } from "@/content/spaces";

const gardens = spaces.find((space) => space.id === "equatorial-gardens");

/**
 * Weddings & Celebrations — the Equatorial Gardens for the ceremony, the hall
 * for the reception, the poolside lawn for the after-party. Keeps its own
 * hero and inclusions, and shows the indicative capacity table for both
 * outdoor spaces. Figures are invented placeholders from `copy/venues.ts`.
 */
export function WeddingsContainer() {
  return (
    <EventPage
      heroKey="weddings"
      eyebrow="§ WEDDINGS"
      heading="Weddings & Celebrations"
      intro={eventsAndWeddingsOverview}
      breadcrumb="Weddings & Celebrations"
      stats={[
        { value: "1", label: "wedding a day" },
        { value: "300", label: "garden ceremony (indicative)" },
        { value: "Best", label: "outdoor photos in the city" },
        { value: "On site", label: "bridal suite & room block" },
      ]}
      venueIds={["equatorial-gardens", "poolside-lawn"]}
      inclusions={[
        gardens?.description ?? "",
        "One wedding a day — the estate is yours",
        "Ceremony in the gardens, reception in Kudara Hall, party poolside",
        "Three restaurants for catering and tastings on site",
        "Bridal suite, a guest room block and secure parking",
      ].filter(Boolean)}
      relatedHrefs={["/kudara-hall", "/lounges-and-spaces", "/accommodation", "/dining"]}
    />
  );
}
