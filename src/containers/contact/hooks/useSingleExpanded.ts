"use client";

import { useState } from "react";

/**
 * One-open-at-a-time disclosure state for the controlled `Accordion`: opening
 * a panel closes the last, and clicking the open panel closes it. Starts on
 * `initial` so the first answer is visible without a click.
 */
export function useSingleExpanded(initial: string | false = false) {
  const [expanded, setExpanded] = useState<string | false>(initial);
  const toggle = (id: string) => setExpanded((current) => (current === id ? false : id));
  return { expanded, toggle };
}
