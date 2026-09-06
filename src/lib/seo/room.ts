import { site } from "@/config/site";
import { identity } from "@/content/identity";
import type { RoomCategory } from "@/schemas/content/roomCategory";

/**
 * `HotelRoom` with an `Offer` priced in UGX — CLAUDE.md §9.
 *
 * Every value traces to `content/rooms.ts` or `content/identity.ts`. There is
 * deliberately no `floorSize`, `bed`, `numberOfRooms` or `AggregateRating`:
 * none is verified, and structured data is the last place to state something
 * the visible page will not.
 *
 * `priceCurrency` comes from `identity.currency` (UGX), so the same guardrail
 * that keeps USD off the visible rate card keeps it out of the markup.
 */
export function roomJsonLd(room: RoomCategory) {
  const url = `${site.url}/accommodation/${room.id}`;
  const roomId = `${url}#room`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "HotelRoom",
      "@id": roomId,
      name: room.name,
      url,
      occupancy: { "@type": "QuantitativeValue", description: room.capacity },
      amenityFeature: room.inclusions.map((inclusion) => ({
        "@type": "LocationFeatureSpecification",
        name: inclusion,
        value: true,
      })),
      containedInPlace: {
        "@type": "Hotel",
        name: identity.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: identity.address,
          addressLocality: "Kampala",
          addressCountry: "UG",
        },
        telephone: identity.telephone,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      url,
      price: room.rateUgx,
      priceCurrency: identity.currency,
      availability: "https://schema.org/InStock",
      itemOffered: { "@id": roomId },
    },
  ];
}

export function breadcrumbJsonLd(trail: { name: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      ...(entry.href ? { item: `${site.url}${entry.href}` } : {}),
    })),
  };
}
