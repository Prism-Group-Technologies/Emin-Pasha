import { SectionShell } from "@/components/templates/SectionShell";
import { sections } from "@/containers/story/copy";
import { GmQuotePanel } from "@/containers/story/molecules/GmQuotePanel";
import type { RevealDirection } from "@/theme/motion";

/** GM-route framing copy folded into this section (see `copy/pages.ts`). */
export interface GmWelcomeFraming {
  eyebrow: string;
  heading: string;
  body: string;
}

/**
 * The General Manager's welcome — one full-width, asymmetric composition
 * (`GmQuotePanel`): the framing copy and `story.generalManagerMessage`
 * verbatim in the main column, the portrait + by-line rail beside it.
 * Rendered as the section body rather than through `SectionShell`'s header
 * so the whole block shares one two-column grid and fills the row.
 *
 * `framing` is passed only by `/our-story/message-from-the-general-manager`,
 * which used to stack a near-identical "what it stands for" band above this
 * one; folding that copy in drops the duplicate band. Its presence also
 * switches the panel to its `letter` tone — the message set as an editorial
 * welcome letter (drop-cap, reading face, paper wash) rather than a
 * pull-quote, because on that route the framing establishes it as the house
 * speaking. On the Our Story hub `framing` is omitted: the section falls back
 * to its own `sections.gm` eyebrow / heading / lede and the `hub` tone
 * (message as a pull-quote).
 *
 * The message ships unattributed beyond the title (§12.4); the portrait is a
 * labelled placeholder until EMIN-Q21.
 */
export function GmWelcomeSection({
  motion = "up",
  framing,
}: {
  motion?: RevealDirection;
  framing?: GmWelcomeFraming;
}) {
  const copy = framing
    ? { eyebrow: framing.eyebrow, heading: framing.heading, lede: framing.body }
    : {
        eyebrow: sections.gm.eyebrow,
        heading: sections.gm.heading,
        lede: sections.gm.description,
      };

  return (
    <SectionShell motion={motion} bodyMotion={motion}>
      <GmQuotePanel
        tone={framing ? "letter" : "hub"}
        eyebrow={copy.eyebrow}
        heading={copy.heading}
        lede={copy.lede}
      />
    </SectionShell>
  );
}
