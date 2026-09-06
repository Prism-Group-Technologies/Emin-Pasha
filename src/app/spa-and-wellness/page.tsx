import type { Metadata } from "next";

import { WellnessContainer } from "@/containers/wellness";
import { seoMeta } from "@/content/seo";

const meta = seoMeta.find((entry) => entry.page === "spa");

export const metadata: Metadata = {
  title: meta?.title,
  description: meta?.description,
  alternates: { canonical: "/spa-and-wellness" },
};

export default function SpaAndWellnessPage() {
  return <WellnessContainer />;
}
