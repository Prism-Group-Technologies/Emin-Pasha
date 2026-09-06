import type { Metadata } from "next";

import { HomeContainer } from "@/containers/home";
import { seoMeta } from "@/content/seo";

const meta = seoMeta.find((entry) => entry.page === "home");

export const metadata: Metadata = {
  title: meta?.title,
  description: meta?.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeContainer />;
}
