import type { Metadata } from "next";

import { FaqContainer } from "@/containers/faq";
import { faqItems } from "@/content/faq";
import { faqJsonLd } from "@/lib/seo/faq";
import { breadcrumbJsonLd } from "@/lib/seo/room";

export const metadata: Metadata = {
  title: "FAQ | The Emin Pasha Hotel & Spa Kampala",
  description:
    "Check-in times, airport transfers, parking, Wi-Fi, the pool and spa for non-residents, payment methods and cancellations — answered.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "FAQ" }])),
        }}
      />
      <FaqContainer />
    </>
  );
}
