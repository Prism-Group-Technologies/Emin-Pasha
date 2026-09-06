import type { Metadata } from "next";

import { GalleryContainer } from "@/containers/gallery";

export const metadata: Metadata = {
  title: "Gallery | Emin Pasha Hotel & Spa Kampala",
  description:
    "Photographs of The Emin Pasha Hotel & Spa in Nakasero, Kampala — rooms and suites, the restaurants and bars, the gardens, the spa and the pool.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return <GalleryContainer />;
}
