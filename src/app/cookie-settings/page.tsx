import type { Metadata } from "next";

import { CookieSettingsContainer } from "@/containers/legal/cookieSettings";
import { breadcrumbJsonLd } from "@/lib/seo/room";

export const metadata: Metadata = {
  title: "Cookie Settings | The Emin Pasha Hotel & Spa Kampala",
  description:
    "Manage your cookie preferences for The Emin Pasha Hotel & Spa website — switch analytics and marketing cookies on or off at any time.",
  alternates: { canonical: "/cookie-settings" },
};

const breadcrumbs = breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Cookie settings" }]);

export default function CookieSettingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <CookieSettingsContainer />
    </>
  );
}
