import Typography, { type TypographyProps } from "@mui/material/Typography";

export type TextProps = TypographyProps;

/**
 * The only place containers reach for text styling (CLAUDE.md §5.1).
 * `variant` controls visual style; `component` overrides the rendered tag
 * when the semantics must differ from the variant.
 *
 * Re-exported rather than wrapped in `forwardRef`, for the same reason as
 * `Box` (DECISIONS.md D39): MUI's `Typography` is an `OverridableComponent`
 * whose props change with `component`, and a hand-written
 * `forwardRef<HTMLElement, TypographyProps>` collapses that generic to the
 * default `span` case — which made `<Text component="a" href=…>` a type
 * error every time a container needed an anchor.
 */
export const Text = Typography;
