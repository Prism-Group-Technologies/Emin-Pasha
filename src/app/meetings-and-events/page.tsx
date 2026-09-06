import type { Metadata } from "next";

import { EventsContainer } from "@/containers/events";
import { meetingsPageIntro } from "@/content/meetings";
import { seoMeta } from "@/content/seo";
import { eventVenueJsonLd } from "@/lib/seo/eventVenue";

const meta = seoMeta.find((entry) => entry.page === "meetings");

/** Verified inclusions only — no capacity figure exists (§0.7). */
const AMENITIES = ["Secure parking", "Three restaurants for catering", "Accommodation on site"];

export const metadata: Metadata = {
  title: meta?.title,
  description: meta?.description,
  alternates: { canonical: "/meetings-and-events" },
};

export default function MeetingsAndEventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            eventVenueJsonLd(
              "Meetings & Events",
              meetingsPageIntro,
              "/meetings-and-events",
              AMENITIES,
            ),
          ),
        }}
      />
      <EventsContainer />
    </>
  );
}
