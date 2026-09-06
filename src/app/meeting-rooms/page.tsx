import type { Metadata } from "next";

import { MeetingRoomsContainer } from "@/containers/events/meetingRooms";
import { meetingsPageIntro } from "@/content/meetings";
import { eventVenueJsonLd } from "@/lib/seo/eventVenue";

/** Verified inclusions only — no capacity figure exists (§0.7). */
const AMENITIES = ["Secure parking", "Three restaurants for catering", "Accommodation on site"];

export const metadata: Metadata = {
  title: "Private Meeting Rooms Kampala | Emin Pasha",
  description:
    "Newly designed private meeting rooms in Nakasero, Kampala, with cutting-edge technology and a dedicated F&B support team.",
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
              "Private Meeting Rooms",
              meetingsPageIntro,
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
