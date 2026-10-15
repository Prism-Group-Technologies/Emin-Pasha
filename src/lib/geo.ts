import { z } from "zod";

/**
 * Where the hotel is, and which Google place it *is* — the single place both
 * facts are written down.
 *
 * ## The place identifier
 *
 * `placeCid` is Google's own identifier for the property's business listing.
 * Binding every map to it, rather than to a coordinate or an address string,
 * is what makes Google render the hotel's name, address and rating instead of
 * an anonymous dot. Two bugs traced back to not having it:
 *
 * 1. A map query built from the NAP string returned **no marker at all** — the
 *    address contains a P.O. Box, a mailbox is not a building, and Google's
 *    geocoder gave up and fell back to a locality centroid.
 * 2. A bare `lat,lng` query did drop a marker, but clicking it reported
 *    "Place info couldn't load": a coordinate is a point, not a business, so
 *    there was no listing behind the pin to describe. Google resolves such a
 *    link to a DMS placeholder — `0°19'46.9"N 32°34'39.4"E` — with no name,
 *    no phone and no rating.
 *
 * A CID has neither failure mode, because it *is* the listing.
 *
 * ## Which listing
 *
 * Google carries **two** entries for this property, so the choice is not
 * arbitrary and must not be "corrected" to the other one:
 *
 * - `2014717271745588737` — "The Emin Pasha Hotel & Spa - Kampala",
 *   0.3297013, 32.5776001, 4.3★ from 1,011 reviews, address "Plot 27,
 *   Nakasero/P.O. Box 23825 Akii Bua Rd". The real, reviewed listing, and the
 *   one used here.
 * - `2761520873959621151` — "The Emin Pasha Hotel", 0.324821, 32.58426. A
 *   stale duplicate roughly 900 m away off Kafu Road, with no reviews. It is
 *   why a plain name search cannot be used: Google cannot choose between the
 *   two, so it zooms out to fit both and pins neither.
 *
 * The duplicate is a Google Business Profile problem, not a code one — it
 * splits reviews and weakens the map pack, and the operator has to merge it.
 */
export const placeCid = "2014717271745588737";

/**
 * The property's position, for `schema.org` and for turn-by-turn navigation.
 *
 * This is the anchor Google's own listing (`placeCid`) resolves to, which is
 * why it is preferred over any third-party reading. It is independently
 * corroborated by OpenStreetMap way 345321809 — a mapped building polygon
 * tagged `tourism=hotel`, `addr:housenumber=27`, `addr:street=Akii Bua Road`
 * — whose centroid is 0.3298254, 32.5774696, about 15 m away and whose
 * bounding box contains the value below. Two sources, one rooftop.
 */
const coordinatesSchema = z.object({
  /** Degrees north; Kampala sits just above the equator, hence the small value. */
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const coordinates = coordinatesSchema.parse({
  latitude: 0.3297013,
  longitude: 32.5776001,
});

/** `lat,lng` — the form Google accepts as an exact navigable point. */
export const coordinateQuery = `${coordinates.latitude},${coordinates.longitude}`;

/**
 * The embeddable map: a named, clickable marker on the hotel's own listing,
 * with the info card Google renders beside it.
 *
 * Deliberately keyless. Google's documented Embed API would do the same job,
 * but it requires a publishable key, referrer restrictions and a billing
 * account — infrastructure this site does not have. The `cid` + `output=embed`
 * form needs none of that and, because it names the place outright, produces
 * the same marker and the same card.
 *
 * Both consumers are consent-gated — `MapEmbed` is click-to-load and
 * `LiveMap` mounts on approach — so this is never requested before the
 * visitor asks for a map.
 */
export const mapEmbedUrl = `https://maps.google.com/maps?cid=${placeCid}&output=embed`;

/**
 * The hotel's listing on Google Maps — name, photos, reviews, opening hours
 * and a Directions button.
 *
 * For every surface that means "show me this hotel": the "Open in Google
 * Maps" control on the map, the address rows in the footer and on the contact
 * page, and `hasMap` in the JSON-LD. Pointing those at a coordinate instead
 * produced the nameless DMS placeholder described above.
 */
export const placeUrl = `https://maps.google.com/maps?cid=${placeCid}`;

/**
 * `schema.org/GeoCoordinates`, for the `Hotel` entity. Numbers, not strings:
 * Google's structured-data parser accepts both, but the typed form is what
 * the vocabulary specifies.
 */
export const geoJsonLd = {
  "@type": "GeoCoordinates",
  latitude: coordinates.latitude,
  longitude: coordinates.longitude,
} as const;
