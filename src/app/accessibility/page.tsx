import type { Metadata } from "next";

import { LegalDocumentContainer } from "@/containers/legal";
import { breadcrumbJsonLd } from "@/lib/seo/room";

export const metadata: Metadata = {
  title: "Accessibility | The Emin Pasha Hotel & Spa Kampala",
  description:
    "Our commitment to an accessible website (WCAG 2.2 AA) and an accessible stay in Kampala — and how to request assistance.",
  alternates: { canonical: "/accessibility" },
};

const breadcrumbs = breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Accessibility" }]);

export default function AccessibilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <LegalDocumentContainer docId="accessibility" />
    </>
  );
}
