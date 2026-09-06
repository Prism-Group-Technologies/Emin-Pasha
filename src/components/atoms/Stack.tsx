import { forwardRef } from "react";

import MuiStack, { type StackProps as MuiStackProps } from "@mui/material/Stack";

export type StackProps = MuiStackProps;

/** Thin wrapper — flex layout primitive (CLAUDE.md §5.1). `spacing` uses theme.spacing tokens. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(props, ref) {
  return <MuiStack ref={ref} {...props} />;
});
