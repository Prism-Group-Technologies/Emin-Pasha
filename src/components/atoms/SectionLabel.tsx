import type { ReactNode } from "react";

import type { SxProps, Theme } from "@mui/material/styles";

import { Text } from "@/components/atoms/Text";

export interface SectionLabelProps {
  children: ReactNode;
  /** Semantic tag. Defaults to `h2` — the footer's own heading level. */
  component?: "h2" | "h3" | "h4" | "p" | "span";
  /** Set when a sibling list or region names itself with `aria-labelledby`. */
  id?: string;
  sx?: SxProps<Theme>;
}

/**
 * The small uppercase label that titles a block — `overline` at
 * text-secondary, which was retyped identically at the head of five footer
 * blocks before this atom existed.
 *
 * `component` is a closed union rather than the `Text` polymorphic generic on
 * purpose (DECISIONS.md D39): the wrapper only ever needs a heading or a
 * paragraph, and narrowing it here keeps callers from having to satisfy
 * `OverridableComponent`'s prop inference.
 */
export function SectionLabel({ children, component = "h2", id, sx }: SectionLabelProps) {
  return (
    <Text
      variant="overline"
      component={component}
      id={id}
      sx={[{ display: "block", color: "text.secondary" }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Text>
  );
}
