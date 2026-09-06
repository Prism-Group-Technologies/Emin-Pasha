"use client";

import { useEffect, useState } from "react";

/**
 * Highlights the table-of-contents entry for whatever section is currently in
 * view, using one `IntersectionObserver` over all of them rather than a
 * scroll listener — no work happens on the main thread between intersections.
 *
 * `rootMargin` biases the trigger line to the upper third of the viewport, so
 * the highlight moves when a heading reaches reading position rather than
 * when it first scrapes the bottom edge.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -60% 0px" },
    );
    for (const id of ids) {
      const node = document.getElementById(id);
      if (node) {
        observer.observe(node);
      }
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
