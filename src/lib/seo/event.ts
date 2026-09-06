import { site } from "@/config/site";
import { identity } from "@/content/identity";
import type { Offer } from "@/schemas/content/offer";

/**
 * `Event` for Friday Band Night — CLAUDE.md §9.
 *
 * `startDate` is **omitted**: schema.org expects a specific ISO datetime and
 * the source gives a recurring weekly night with no confirmed clock time
 * (TODO(EMIN-Q07)). Inventing one would put a wrong date in front of anyone
 * whose calendar app reads it. `eventSchedule` carries the recurrence we can
 * actually stand behind — a Friday — which is the fact the source states in
 * the offer's own name.
 */
export function bandNightJsonLd(offer: Offer) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: offer.name,
    description: offer.description,
    url: `${site.url}/offers`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventSchedule: {
      "@type": "Schedule",
      byDay: "https://schema.org/Friday",
      repeatFrequency: "P1W",
    },
    location: {
      "@type": "Place",
      name: identity.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: identity.address,
        addressLocality: "Kampala",
        addressCountry: "UG",
      },
    },
    organizer: { "@type": "Organization", name: identity.name, url: site.url },
    ...(offer.priceUgx !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: offer.priceUgx,
            priceCurrency: identity.currency,
            availability: "https://schema.org/InStock",
            url: `${site.url}/offers`,
          },
        }
      : {}),
  };
}
