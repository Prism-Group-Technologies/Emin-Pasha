import type { Metadata } from "next";

import { DiningContainer } from "@/containers/dining";
import { seoMeta } from "@/content/seo";

const meta = seoMeta.find((entry) => entry.page === "dining");

export const metadata: Metadata = {
  title: meta?.title,
  description: meta?.description,
  alternates: { canonical: "/dining" },
};

export default function DiningPage() {
  return <DiningContainer />;
}
