import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { SectionHeader } from "@/components/templates/SectionHeader";
import { type SectionVariant, sectionRoot } from "@/components/templates/sectionShellStyles";
import { type RevealDirection, revealSx } from "@/theme/motion";

export interface SectionShellProps {
  children: ReactNode;
  /** Small cartographic-face marker — the signature element's section label. */
  eyebrow?: string;
  heading?: string;
  /** Heading level, so a page can keep its heading order correct. */
  headingLevel?: "h1" | "h2" | "h3";
  /** Lede paragraph under the heading — the section's one-line argument. */
  description?: string;
  /** Section-level CTA, rendered beside the heading on desktop. */
  action?: ReactNode;
  /** `center` narrows and centres the header block; headers default to left. */
  align?: "start" | "center";
  /** `raised` = surface-raised; `bleed` = no gutters; `contrast` = the dark band. */
  variant?: SectionVariant;
  /** Hairline in `primary.main` above the section — the Equatorial Line as a band divider. */
  topRule?: boolean;
  /**
   * Direction the header reveals from as the section scrolls into view.
   * `left`/`right` apply from `md` up and collapse to `up` below it.
   */
  motion?: RevealDirection;
  /**
   * Reveals `children` as one block, one stagger step behind the header.
   *
   * Opt-in, and deliberately so: a section whose children already wrap
   * themselves in `Reveal` would otherwise animate twice, once as a group and
   * again individually, which double-fades the content. Use it for the simple
   * pages that render prose or a single figure and have no per-item reveal of
   * their own.
   */
  bodyMotion?: RevealDirection;
  id?: string;
}

/**
 * The vertical rhythm every page section shares — DESIGN_DIRECTION.md §B.4:
 * 120px between major sections on desktop, 64px on mobile (`space-9`/`space-7`
 * on the 4px scale), max content width 1280px.
 *
 * The eyebrow is rendered in the cartographic face as "§ LABEL", the
 * motif-only use of the signature element sanctioned by §B.6 — never a
 * fabricated coordinate, which stays reserved for the Contact page once
 * TODO(EMIN-Q20) is answered.
 *
 * `description`, `action`, `align` and `topRule` are additive: every existing
 * caller that omits them renders exactly as before. They exist so a marketing
 * section can state its argument and carry its own CTA without each organism
 * rebuilding a header block by hand.
 */
/**
 * Applied as one spread rather than as per-parameter defaults, so the five of
 * them cost one branch instead of five against the `complexity` ceiling.
 */
const SHELL_DEFAULTS = {
  align: "start",
  variant: "default",
  topRule: false,
  motion: "up",
  bodyMotion: "none",
} as const;

/**
 * Wraps `children` in a reveal only when one was asked for.
 *
 * Split out so `SectionShell` itself does not carry the branch — and because
 * an unconditional wrapper `<div>` would sit between the section and its
 * content on every page on the site, which is exactly the surplus DOM node
 * `revealSx` exists to avoid.
 */
function SectionBody({
  children,
  bodyMotion,
}: {
  children: ReactNode;
  bodyMotion: RevealDirection;
}) {
  if (bodyMotion === "none") {
    return <>{children}</>;
  }
  return <Box sx={revealSx({ direction: bodyMotion, index: 1 })}>{children}</Box>;
}

export function SectionShell(props: SectionShellProps) {
  const {
    children,
    eyebrow,
    heading,
    headingLevel,
    description,
    action,
    align,
    variant,
    topRule,
    motion,
    bodyMotion,
    id,
  } = { ...SHELL_DEFAULTS, ...props };
  const hasHeader = Boolean(eyebrow ?? heading ?? description ?? action);

  const body = (
    <>
      {hasHeader && (
        <SectionHeader
          eyebrow={eyebrow}
          heading={heading}
          headingLevel={headingLevel}
          description={description}
          action={action}
          centred={align === "center"}
          onDark={variant === "contrast"}
          motion={motion}
        />
      )}
      <SectionBody bodyMotion={bodyMotion}>{children}</SectionBody>
    </>
  );

  return (
    <Box component="section" id={id} sx={sectionRoot(variant, topRule)}>
      {variant === "bleed" ? body : <Container maxWidth="xl">{body}</Container>}
    </Box>
  );
}
