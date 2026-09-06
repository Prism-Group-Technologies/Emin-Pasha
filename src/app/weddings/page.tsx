import type { Metadata } from "next";

import { WeddingsContainer } from "@/containers/events/weddings";
import { eventsAndWeddingsOverview } from "@/content/meetings";
import { seoMeta } from "@/content/seo";
import { eventVenueJsonLd } from "@/lib/seo/eventVenue";

const meta = seoMeta.find((entry) => entry.page === "weddings");

/** Verified inclusions only — no capacity figure exists (§0.7). */
const AMENITIES = ["Secure parking", "Three restaurants for catering", "Accommodation on site"];

export const metadata: Metadata = {
  title: meta?.title,
  description: meta?.description,
  alternates: { canonical: "/weddings" },
};

export default function WeddingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            eventVenueJsonLd(
              "Equatorial Gardens",
              eventsAndWeddingsOverview,
              "/weddings",
              AMENITIES,
            ),
          ),
        }}
      />
      <WeddingsContainer />
    </>
  );
}
