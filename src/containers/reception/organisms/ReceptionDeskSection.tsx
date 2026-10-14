import { SectionShell } from "@/components/templates/SectionShell";
import { receptionSections } from "@/containers/reception/copy";
import { ReceptionServices } from "@/containers/reception/organisms/ReceptionServices";
import type { RevealDirection } from "@/theme/motion";

const copy = receptionSections.services;

/**
 * The full services index, as a Server Component shell around the one client
 * island on the surface.
 *
 * The split is the point: the heading, lede and section chrome are rendered on
 * the server and ship as HTML, and only the sixteen cards and their filter
 * cross the hydration boundary. Putting `"use client"` on this file instead
 * would drag `SectionShell` — and through it the whole section-header
 * stack — into the browser bundle to animate a chip row.
 *
 * The default anchor is `reception-desk`, not `reception-services`: this
 * section's usual home is the FAQ page, where `@/content/faq` already publishes
 * an approved answer whose id is `reception-services` and whose accordion
 * panel renders with that id. Two elements sharing one id is invalid HTML, and
 * in practice the deep link from the homepage would have landed on the
 * accordion rather than on this section.
 */
export function ReceptionDeskSection({
  motion = "up",
  id = "reception-desk",
}: {
  motion?: RevealDirection;
  id?: string;
}) {
  return (
    <SectionShell
      motion={motion}
      id={id}
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      description={copy.lede}
    >
      <ReceptionServices />
    </SectionShell>
  );
}
