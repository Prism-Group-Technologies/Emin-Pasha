import type { Metadata } from "next";

import { OffersContainer } from "@/containers/offers";
import { offers } from "@/content/offers";
import { bandNightJsonLd } from "@/lib/seo/event";

const bandNight = offers.find((offer) => offer.id === "friday-band-night");

export const metadata: Metadata = {
  title: "Offers & Friday Band Night | Emin Pasha Kampala",
  description:
    "Live music on a Friday, cocktails as the equatorial sun goes down, and packages built for the way people actually use this hotel in Nakasero, Kampala.",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  return (
    <>
      {bandNight && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bandNightJsonLd(bandNight)) }}
        />
      )}
      <OffersContainer />
    </>
  );
}
