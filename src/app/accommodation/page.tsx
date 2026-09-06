import type { Metadata } from "next";

import { AccommodationContainer } from "@/containers/accommodation";
import { seoMeta } from "@/content/seo";

const meta = seoMeta.find((entry) => entry.page === "accommodation");

export const metadata: Metadata = {
  title: meta?.title,
  description: meta?.description,
  alternates: { canonical: "/accommodation" },
};

export default function AccommodationPage() {
  return <AccommodationContainer />;
}
