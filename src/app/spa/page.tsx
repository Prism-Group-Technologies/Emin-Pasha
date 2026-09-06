import type { Metadata } from "next";

import { SpaContainer } from "@/containers/wellness/spa";
import { seoMeta } from "@/content/seo";
import { spa, spaPageIntro } from "@/content/wellness";
import { daySpaJsonLd } from "@/lib/seo/wellness";

const meta = seoMeta.find((entry) => entry.page === "spa");

export const metadata: Metadata = {
  title: meta?.title,
  description: meta?.description,
  alternates: { canonical: "/spa" },
};

export default function SpaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(daySpaJsonLd(spa.name, spaPageIntro)) }}
      />
      <SpaContainer />
    </>
  );
}
