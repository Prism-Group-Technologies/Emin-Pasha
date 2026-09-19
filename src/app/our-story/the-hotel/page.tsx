import type { Metadata } from "next";

import { TheHotelPageContainer } from "@/containers/story/theHotel";
import { breadcrumbJsonLd } from "@/lib/seo/room";

export const metadata: Metadata = {
  title: "The Hotel | The Emin Pasha Hotel & Spa, Nakasero",
  description:
    "A luxury boutique hotel and spa in the gardens of Nakasero, Kampala's diplomatic quarter. Heritage architecture, Ugandan décor, and spaces named from Emin Pasha's story.",
  alternates: { canonical: "/our-story/the-hotel" },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/our-story" },
  { name: "The Hotel" },
]);

export default function TheHotelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <TheHotelPageContainer />
    </>
  );
}
