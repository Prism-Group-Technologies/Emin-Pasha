"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useLightbox } from "@/hooks/useLightbox";
import type { ZoomImage } from "@/types/imageZoom";
import { ZOOM_SELECTOR, collectZoomGroup } from "@/utils/imageZoom";

/**
 * The site-wide image modal, driven by one delegated listener on the document.
 *
 * **Why delegation rather than a handler per image.** Roughly sixty render
 * sites across the site show a photograph, and two thirds of them are Server
 * Components. Giving each one an `onClick` would mark each one `'use client'`
 * and drag its imports across the boundary with it — which is exactly how
 * `RoomGrid` once pulled Zod into the bundle at 63 KB (DECISIONS.md D71/D25).
 * One listener here, and `AssetImage` describing itself in data attributes,
 * keeps every one of those files a Server Component and costs a single
 * listener for the whole site.
 *
 * The clicked element is always a real `<button>`, so Enter and Space arrive
 * here as clicks and there is no key handling to reimplement. Modified and
 * non-primary clicks are left alone, and so is anything already handled —
 * a photograph inside a link opts out of the attributes entirely and offers
 * its own corner control instead, so a click never has two meanings.
 *
 * Index, wrapping, arrow keys and Home/End come from `useLightbox`, the hook
 * the gallery wall and the room mosaic already use.
 */
export function useImageZoom() {
  const [images, setImages] = useState<ZoomImage[]>([]);
  const lightbox = useLightbox(images.length);
  const { openAt } = lightbox;
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      if (event.defaultPrevented || event.button !== 0 || modified) {
        return;
      }
      const target = event.target;
      const trigger = target instanceof Element ? target.closest<HTMLElement>(ZOOM_SELECTOR) : null;
      if (!trigger) {
        return;
      }
      const group = collectZoomGroup(trigger);
      if (group.images.length === 0) {
        return;
      }
      triggerRef.current = trigger;
      setImages(group.images);
      openAt(group.index);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openAt]);

  /**
   * Returns focus to the photograph that was enlarged.
   *
   * MUI's `Dialog` restores focus to whatever was focused when it opened, and
   * a pointer click on a `<button>` does not focus it in every browser
   * (Safari and Firefox on macOS notably do not) — so without this, closing a
   * modal opened by tapping a photograph would drop focus to the body and
   * send the next Tab back to the top of the page. The frame is deferred by
   * one paint so it lands after MUI's own restore rather than fighting it.
   */
  const close = useCallback(() => {
    lightbox.close();
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger?.isConnected) {
      window.requestAnimationFrame(() => trigger.focus());
    }
  }, [lightbox]);

  return {
    images,
    index: lightbox.index ?? 0,
    open: lightbox.open,
    close,
    next: lightbox.next,
    previous: lightbox.previous,
    select: openAt,
  };
}

export type ImageZoomState = ReturnType<typeof useImageZoom>;
