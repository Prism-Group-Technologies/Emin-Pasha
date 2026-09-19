"use client";

import { useState } from "react";

import { Accordion } from "@/components/molecules/Accordion";
import { SectionShell } from "@/components/templates/SectionShell";
// Imported from the leaf modules, not the `copy` barrel: this is a client
// component, and the barrel re-exports `copy/media.ts`, which pulls the
// Zod-validated asset schema. Keep that off the client bundle (DECISIONS.md D25).
import { eventFaq } from "@/containers/events/copy/faq";
import { sections } from "@/containers/events/copy/sections";
import type { RevealDirection } from "@/theme/motion";

/**
 * The questions the events desk fields most, as a soft accordion.
 *
 * 'use client' justification: the accordion is a controlled disclosure. The
 * items are static invented `copy/` — no content layer crosses the boundary.
 */
export function EventsFaqSection({ motion = "up" }: { motion?: RevealDirection }) {
  const [expanded, setExpanded] = useState<string | false>(eventFaq[0]?.id ?? false);

  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.faq.eyebrow}
      heading={sections.faq.heading}
      description={sections.faq.description}
    >
      <Accordion
        variant="soft"
        items={eventFaq.map((item) => ({
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
