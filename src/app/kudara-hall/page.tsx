import type { Metadata } from "next";

import { KudaraHallContainer } from "@/containers/events/kudara";
import { meetingsPageIntro } from "@/content/meetings";
import { eventVenueJsonLd } from "@/lib/seo/eventVenue";

/** Verified inclusions only — no capacity figure exists (§0.7). */
const AMENITIES = ["Secure parking", "Three restaurants for catering", "Accommodation on site"];

export const metadata: Metadata = {
  title: "Conference Venue Kampala | Kudara Hall, Emin Pasha",
  description:
    "Kudara Hall — a state-of-the-art conference and events venue in Nakasero, Kampala. Secure parking, three restaurants for catering and rooms on site.",
  alternates: { canonical: "/kudara-hall" },
};

export default function KudaraHallPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            eventVenueJsonLd("Kudara Hall", meetingsPageIntro, "/kudara-hall", AMENITIES),
          ),
        }}
      />
      <KudaraHallContainer />
    </>
  );
}
