import MuiDivider, { type DividerProps as MuiDividerProps } from "@mui/material/Divider";

export type DividerProps = MuiDividerProps;

/**
 * A plain content divider — `border-hairline` token via `theme.palette.divider`.
 * Not the signature element: DESIGN_DIRECTION.md §D disciplines the site to
 * exactly one structural hairline (see `Rule`); this is the ordinary,
 * unlimited-use kind (table rules, list separators).
 */
export function Divider(props: DividerProps) {
  return <MuiDivider {...props} />;
}
