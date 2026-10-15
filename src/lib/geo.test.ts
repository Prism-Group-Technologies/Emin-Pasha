import { describe, expect, it } from "vitest";

import { identity } from "@/content/identity";
import { directionsUrl } from "@/lib/directions";
import { coordinateQuery, coordinates, geoJsonLd, mapEmbedUrl, placeCid, placeUrl } from "@/lib/geo";

/**
 * These assert the one property the previous implementation lacked: that a
 * map URL carries an exact point rather than text for Google to geocode.
 *
 * The bug was invisible to every existing check — the URL was well-formed,
 * the iframe mounted, nothing threw. It simply rendered no marker, because
 * the query was an address containing a P.O. Box. So the regression guard has
 * to be about the *shape of the query*, not the validity of the URL.
 */
describe("hotel coordinate", () => {
  it("sits inside Kampala", () => {
    // Kampala is just north of the equator at ~32.6°E. A sign flip, a swapped
    // lat/lng, or a stray decimal all land outside this box — which is the
    // realistic failure mode for a hand-edited coordinate.
    expect(coordinates.latitude).toBeGreaterThan(0.2);
    expect(coordinates.latitude).toBeLessThan(0.45);
    expect(coordinates.longitude).toBeGreaterThan(32.5);
    expect(coordinates.longitude).toBeLessThan(32.7);
  });

  it("is precise enough to identify a building, not a district", () => {
    // 4 decimal places ≈ 11 m at the equator. Fewer than that and the pin
    // could sit on a neighbour's plot, which is worse than no pin at all.
    for (const value of [coordinates.latitude, coordinates.longitude]) {
      const decimals = String(value).split(".")[1] ?? "";
      expect(decimals.length).toBeGreaterThanOrEqual(4);
    }
  });
});

describe("map URLs", () => {
  it("binds the embed to the listing, never to an address or a bare point", () => {
    expect(new URL(mapEmbedUrl).searchParams.get("cid")).toBe(placeCid);
    expect(mapEmbedUrl).toContain("output=embed");
    // Regression 1: a P.O. Box cannot be geocoded to a building, so no part
    // of the NAP may appear in a map query again.
    expect(mapEmbedUrl).not.toContain("P.O.");
    expect(mapEmbedUrl).not.toContain(encodeURIComponent(identity.address));
    // Regression 2: a coordinate has no business behind it, so clicking the
    // marker reported "Place info couldn't load".
    expect(mapEmbedUrl).not.toContain(coordinateQuery);
  });

  it("points every 'show me the hotel' surface at the listing", () => {
    expect(new URL(placeUrl).searchParams.get("cid")).toBe(placeCid);
    expect(placeUrl).not.toContain("output=embed");
  });

  it("never uses the stale duplicate listing", () => {
    // Google carries a second, review-less "The Emin Pasha Hotel" ~900 m away.
    // Picking it would silently move every map off the property.
    const duplicate = "2761520873959621151";
    expect(placeCid).not.toBe(duplicate);
    for (const url of [mapEmbedUrl, placeUrl]) expect(url).not.toContain(duplicate);
  });

  it("routes directions as navigation via the documented api=1 form", () => {
    const url = new URL(directionsUrl);
    expect(url.pathname).toContain("/dir/");
    expect(url.searchParams.get("api")).toBe("1");
    expect(url.searchParams.get("destination")).toBe(coordinateQuery);
    expect(url.searchParams.get("destination")).not.toContain("Box");
  });
});

describe("Hotel JSON-LD geo", () => {
  it("emits typed GeoCoordinates matching the shared constant", () => {
    expect(geoJsonLd).toEqual({
      "@type": "GeoCoordinates",
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    // Strings validate too, but the vocabulary specifies numbers.
    expect(typeof geoJsonLd.latitude).toBe("number");
  });
});
