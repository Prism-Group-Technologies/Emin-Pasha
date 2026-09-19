"use client";

import { useEffect, useState } from "react";

import { progressWithin } from "@/containers/legal/progress";

/**
 * Reading progress (0–1) through the element with `targetId`. The scroll
 * listener only schedules a frame; the rect is read inside
 * `requestAnimationFrame`, the same main-thread discipline as
 * `useStickyCtaReveal` (CLAUDE.md §8).
 */
export function useReadingProgress(targetId: string): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const node = document.getElementById(targetId);
      if (node) {
        setProgress(progressWithin(node.getBoundingClientRect(), window.innerHeight));
      }
    };
    const schedule = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(read);
      }
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [targetId]);

  return progress;
}
