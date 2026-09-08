"use client";

import { useState } from "react";

import { Accordion } from "@/components/molecules/Accordion";
import type { FaqItem } from "@/schemas/content/faqItem";

/**
 * 'use client' justification: the accordion is a controlled disclosure.
 *
 * Takes its items as a prop so the caller decides which subset of the
 * approved §15 FAQ belongs on which page — this component never picks.
 */
export function FaqBlock({ items }: { items: FaqItem[] }) {
  const [expanded, setExpanded] = useState<string | false>(items[0]?.id ?? false);

  return (
    <Accordion
      variant="soft"
      items={items.map((item) => ({ id: item.id, question: item.question, answer: item.answer }))}
      expanded={expanded}
      onChange={(id) => setExpanded(expanded === id ? false : id)}
    />
  );
}
