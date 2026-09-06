import { site } from "@/config/site";
import { identity } from "@/content/identity";
import { rooms } from "@/content/rooms";
import { socialLinks } from "@/content/social";
import { gym, spa } from "@/content/wellness";

const address = {
  "@type": "PostalAddress",
  streetAddress: identity.address,
  addressLocality: "Kampala",
  addressCountry: "UG",
} as const;

/** Only platforms with a confirmed URL — LinkedIn has none (Q67). */
const sameAs = socialLinks.map((link) => link.url).filter((url): url is string => Boolean(url));

const lowestRate = Math.min(...rooms.map((room) => room.rateUgx));

/**
 * `Hotel` — the site's primary entity. Every value traces to
 * `content/identity.ts` or the rate card, so the NAP here is byte-identical
 * to the footer and the contact page (asserted by `yarn check:seo`).
 *
 * **No `aggregateRating` or `starRating`.** CLAUDE.md §9 blocks the first
 * until verified reviews exist, and §0.7 forbids inventing a star rating.
 * `priceRange` is the real UGX floor from the approved rate card, not a
 * `$$$`-style guess.
 */
export function hotelJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${site.url}/#hotel`,
    name: identity.name,
    alternateName: identity.shortName,
    description: identity.category,
    url: site.url,
    telephone: identity.telephone,
    email: identity.email,
    address,
    sameAs,
    currenciesAccepted: identity.currency,
    priceRange: `${identity.currency} ${lowestRate.toLocaleString("en-UG")}+`,
    checkinTime: identity.checkInTime,
    checkoutTime: identity.checkOutTime,
    amenityFeature: [spa.name, gym.name, "Swimming pool", "Free Wi-Fi", "Secure parking"].map(
      (name) => ({ "@type": "LocationFeatureSpecification", name, value: true }),
    ),
    makesOffer: rooms.map((room) => ({
      "@type": "Offer",
      name: room.name,
      price: room.rateUgx,
      priceCurrency: identity.currency,
      url: `${site.url}/accommodation/${room.id}`,
    })),
  };
}

/** `Organization` — the business behind the property. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: identity.name,
    url: site.url,
    email: identity.email,
    telephone: identity.telephone,
    address,
    sameAs,
  };
}

/**
 * `WebSite` + `SearchAction`. The target points at the FAQ's own anchor list
 * rather than a site search — there is no search endpoint, and declaring one
 * that 404s is worse than declaring none. Revisit when search ships.
 */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: identity.name,
    url: site.url,
    inLanguage: "en",
    publisher: { "@id": `${site.url}/#organization` },
  };
}
