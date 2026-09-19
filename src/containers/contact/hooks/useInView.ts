"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

/**
 * True once the element has come within `rootMargin` of the viewport — and it
 * stays true. One-shot on purpose: the live map should mount once and keep
 * the visitor's pan and zoom, not tear the iframe down each time it scrolls
 * out of view.
 *
 * `setInView` only ever runs inside the observer callback — never
 * synchronously in the effect body — so mounting cannot cascade a render.
 */
export function useInView<T extends Element>(rootMargin = "200px"): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return [ref, inView];
}
