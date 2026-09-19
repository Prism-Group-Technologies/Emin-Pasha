import type { ReactNode } from "react";

import { Box, type BoxProps } from "@/components/atoms/Box";

export interface HashLinkProps {
  /** A catalogue id — the link jumps to, and opens, that answer. */
  targetId: string;
  children: ReactNode;
  sx?: BoxProps["sx"];
}

/**
 * A same-page `#id` jump as a **native** anchor, not `next/link`. The App
 * Router moves the hash with `history.pushState`, which never fires
 * `hashchange` — and `useFaqDeepLink` listens for exactly that event to reset
 * the filters and open the answer. A Server Component, so the quick-answer
 * and "Most asked" lists ship no JavaScript of their own.
 */
export function HashLink({ targetId, children, sx }: HashLinkProps) {
  return (
    <Box
      component="a"
      href={`#${targetId}`}
      sx={[
        {
          color: "inherit",
          textDecoration: "none",
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: 3,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
