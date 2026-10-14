import { EventPage } from "@/containers/events/EventPage";
import { CelebrationsRailSection } from "@/containers/events/organisms/CelebrationsRailSection";
import { eventsAndWeddingsOverview } from "@/content/meetings";
import { spaces } from "@/content/spaces";
import { alternatingDirection } from "@/theme/motion";

const gardens = spaces.find((space) => space.id === "equatorial-gardens");

/** Alternates against the shared intro band (index 0), so the page keeps flowing. */
const m = (index: number) => alternatingDirection(index + 1);

/**
 * Weddings & Celebrations — the Equatorial Gardens for the ceremony, the hall
 * for the reception, the poolside lawn for the after-party. Keeps its own
 * hero and inclusions, and shows the indicative capacity table for both
 * outdoor spaces. Figures are invented placeholders from `copy/venues.ts`.
 *
 * Injects one bespoke band between the inclusions and the shared funnel: a
 * rail of twelve real photographs of a themed private celebration, each
 * opening a lightbox. The hotel has no wedding photography at all — every
 * wedding slot on this site is a stand-in — so the band is deliberately framed
 * as "we dress to your scheme" rather than as a wedding it cannot show. See
 * `copy/celebrationsMedia.ts`.
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
        "Two restaurants for catering and tastings on site",
        "Bridal suite, a guest room block and secure parking",
      ].filter(Boolean)}
      relatedHrefs={["/kudara-hall", "/lounges-and-spaces", "/accommodation", "/dining"]}
    >
      <CelebrationsRailSection motion={m(0)} />
    </EventPage>
  );
}
