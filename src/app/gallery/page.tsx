import type { Metadata } from "next";

import { GalleryContainer } from "@/containers/gallery";

export const metadata: Metadata = {
  title: "Gallery | Emin Pasha Hotel & Spa Kampala",
  description:
    "Photos of The Emin Pasha Hotel & Spa, Kampala — suites, dining, gardens, spa and pool, plus curated collections for honeymoons, weddings and spa weekends.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return <GalleryContainer />;
}
