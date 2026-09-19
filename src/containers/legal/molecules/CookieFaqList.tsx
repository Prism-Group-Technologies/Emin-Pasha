"use client";

import { Accordion, type AccordionItem } from "@/components/molecules/Accordion";
import { useExpandedItem } from "@/containers/legal/hooks/useExpandedItem";

/** The cookie quick-answers accordion; open/close state lives in `useExpandedItem`. */
export function CookieFaqList({ items }: { items: AccordionItem[] }) {
  const { expanded, toggle } = useExpandedItem(items[0]?.id ?? false);
  return <Accordion items={items} expanded={expanded} onChange={toggle} variant="soft" />;
}
