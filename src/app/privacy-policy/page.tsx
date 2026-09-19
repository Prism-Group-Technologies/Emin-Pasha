import type { Metadata } from "next";

import { LegalDocumentContainer } from "@/containers/legal";
import { breadcrumbJsonLd } from "@/lib/seo/room";

export const metadata: Metadata = {
  title: "Privacy Policy | The Emin Pasha Hotel & Spa Kampala",
  description:
    "How The Emin Pasha Hotel & Spa collects, uses and protects your personal data — and how to access, correct or delete it.",
  alternates: { canonical: "/privacy-policy" },
};

const breadcrumbs = breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Privacy policy" }]);

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <LegalDocumentContainer docId="privacy" />
    </>
  );
}
