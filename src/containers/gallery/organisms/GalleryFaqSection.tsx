"use client";

import { useState } from "react";

import { Accordion } from "@/components/molecules/Accordion";
import { SectionShell } from "@/components/templates/SectionShell";
import { galleryFaq } from "@/containers/gallery/copy/faq";
import { sections } from "@/containers/gallery/copy/sections";
import type { RevealDirection } from "@/theme/motion";

/**
 * Photography, shoots and viewings, as a soft accordion.
 *
 * 'use client' justification: the accordion is a controlled disclosure. The
 * items are import-free `copy/` — no content layer crosses the boundary.
 */
export function GalleryFaqSection({ motion = "up" }: { motion?: RevealDirection }) {
  const [expanded, setExpanded] = useState<string | false>(galleryFaq[0]?.id ?? false);

  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.faq.eyebrow}
      heading={sections.faq.heading}
      description={sections.faq.description}
    >
      <Accordion
        variant="soft"
        items={galleryFaq}
        expanded={expanded}
        onChange={(id) => setExpanded(expanded === id ? false : id)}
      />
    </SectionShell>
  );
}
