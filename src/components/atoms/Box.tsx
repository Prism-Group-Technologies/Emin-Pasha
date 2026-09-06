import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";

export type BoxProps = MuiBoxProps;

/**
 * The only place containers reach for a generic layout element (CLAUDE.md
 * §5.1) — and still a single choke point, so it can become a real wrapper the
 * moment one is needed.
 *
 * Re-exported rather than wrapped in `forwardRef`. MUI's `Box` is an
 * `OverridableComponent`: its props change with `component`, so
 * `<Box component="form" noValidate>` and `<Box component="button" type=…>`
 * both type-check against it. A hand-written `forwardRef<HTMLDivElement,
 * BoxProps>` collapses that generic to the `div` case, which turned every
 * polymorphic use into a type error — caught building the booking widgets,
 * where the form element and the date buttons both need it.
 */
export const Box = MuiBox;
