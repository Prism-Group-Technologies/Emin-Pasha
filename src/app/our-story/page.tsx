import type { Metadata } from "next";

import { StoryContainer } from "@/containers/story";
import { seoMeta } from "@/content/seo";
import { story } from "@/content/story";
import { articleJsonLd } from "@/lib/seo/article";
import { breadcrumbJsonLd } from "@/lib/seo/room";

const meta = seoMeta.find((entry) => entry.page === "our-story");

export const metadata: Metadata = {
  title: meta?.title,
  description: meta?.description,
  alternates: { canonical: "/our-story" },
};

const breadcrumbs = breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Our Story" }]);

export default function OurStoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd("Who was Emin Pasha?", story.lifeIntro, "/our-story"),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <StoryContainer />
    </>
  );
}
