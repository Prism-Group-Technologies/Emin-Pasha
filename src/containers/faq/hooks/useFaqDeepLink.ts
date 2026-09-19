"use client";

import { useEffect } from "react";

function scrollToPanel(id: string) {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById(id)
    ?.scrollIntoView?.({ block: "start", behavior: reduce ? "auto" : "smooth" });
}

/**
 * Opens the answer named in the URL hash — on first load (a shared link) and
 * on every `hashchange` (the quick-answer cards and "Most asked" links are
 * plain `#id` anchors, which fire it natively).
 *
 * `onTarget` must be stable (`useCallback`), or the listener re-binds every
 * render. The scroll waits two frames: one for React to commit the reset
 * filters that make the panel visible, one for the panel to lay out.
 */
export function useFaqDeepLink(ids: string[], onTarget: (id: string) => void) {
  useEffect(() => {
    const known = new Set(ids);
    let frame = 0;
    const read = () => {
      const id = window.location.hash.slice(1);
      if (!known.has(id)) {
        return;
      }
      onTarget(id);
      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(() => scrollToPanel(id));
      });
    };
    read();
    window.addEventListener("hashchange", read);
    return () => {
      window.removeEventListener("hashchange", read);
      window.cancelAnimationFrame(frame);
    };
  }, [ids, onTarget]);
}
