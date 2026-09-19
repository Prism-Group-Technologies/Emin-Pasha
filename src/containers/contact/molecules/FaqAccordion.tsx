"use client";

import { Accordion, type AccordionItem } from "@/components/molecules/Accordion";
import { useSingleExpanded } from "@/containers/contact/hooks/useSingleExpanded";

/**
 * The FAQ as a soft, one-open-at-a-time accordion. 'use client' justification:
 * a controlled disclosure — the state lives in `useSingleExpanded`, and the
 * items arrive as plain props so no content layer crosses the boundary.
 */
export function FaqAccordion({ items }: { items: AccordionItem[] }) {
  const { expanded, toggle } = useSingleExpanded(items[0]?.id ?? false);
  return <Accordion variant="soft" items={items} expanded={expanded} onChange={toggle} />;
}
