import type { Metadata } from "next";

import { MeetingRoomsContainer } from "@/containers/events/meetingRooms";
import { meetingSpaces } from "@/content/meetings";
import { eventVenueJsonLd } from "@/lib/seo/eventVenue";

/** Verified inclusions only — the seat count is indicative, so it stays out (§0.7). */
const AMENITIES = [
  "Interactive display",
  "Dedicated F&B support team",
  "Secure parking",
  "Two restaurants for catering",
  "Accommodation on site",
];

const boardroom = meetingSpaces.find((space) => space.id === "boardroom");

/**
 * The route keeps the `/meeting-rooms` path although the room is now sold as
 * The Boardroom: the page has standing for "meeting room Kampala" (see
 * `content/routes.ts`), and a rename would spend that for a cosmetic URL. The
 * title carries both names so the search result matches either query.
 */
export const metadata: Metadata = {
  title: "The Boardroom — Private Meeting Room Kampala | Emin Pasha",
  description:
    "A private fitted boardroom in Nakasero, Kampala. One fixed table, an interactive display built into the room, and a dedicated F&B support team for the day.",
  alternates: { canonical: "/meeting-rooms" },
};

export default function MeetingRoomsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            eventVenueJsonLd(
              boardroom?.name ?? "The Boardroom",
              boardroom?.description ?? "",
              "/meeting-rooms",
              AMENITIES,
            ),
          ),
        }}
      />
      <MeetingRoomsContainer />
    </>
  );
}
