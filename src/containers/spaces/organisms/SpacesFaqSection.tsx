"use client";

import { useState } from "react";

import { Accordion } from "@/components/molecules/Accordion";
import { SectionShell } from "@/components/templates/SectionShell";
import { spacesFaq } from "@/containers/spaces/copy/faq";
import { sections } from "@/containers/spaces/copy/sections";
import type { RevealDirection } from "@/theme/motion";

/**
 * The questions the lounge team fields most, as a soft accordion.
 *
 * 'use client' justification: the accordion is a controlled disclosure. The
 * items are import-free `copy/` — no content layer crosses the boundary.
 */
export function SpacesFaqSection({ motion = "up" }: { motion?: RevealDirection }) {
  const [expanded, setExpanded] = useState<string | false>(spacesFaq[0]?.id ?? false);

  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.faq.eyebrow}
      heading={sections.faq.heading}
      description={sections.faq.description}
    >
      <Accordion
        variant="soft"
        items={spacesFaq}
        expanded={expanded}
        onChange={(id) => setExpanded(expanded === id ? false : id)}
      />
    </SectionShell>
  );
}
