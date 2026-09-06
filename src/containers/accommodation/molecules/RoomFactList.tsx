import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";

export interface RoomFactListProps {
  title: string;
  items: readonly string[];
  /** Rendered under the list — used for the unresolved extra-bed price note. */
  footnote?: ReactNode;
}

/**
 * A headed list of verified room facts.
 *
 * "What is included" and "Children and extra beds" were two copies of the same
 * `<h3>` plus bulleted `<ul>`, differing only in their content — and between
 * them they were most of what pushed `RoomDetailContainer` past the repo's
 * lines-per-function ceiling. One component, used twice.
 *
 * The heading is an `<h3>` rendered as an `<h2>` in the document outline,
 * exactly as both call sites already did: the page's `<h1>` is the room name
 * and these are its top-level subsections, so the visual size and the semantic
 * level are deliberately different things here.
 */
export function RoomFactList({ title, items, footnote }: RoomFactListProps) {
  return (
    <Stack spacing={3}>
      <Text variant="h3" component="h2">
        {title}
      </Text>
      <Box component="ul" sx={{ m: 0, pl: 5, display: "grid", gap: 2 }}>
        {items.map((item) => (
          <Text key={item} component="li" variant="body1" color="text.secondary">
            {item}
          </Text>
        ))}
      </Box>
      {footnote}
    </Stack>
  );
}
