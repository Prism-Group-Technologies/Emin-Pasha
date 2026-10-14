"use client";

import { useCallback, useState } from "react";

import dynamic from "next/dynamic";

import { useImageZoom } from "@/hooks/useImageZoom";
import { useWhenIdle } from "@/hooks/useWhenIdle";

/**
 * MUI's `Dialog` is not in the root bundle — the three route-level lightboxes
 * that use it each pay for it in their own chunk. Mounting it in the layout
 * would put it on the critical path of every page, including the ones whose
 * visitor never touches a photograph, so it is deferred and the chunk is
 * warmed on idle instead (see below).
 */
const ImageZoomDialog = dynamic(
  () => import("@/components/organisms/ImageZoom/ImageZoomDialog").then((m) => m.ImageZoomDialog),
  { ssr: false },
);

/**
 * Mounted once in the root layout: the click-to-enlarge behaviour for every
 * photograph on the site.
 *
 * Not a context provider despite sitting at the root — there is nothing for
 * the tree to consume. `AssetImage` describes each photograph in data
 * attributes on the element it renders, and the single delegated listener in
 * `useImageZoom` reads them back out of the document. That is what lets some
 * sixty render sites stay Server Components, and what keeps the photography
 * registry and Zod out of the always-loaded bundle (DECISIONS.md D25).
 *
 * Mounted here rather than per page for the same reason the header and the
 * booking bars are: one listener and one dialog across client-side
 * navigations, instead of a remount on every route change.
 *
 * The dialog's chunk is requested when the browser goes idle, so the first tap
 * on a photograph opens immediately rather than waiting on a network round
 * trip — but `zoom.open` mounts it regardless, so a visitor who gets there
 * first is never left with a dead control.
 */
export function ImageZoomLayer() {
  const zoom = useImageZoom();
  const [warm, setWarm] = useState(false);
  const warmUp = useCallback(() => setWarm(true), []);

  useWhenIdle(warmUp, warm);

  if (!warm && !zoom.open) {
    return null;
  }
  return <ImageZoomDialog zoom={zoom} />;
}
