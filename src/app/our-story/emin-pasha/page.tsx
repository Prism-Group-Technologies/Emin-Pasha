import type { Metadata } from "next";

import { NamesakePageContainer } from "@/containers/story/namesake";
import { story } from "@/content/story";
import { articleJsonLd } from "@/lib/seo/article";
import { breadcrumbJsonLd } from "@/lib/seo/room";

export const metadata: Metadata = {
  title: "Who Was Emin Pasha? | The Emin Pasha Hotel & Spa",
  description:
    "The physician, naturalist and linguist who governed Equatoria and refused to be rescued from the country he loved — the full account, and the Kampala hotel named for him.",
  alternates: { canonical: "/our-story/emin-pasha" },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/our-story" },
  { name: "Emin Pasha" },
]);

export default function EminPashaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd("Who was Emin Pasha?", story.lifeIntro, "/our-story/emin-pasha"),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <NamesakePageContainer />
    </>
  );
}
