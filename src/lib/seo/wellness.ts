import { site } from "@/config/site";
import { identity } from "@/content/identity";

/**
 * `DaySpa` and `ExerciseGym` — CLAUDE.md §9.
 *
 * `openingHours` **is** included here, unlike the dining outlets, because the
 * spa and gym hours are the two the source actually approves (§6: daily
 * 7:00am–9:00pm and 6:00am–9:00pm). Everything else the vendor schema invites
 * — `priceRange`, `hasOfferCatalog`, `aggregateRating` — is omitted: no
 * treatment menu, membership tier or day-pass rate exists (§0.7).
 *
 * Times are in schema.org's `Mo-Su HH:MM-HH:MM` form, converted from the
 * approved 12-hour copy rather than restated as new facts.
 */
const address = {
  "@type": "PostalAddress",
  streetAddress: identity.address,
  addressLocality: "Kampala",
  addressCountry: "UG",
} as const;

function base(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    name,
    description,
    url: `${site.url}${path}`,
    address,
    telephone: identity.telephone,
    currenciesAccepted: identity.currency,
    containedInPlace: { "@type": "Hotel", name: identity.name, url: site.url },
  };
}

export function daySpaJsonLd(name: string, description: string) {
  return {
    ...base(name, description, "/spa"),
    "@type": "DaySpa",
    openingHours: "Mo-Su 07:00-21:00",
  };
}

export function gymJsonLd(name: string, description: string) {
  return {
    ...base(name, description, "/gym"),
    "@type": "ExerciseGym",
    openingHours: "Mo-Su 06:00-21:00",
  };
}
