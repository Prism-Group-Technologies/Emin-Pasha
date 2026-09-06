import type { Metadata } from "next";

import { PageShell } from "@/components/templates/PageShell";
import { site } from "@/config/site";
import { getBookingWidgetData } from "@/containers/booking";
import {
  DeferredMobileBookingSheet,
  DeferredStickyBookingBar,
} from "@/containers/booking/organisms/DeferredBookingWidget";
import { shell } from "@/content/shell";
import { hotelJsonLd, organizationJsonLd, webSiteJsonLd } from "@/lib/seo/organisation";
import { InitColorSchemeScript } from "@/theme/InitColorSchemeScript";
import { ThemeRegistry } from "@/theme/ThemeRegistry";
import { bodyFont, cartographicFont, displayFont } from "@/theme/fonts";

export const metadata: Metadata = {
  // Without `metadataBase` every relative `alternates.canonical` resolves to
  // an invalid URL — Lighthouse scored SEO 92 on all eight routes for exactly
  // this. Also gives OG/Twitter image URLs an absolute base.
  metadataBase: new URL(site.url),
  title: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_UG" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${cartographicFont.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* The site's identity graph — Hotel, Organization and WebSite — on
            every page, so any URL an answer engine lands on carries the full
            NAP and entity linkage (CLAUDE.md §9). Per-page nodes (Restaurant,
            DaySpa, EventVenue, Article, FAQPage) are injected by their own
            routes and reference these by @id. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([hotelJsonLd(), organizationJsonLd(), webSiteJsonLd()]),
          }}
        />
        <InitColorSchemeScript />
        <ThemeRegistry>
          {/* The shell is mounted once here rather than per page, so the
              header keeps its scroll/menu state across client-side
              navigations and the two fixed bars never remount. */}
          <PageShell>{children}</PageShell>
          {/* Both booking surfaces are mounted beside the shell rather than
              inside it: the shell lives in `components/`, which never imports
              from `containers/`. Mounting them here rather than per page is
              what lets the bar keep its state — and the guest's half-finished
              search — across client-side navigations instead of remounting on
              every route change.

              Desktop gets the sticky bar, which yields to any full booking
              widget on screen; below `md` it renders nothing and the mobile
              action bar's Book button opens the sheet instead. The sheet's
              chunk is not requested until that first tap. */}
          <DeferredStickyBookingBar
            data={getBookingWidgetData()}
            heroRoutes={shell.header.heroRoutes}
          />
          <DeferredMobileBookingSheet data={getBookingWidgetData()} />
        </ThemeRegistry>
      </body>
    </html>
  );
}
