"use client";

import { useCallback, useState } from "react";

/** One-open-at-a-time accordion state: toggling the open item closes it. */
export function useExpandedItem(initial: string | false = false) {
  const [expanded, setExpanded] = useState<string | false>(initial);
  const toggle = useCallback(
    (id: string) => setExpanded((current) => (current === id ? false : id)),
    [],
  );
  return { expanded, toggle };
}
