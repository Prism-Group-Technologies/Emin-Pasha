import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

export interface LightboxMetaProps {
  /** 1-based, as a visitor counts. */
  position: number;
  count: number;
  caption?: string;
  /** Trailing control — the room lightbox's "Reserve this room", say. */
  action?: ReactNode;
}

/**
 * The line under an enlarged photograph: where the visitor is in the set, what
 * they are looking at, and optionally the one thing to do about it.
 *
 * The counter is `aria-live="polite"` because arrow keys and swipe change the
 * photograph without moving focus — without it, a screen-reader user
 * navigating a set of twelve gets silence. It is also the only announcement,
 * which is why the caption is not live: re-reading a full sentence on every
 * arrow press is noise, and the photograph's own `alt` already carries it.
 *
 * The counter is suppressed for a set of one, where "1 of 1" is a label
 * telling the reader nothing they cannot see.
 */
export function LightboxMeta({ position, count, caption, action }: LightboxMetaProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { sm: "center" },
        justifyContent: "space-between",
        gap: { xs: 3, sm: 4 },
      }}
    >
      <Box sx={{ display: "grid", gap: 1, minWidth: 0 }}>
        {count > 1 && (
          <Text variant="overline" component="p" color="text.secondary" aria-live="polite">
            {`${position} of ${count}`}
          </Text>
        )}
        {caption && (
          <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
            {caption}
          </Text>
        )}
      </Box>
      {action && (
        <Box sx={{ flexShrink: 0, alignSelf: { xs: "stretch", sm: "center" } }}>{action}</Box>
      )}
    </Box>
  );
}
