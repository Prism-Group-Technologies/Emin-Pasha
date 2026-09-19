"use client";

import { useState } from "react";

import { Accordion } from "@/components/molecules/Accordion";
import { SectionShell } from "@/components/templates/SectionShell";
import { diningFaq, sections } from "@/containers/dining/copy";
import type { RevealDirection } from "@/theme/motion";

/**
 * The six questions the reservations desk fields most, as a soft accordion.
 *
 * 'use client' justification: the accordion is a controlled disclosure. The
 * items are static invented `copy/` — no content layer crosses the boundary.
 */
export function DiningFaqSection({ motion = "up" }: { motion?: RevealDirection }) {
  const [expanded, setExpanded] = useState<string | false>(diningFaq[0]?.id ?? false);

  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.faq.eyebrow}
      heading={sections.faq.heading}
      description={sections.faq.description}
    >
      <Accordion
        variant="soft"
        items={diningFaq.map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        }))}
        expanded={expanded}
        onChange={(id) => setExpanded(expanded === id ? false : id)}
      />
    </SectionShell>
  );
}
