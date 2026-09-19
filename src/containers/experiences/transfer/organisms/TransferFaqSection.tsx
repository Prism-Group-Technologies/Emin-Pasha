"use client";

import { useState } from "react";

import { Accordion } from "@/components/molecules/Accordion";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
// Leaf modules only — this is a client component (D25).
import { transferFaq } from "@/containers/experiences/transfer/copy/faq";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import type { RevealDirection } from "@/theme/motion";

const { faq } = transferSections;

/**
 * The questions reservations answers most about transfers, as a soft
 * accordion with the first item open — the "how will I find my chauffeur"
 * answer is the one most visitors came for.
 *
 * 'use client' justification: the accordion is a controlled disclosure. The
 * items are static invented copy — no content layer crosses the boundary.
 */
export function TransferFaqSection({
  motion = "up",
  variant = "default",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  const [expanded, setExpanded] = useState<string | false>(transferFaq[0]?.id ?? false);

  return (
    <SectionShell
      motion={motion}
      eyebrow={faq.eyebrow}
      heading={faq.heading}
      description={faq.description}
      variant={variant}
    >
      <Accordion
        variant="soft"
        items={transferFaq}
        expanded={expanded}
        onChange={(id) => setExpanded(expanded === id ? false : id)}
      />
    </SectionShell>
  );
}
