import type { ReactNode } from "react";

/**
 * Screen-reader-only content — standard clip-based technique (not `display:
 * none`, which removes it from the accessibility tree too). Plain inline
 * style, not `sx`: this never needs a theme value.
 */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return (
    <span
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
