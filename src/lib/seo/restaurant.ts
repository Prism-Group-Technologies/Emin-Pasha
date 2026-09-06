import { site } from "@/config/site";
import { identity } from "@/content/identity";
import type { Outlet } from "@/schemas/content/outlet";

/**
 * `Restaurant` per outlet — CLAUDE.md §9.
 *
 * Only verified fields. Deliberately **no** `servesCuisine`, `menu`,
 * `openingHours`, `priceRange` or `AggregateRating`: menus, dishes and outlet
 * hours are forbidden to invent (§0.7) and none is in the source, so none is
 * asserted here either. Structured data must not claim what the page will not.
 *
 * The in-room outlet is typed `FoodService` rather than `Restaurant` — it is
 * a room-service offering, not a venue a guest can travel to, and marking it
 * as a Restaurant would put a non-existent place on the map.
 */
/**
 * The source classifies each outlet as restaurant / bar / in-room, so the
 * markup follows that rather than flattening all five to `Restaurant`:
 * `BarOrPub` for the two bars, and `FoodService` for in-room dining, which
 * is a service rather than a venue a guest can travel to.
 */
const SCHEMA_TYPE: Record<Outlet["type"], string> = {
  restaurant: "Restaurant",
  bar: "BarOrPub",
  "in-room": "FoodService",
};

export function outletJsonLd(outlet: Outlet) {
  const url = `${site.url}/dining/${outlet.id}`;

  // `FoodService` is a Service, not a Place: address/telephone/
  // currenciesAccepted/containedInPlace are not its properties, and emitting
  // them was flagged by schema.org validation. It gets `provider` instead.
  if (outlet.type === "in-room") {
    return {
      "@context": "https://schema.org",
      "@type": "FoodService",
      name: outlet.name,
      description: outlet.description,
      url,
      provider: { "@type": "Hotel", name: identity.name, url: site.url },
      areaServed: { "@type": "Hotel", name: identity.name, url: site.url },
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": SCHEMA_TYPE[outlet.type],
    name: outlet.name,
    description: outlet.description,
    url,
    address: {
      "@type": "PostalAddress",
      streetAddress: identity.address,
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
    telephone: identity.telephone,
    currenciesAccepted: identity.currency,
    containedInPlace: { "@type": "Hotel", name: identity.name, url: site.url },
  };
}
