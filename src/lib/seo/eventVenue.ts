import { site } from "@/config/site";
import { identity } from "@/content/identity";

/**
 * `EventVenue` — CLAUDE.md §9.
 *
 * Deliberately no `maximumAttendeeCapacity`: no capacity figure exists in the
 * source and all are forbidden to invent (§0.7). That property is the one
 * most likely to be extracted by an answer engine asked "how many people fit
 * at Emin Pasha", so guessing it would be the single most damaging invention
 * on this page. `amenityFeature` carries only verified inclusions.
 */
export function eventVenueJsonLd(
  name: string,
  description: string,
  path: string,
  amenities: string[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name,
    description,
    url: `${site.url}${path}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: identity.address,
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
    telephone: identity.telephone,
    amenityFeature: amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
    containedInPlace: { "@type": "Hotel", name: identity.name, url: site.url },
  };
}
