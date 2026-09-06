import { forwardRef } from "react";

import MuiGrid, { type Grid2Props } from "@mui/material/Grid2";

export type GridItemProps = Grid2Props;

/** A `Grid2` item — pass `size={{ xs: 12, md: 6 }}` etc. See `GridContainer`. */
export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(function GridItem(props, ref) {
  return <MuiGrid ref={ref} {...props} />;
});
