import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";

export interface RoomFactListProps {
  title: string;
  items: readonly string[];
  /** Rendered under the list — used for the unresolved extra-bed price note. */
  footnote?: ReactNode;
}

/**
 * A headed list of verified room facts, each on a gold check.
 *
 * "What is included" and "Children and extra beds" were two copies of the same
 * `<h3>` plus bulleted list, differing only in their content — and between
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
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2 }}>
        {items.map((item) => (
          <Box key={item} component="li" sx={{ display: "flex", gap: 2 }}>
            <Icon
              name="check-circle"
              aria-hidden
              fontSize="small"
              sx={{ color: "primary.main", mt: "3px", flexShrink: 0 }}
            />
            <Text variant="body1" color="text.secondary">
              {item}
            </Text>
          </Box>
        ))}
      </Box>
      {footnote}
    </Stack>
  );
}
