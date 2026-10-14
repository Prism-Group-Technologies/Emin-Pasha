import { afterEach, describe, expect, it } from "vitest";

import type { AssetRef } from "@/schemas/content/assetRef";
import { collectZoomGroup, readZoomImage, toZoomImage, zoomAttributes } from "@/utils/imageZoom";

/** Renders one zoomable element's attributes as the HTML `AssetImage` emits. */
function markup(id: string, caption = id) {
  const attrs = zoomAttributes({ id, src: `/${id}.webp`, width: 1600, height: 1067, caption });
  return Object.entries(attrs)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("zoomAttributes / readZoomImage", () => {
  it("round-trips a photograph through the DOM", () => {
    document.body.innerHTML = `<button ${markup("spa-pool", "The pool at dusk")}></button>`;
    const element = document.querySelector("button");

    expect(readZoomImage(element!)).toEqual({
      id: "spa-pool",
      src: "/spa-pool.webp",
      width: 1600,
      height: 1067,
      caption: "The pool at dusk",
    });
  });

  it("refuses a half-serialised photograph rather than showing a broken one", () => {
    document.body.innerHTML = `
      <i id="no-src" data-zoom-id="a" data-zoom-w="10" data-zoom-h="10"></i>
      <i id="no-size" data-zoom-id="a" data-zoom-src="/a.webp" data-zoom-w="0" data-zoom-h="0"></i>
      <i id="junk" data-zoom-id="a" data-zoom-src="/a.webp" data-zoom-w="x" data-zoom-h="y"></i>
    `;

    for (const id of ["no-src", "no-size", "junk"]) {
      expect(readZoomImage(document.getElementById(id)!)).toBeNull();
    }
  });
});

describe("collectZoomGroup", () => {
  it("collects the nearest bounded set in document order and locates the trigger", () => {
    document.body.innerHTML = `
      <section data-zoom-group>
        <button id="a" ${markup("a")}></button>
        <div data-zoom-group>
          <button id="b" ${markup("b")}></button>
          <button id="c" ${markup("c")}></button>
        </div>
        <button id="d" ${markup("d")}></button>
      </section>
      <section data-zoom-group><button id="e" ${markup("e")}></button></section>
    `;

    // The inner boundary wins — `closest` stops at the first match.
    const inner = collectZoomGroup(document.getElementById("c")!);
    expect(inner.images.map((image) => image.id)).toEqual(["b", "c"]);
    expect(inner.index).toBe(1);

    // The outer section still reaches past the nested group's members.
    const outer = collectZoomGroup(document.getElementById("d")!);
    expect(outer.images.map((image) => image.id)).toEqual(["a", "b", "c", "d"]);
    expect(outer.index).toBe(3);
  });

  it("falls back to the document when nothing declares a boundary", () => {
    document.body.innerHTML = `<button id="a" ${markup("a")}></button>`;
    expect(collectZoomGroup(document.getElementById("a")!).images).toHaveLength(1);
  });

  it("skips members with nothing to show, keeping the trigger's index honest", () => {
    document.body.innerHTML = `
      <section data-zoom-group>
        <i data-zoom-id="broken" data-zoom-src="/b.webp" data-zoom-w="0" data-zoom-h="0"></i>
        <button id="real" ${markup("real")}></button>
      </section>
    `;

    const group = collectZoomGroup(document.getElementById("real")!);
    expect(group.images.map((image) => image.id)).toEqual(["real"]);
    expect(group.index).toBe(0);
  });
});

describe("toZoomImage", () => {
  const slot = {
    id: "spa-pool",
    subject: "The pool, shot from the terrace",
    width: 1600,
    height: 1067,
    altText: "The swimming pool at dusk",
    image: { src: "/pool.webp", width: 2400, height: 1600 },
  } as AssetRef;

  it("prefers the delivered file's own size over the slot's declared box", () => {
    expect(toZoomImage(slot)).toEqual({
      id: "spa-pool",
      src: "/pool.webp",
      width: 2400,
      height: 1600,
      caption: "The swimming pool at dusk",
    });
  });

  it("captions a decorative slot with its subject, and takes an override", () => {
    expect(toZoomImage({ ...slot, altText: "" })?.caption).toBe("The pool, shot from the terrace");
    expect(toZoomImage(slot, "Sundowners")?.caption).toBe("Sundowners");
  });

  it("returns null for a slot no photograph fills yet", () => {
    expect(toZoomImage({ ...slot, image: undefined } as AssetRef)).toBeNull();
  });
});
