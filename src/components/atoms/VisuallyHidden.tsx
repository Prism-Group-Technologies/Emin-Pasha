import type { ReactNode } from "react";

/**
 * Screen-reader-only content — standard clip-based technique (not `display:
 * none`, which removes it from the accessibility tree too). Plain inline
 * style, not `sx`: this never needs a theme value.
 */
export interface VisuallyHiddenProps {
  children: ReactNode;
  /**
   * Turns the span into a live region, for text that exists only to be
   * announced — a filtered result count, a form's success line.
   *
   * Opt-in: a live region that is mounted on every use of this atom would
   * have assistive tech announce every piece of hidden supplementary text on
   * the site, including the new-tab notes on every external link.
   */
  live?: "polite" | "assertive";
}

export function VisuallyHidden({ children, live }: VisuallyHiddenProps) {
  return (
    <span
      aria-live={live}
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      {children}
    </span>
  );
}
