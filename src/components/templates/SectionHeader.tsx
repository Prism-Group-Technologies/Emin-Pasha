import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  eyebrowSx,
  headerCopy,
  headerRoot,
  ledeSx,
} from "@/components/templates/sectionShellStyles";
import { type RevealDirection, revealSx } from "@/theme/motion";

export interface SectionHeaderProps {
  eyebrow?: string;
  heading?: string;
  headingLevel?: "h1" | "h2" | "h3";
  description?: string;
  /** Section-level CTA, rendered beside the heading on desktop. */
  action?: ReactNode;
  centred?: boolean;
  /** Inverts the header's own colours for use inside a `contrast` band. */
  onDark?: boolean;
  /** Scroll-reveal direction for the header block. `none` opts out. */
  motion?: RevealDirection;
}

/**
 * The eyebrow / heading / lede / action block that tops a section.
 *
 * Split out of `SectionShell` so each piece stays inside the repo's complexity
 * ceiling, and exported in its own right because a page that builds a custom
 * section body still wants the standard header above it.
 *
 * The whole block reveals as one unit at stagger index 0, so the eyebrow,
 * heading and lede arrive together and the section's content — which staggers
 * from index 0 upward beneath it — follows rather than races it. Revealing the
 * three lines separately was the obvious alternative and reads badly: a
 * heading that assembles itself line by line draws attention to the animation
 * instead of to the words.
 *
 * Because this is where every section on the site gets its header, giving it a
 * default reveal is what puts scroll motion on the ~19 pages that never wrapped
 * anything in `Reveal` themselves — at no per-page cost and no JavaScript.
 */
export function SectionHeader({
  eyebrow,
  heading,
  headingLevel = "h2",
  description,
  action,
  centred = false,
  onDark = false,
  motion = "up",
}: SectionHeaderProps) {
  return (
    <Box sx={{ ...headerRoot(centred), ...revealSx({ direction: motion }) }}>
      <Box sx={headerCopy(centred)}>
        {eyebrow && (
          <Typography variant="overline" component="p" sx={eyebrowSx(onDark)}>
            {eyebrow}
          </Typography>
        )}
        {heading && (
          <Typography
            variant={headingLevel === "h1" ? "h1" : "h2"}
            component={headingLevel}
            sx={{ textWrap: "balance" }}
          >
            {heading}
          </Typography>
        )}
        {description && (
          <Typography variant="subtitle1" sx={ledeSx(onDark)}>
            {description}
          </Typography>
        )}
      </Box>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Box>
  );
}
