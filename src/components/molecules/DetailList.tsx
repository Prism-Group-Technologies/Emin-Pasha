import { Fragment } from "react";

import { Box } from "@/components/atoms/Box";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Text } from "@/components/atoms/Text";

export interface DetailListRow {
  id: string;
  label: string;
  value: string;
}

export interface DetailListProps {
  rows: DetailListRow[];
  title?: string;
  titleId?: string;
}

/**
 * A `<dl>` of label/value pairs — the footer's Hours block, and the shape any
 * "spec table" on the site wants (room facts, venue capacities).
 *
 * The value column is `auto`-sized and right-aligned so the figures form a
 * flush edge, which is what makes a short list of times read as a schedule
 * rather than as five unrelated sentences. `minmax(0, auto)` lets a long
 * value ("Daily, 7:00am – 9:00pm") wrap instead of forcing the grid wider
 * than its column.
 */
export function DetailList({ rows, title, titleId }: DetailListProps) {
  return (
    <Box>
      {title && (
        <SectionLabel id={titleId} sx={{ mb: 2 }}>
          {title}
        </SectionLabel>
      )}
      <Box
        component="dl"
        aria-labelledby={title && titleId ? titleId : undefined}
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr minmax(0, auto)",
          columnGap: 4,
          rowGap: 2,
          m: 0,
        }}
      >
        {rows.map((row) => (
          <Fragment key={row.id}>
            <Text component="dt" variant="body2" color="text.secondary">
              {row.label}
            </Text>
            <Text component="dd" variant="body2" sx={{ m: 0, textAlign: "right" }}>
              {row.value}
            </Text>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
}
