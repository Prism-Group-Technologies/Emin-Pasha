import type { Metadata } from "next";

import { LegalDocumentContainer } from "@/containers/legal";
import { breadcrumbJsonLd } from "@/lib/seo/room";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Emin Pasha Hotel & Spa Kampala",
  description:
    "Booking, deposit, cancellation and stay terms at The Emin Pasha Hotel & Spa, Nakasero — in plain English.",
  alternates: { canonical: "/terms" },
};

const breadcrumbs = breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Terms" }]);

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <LegalDocumentContainer docId="terms" />
    </>
  );
}
