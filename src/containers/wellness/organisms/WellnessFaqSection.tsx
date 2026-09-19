"use client";

import { useState } from "react";

import { Accordion } from "@/components/molecules/Accordion";
import { SectionShell } from "@/components/templates/SectionShell";
// Imported from the leaf modules, not the `copy` barrel: this is a client
// component, and the barrel re-exports `copy/media.ts`, which pulls the
// Zod-validated asset schema. Keep that off the client bundle (DECISIONS.md D25).
import type { WellnessFaqItem } from "@/containers/wellness/copy/faq";
import { wellnessFaq } from "@/containers/wellness/copy/faq";
import { sections } from "@/containers/wellness/copy/sections";
import type { RevealDirection } from "@/theme/motion";

interface FaqCopy {
  eyebrow: string;
  heading: string;
  description: string;
}

/**
 * The questions the wellness desk fields most, as a soft accordion.
 *
 * `items` and `copy` default to the shared hub FAQ; a facility page passes
 * its own set (the pool page passes `poolFaq` + `poolSections.faq`) so the
 * answers are specific to that facility. Both defaults are leaf-module
 * imports, so nothing new crosses the client boundary.
 *
 * 'use client' justification: the accordion is a controlled disclosure. The
 * items are static invented `copy/` — no content layer crosses the boundary.
 */
export function WellnessFaqSection({
  motion = "up",
  items = wellnessFaq,
  copy = sections.faq,
}: {
  motion?: RevealDirection;
  items?: WellnessFaqItem[];
  copy?: FaqCopy;
}) {
  const [expanded, setExpanded] = useState<string | false>(items[0]?.id ?? false);

  return (
    <SectionShell
      motion={motion}
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      description={copy.description}
    >
      <Accordion
        variant="soft"
        items={items.map((item) => ({
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
