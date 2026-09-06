import CircularProgress, { type CircularProgressProps } from "@mui/material/CircularProgress";

import { VisuallyHidden } from "./VisuallyHidden";

export interface SpinnerProps extends CircularProgressProps {
  /** Screen-reader label — a bare spinner has no accessible name otherwise. */
  label?: string;
}

/**
 * A loading indicator. Indeterminate spin conveys real status (not
 * decorative motion), so it's intentionally exempt from
 * `prefers-reduced-motion` — unlike the content-reveal/Ken-Burns motion in
 * DESIGN_DIRECTION.md §B.5.
 */
export function Spinner({ label = "Loading", ...rest }: SpinnerProps) {
  return (
    <>
      <CircularProgress role="status" {...rest} />
      <VisuallyHidden>{label}</VisuallyHidden>
    </>
  );
}
