import type { AssetRef } from "@/schemas/content/assetRef";
import type { ZoomImage } from "@/types/imageZoom";

/**
 * Marks an element as an enlargeable photograph. `src` rather than a bare
 * `data-zoom` flag is the selector on purpose: an element without a resolved
 * file has nothing to enlarge, so "is zoomable" and "has a photograph" are
 * the same question and cannot drift apart.
 */
export const ZOOM_SELECTOR = "[data-zoom-src]";

/** Marks the ancestor that bounds one navigable set. */
export const ZOOM_GROUP_SELECTOR = "[data-zoom-group]";

/**
 * Spread onto any element that should bound a set — a mosaic, a carousel, a
 * card grid. `SectionShell` carries it on every `<section>`, so the default
 * boundary is the section a visitor was looking at; a tighter wrapper that
 * spreads this wins, because `closest` stops at the first match.
 *
 * A constant spread rather than a wrapper component: a `<ZoomGroup>` would
 * add a DOM node to every section on the site to carry one attribute.
 */
export const zoomGroup = { "data-zoom-group": "" } as const;

export interface ZoomAttributes {
  "data-zoom-id": string;
  "data-zoom-src": string;
  "data-zoom-w": string;
  "data-zoom-h": string;
  "data-zoom-caption": string;
}

/** Serialises one photograph onto the element that opens it. */
export function zoomAttributes(image: ZoomImage): ZoomAttributes {
  return {
    "data-zoom-id": image.id,
    "data-zoom-src": image.src,
    "data-zoom-w": String(image.width),
    "data-zoom-h": String(image.height),
    "data-zoom-caption": image.caption,
  };
}

/** Reads one back. Returns null for anything incomplete — never a half image. */
export function readZoomImage(element: Element): ZoomImage | null {
  const data = (element as HTMLElement).dataset;
  const width = Number(data.zoomW);
  const height = Number(data.zoomH);
  if (!data.zoomSrc || !data.zoomId || !(width > 0) || !(height > 0)) {
    return null;
  }
  return {
    id: data.zoomId,
    src: data.zoomSrc,
    width,
    height,
    caption: data.zoomCaption ?? "",
  };
}

export interface ZoomGroupResult {
  images: ZoomImage[];
  /** Where the clicked photograph sits in `images`. */
  index: number;
}

/**
 * Every enlargeable photograph inside the trigger's nearest group boundary,
 * in document order, plus the trigger's own position in that set.
 *
 * Document order is the right order because it is the order the visitor just
 * read the page in — deriving it from the DOM rather than from props is also
 * what lets fifty-odd unrelated Server Components contribute to one navigable
 * set without any of them knowing the others exist.
 */
export function collectZoomGroup(trigger: Element): ZoomGroupResult {
  const scope = trigger.closest(ZOOM_GROUP_SELECTOR) ?? trigger.ownerDocument.body;
  const images: ZoomImage[] = [];
  let index = 0;

  for (const node of scope.querySelectorAll(ZOOM_SELECTOR)) {
    const image = readZoomImage(node);
    if (!image) {
      continue;
    }
    if (node === trigger) {
      index = images.length;
    }
    images.push(image);
  }

  return { images, index };
}

/**
 * An asset slot as a zoomable photograph, or null when no file fills it yet.
 *
 * Null is the useful answer: an undelivered slot renders the shared stand-in
 * overlaid with its asset id, and offering to enlarge *that* would be a
 * promise the page cannot keep.
 *
 * The delivered file's intrinsic size is used rather than the slot's declared
 * box, because the modal shows the whole photograph uncropped — the declared
 * ratio exists to hold a card's geometry steady, which is not a constraint
 * the enlarged view shares.
 */
export function toZoomImage(asset: AssetRef, caption?: string): ZoomImage | null {
  if (!asset.image) {
    return null;
  }
  return {
    id: asset.id,
    src: asset.image.src,
    width: asset.image.width,
    height: asset.image.height,
    caption: caption ?? (asset.altText || asset.subject),
  };
}
