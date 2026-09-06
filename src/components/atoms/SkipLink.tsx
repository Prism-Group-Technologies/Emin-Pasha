import Box from "@mui/material/Box";

import { shell } from "@/content/shell";
import { radiusTokens, spacingFn, zIndexTokens } from "@/theme/tokens";

const { label, targetId } = shell.skipLink;

/**
 * The first focusable element on every page — CLAUDE.md §10. Positioned off
 * the top of the viewport and slid into view on `:focus-visible` rather than
 * hidden with `display: none`, which would take it out of the tab order and
 * defeat the point.
 *
 * A plain `<a>`, not `next/link`: this is a same-document fragment jump, and
 * the client-side router would intercept it. It is also therefore a Server
 * Component, so the very first element of the page costs no client JS —
 * which is why the `sx` values below are read from `theme/tokens` directly
 * rather than through `(theme) => …` callbacks. A function cannot cross the
 * Server→Client boundary as a prop (DECISIONS.md D22), and MUI's `Box` is a
 * Client Component; a callback here is a real build failure, not a style.
 */
export function SkipLink() {
  return (
    <Box
      component="a"
      href={`#${targetId}`}
      sx={{
        position: "fixed",
        top: 0,
        left: spacingFn(4),
        zIndex: zIndexTokens.tooltip + 1,
        transform: "translateY(-150%)",
        px: 4,
        py: 3,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        typography: "overline",
        textDecoration: "none",
        borderBottomLeftRadius: radiusTokens.sm,
        borderBottomRightRadius: radiusTokens.sm,
        "&:focus-visible": { transform: "translateY(0)" },
      }}
    >
      {label}
    </Box>
  );
}
