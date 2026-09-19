import type { Metadata } from "next";

import { GmMessagePageContainer } from "@/containers/story/gmMessage";
import { breadcrumbJsonLd } from "@/lib/seo/room";

export const metadata: Metadata = {
  title: "Message from the General Manager | Emin Pasha Hotel",
  description:
    "A word of welcome to The Emin Pasha Hotel & Spa — and what the name is meant to stand for: unity, humanity and an appreciation of nature's marvels.",
  alternates: { canonical: "/our-story/message-from-the-general-manager" },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/our-story" },
  { name: "Message from the General Manager" },
]);

export default function GeneralManagerMessagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <GmMessagePageContainer />
    </>
  );
}
