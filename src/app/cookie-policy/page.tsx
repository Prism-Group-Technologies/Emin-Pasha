import type { Metadata } from "next";

import { LegalDocumentContainer } from "@/containers/legal";
import { breadcrumbJsonLd } from "@/lib/seo/room";

export const metadata: Metadata = {
  title: "Cookie Policy | The Emin Pasha Hotel & Spa Kampala",
  description:
    "Which cookies our website uses, why, how long they last, and how to switch off analytics and marketing cookies in one click.",
  alternates: { canonical: "/cookie-policy" },
};

const breadcrumbs = breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Cookie policy" }]);

export default function CookiePolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <LegalDocumentContainer docId="cookies" />
    </>
  );
}
