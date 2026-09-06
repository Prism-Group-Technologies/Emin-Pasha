import type { ReactNode } from "react";

import Typography, { type TypographyProps } from "@mui/material/Typography";

import { VisuallyHidden } from "@/components/atoms/VisuallyHidden";

/**
 * Typed against `TypographyProps<"a">`, not the default `TypographyProps`
 * (whose root is `span`) — otherwise the inherited `ref` is
 * `Ref<HTMLSpanElement>` and conflicts with the anchor MUI actually renders.
 */
export interface ExternalLinkProps extends Omit<
  TypographyProps<"a">,
  "component" | "children" | "href"
> {
  href: string;
  children: ReactNode;
}

/**
 * Exported because icon-only links (the footer's social buttons) cannot nest
 * a `VisuallyHidden` span inside their label and have to build the same note
 * into `aria-label` by hand — the string must not exist twice.
 */
export const NEW_TAB_NOTE = " (opens in a new tab)";

/**
 * A link that leaves the app: `tel:`, `mailto:`, `https://` — anything the
 * client-side router must not handle. `Link`/`Button href` both render
 * through `next/link`, which is wrong for a non-route target, so this is the
 * design-system primitive for the other case.
 *
 * `http(s)` targets get `target="_blank"` with `rel="noopener noreferrer"`
 * and a screen-reader-only note, because a link that silently opens a new
 * tab is a WCAG 3.2.5 surprise. `tel:`/`mailto:` open in place — they hand
 * off to the OS, not to a tab.
 */
export function ExternalLink({ href, children, sx, ...rest }: ExternalLinkProps) {
  const newTab = href.startsWith("http");

  return (
    <Typography
      component="a"
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      {...rest}
      sx={[
        {
          color: "text.secondary",
          textDecoration: "none",
          "&:hover, &:focus-visible": { color: "text.primary" },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
      {newTab && <VisuallyHidden>{NEW_TAB_NOTE}</VisuallyHidden>}
    </Typography>
  );
}
