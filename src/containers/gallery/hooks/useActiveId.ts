"use client";

import { useState } from "react";

/**
 * Single-selection state over a fixed list of ids — the collection switcher
 * and the film chapter picker both need exactly this. An id outside the list
 * is ignored, so a stale selection can never render an empty panel.
 */
export function useActiveId<T extends string>(ids: readonly T[], initial?: T) {
  const [active, setActive] = useState<T | undefined>(initial ?? ids[0]);

  const select = (id: T) => {
    if (ids.includes(id)) {
      setActive(id);
    }
  };

  const activeIndex = active === undefined ? -1 : ids.indexOf(active);

  return { active, activeIndex, select };
}
