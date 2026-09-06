import { forwardRef } from "react";

import MuiGrid, { type Grid2Props } from "@mui/material/Grid2";

export type GridContainerProps = Omit<Grid2Props, "container">;

/**
 * Wraps MUI's `Grid2` (verified against installed @mui/material@6.5.0 —
 * the default `Grid` export still uses the legacy `item`/`xs` API; `Grid2`
 * is the modern `size`-prop API that becomes the default `Grid` in MUI v7,
 * so building against it now is forward-compatible). See `GridItem`.
 */
export const GridContainer = forwardRef<HTMLDivElement, GridContainerProps>(
  function GridContainer(props, ref) {
    return <MuiGrid ref={ref} container {...props} />;
  },
);
