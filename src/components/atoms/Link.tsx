"use client";

import { forwardRef } from "react";

import NextLink from "next/link";

import MuiLink, { type LinkProps as MuiLinkProps } from "@mui/material/Link";

export interface LinkProps extends Omit<MuiLinkProps, "href" | "component"> {
  href: string;
}

/**
 * Every inline/text link — CLAUDE.md §5.1. Renders through `next/link` for
 * client-side navigation. Default `color`/`underline` come from
 * `theme/components.ts`'s `MuiLink` override, which deliberately avoids gold
 * as inline text colour (DESIGN_DIRECTION.md §B.2 — fails AA on light).
 *
 * A bare `#fragment` is the exception, and renders as a native anchor — see
 * the note on `Button`'s `resolveLinkProps` for the measurement behind that.
 * In short: the App Router preventDefaults the click and then moves the hash
 * without committing a segment, so nothing scrolls at all. The browser gets it
 * right unaided.
 *
 * 'use client' justification: passes the `NextLink` component reference as
 * MUI Link's `component` prop — verified live (a real build failure) that a
 * Server Component can't pass a component/function reference as a prop into
 * an MUI client component; this file has to own that boundary itself.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ href, ...rest }, ref) {
  if (href.startsWith("#")) {
    return <MuiLink ref={ref} href={href} {...rest} />;
  }
  return <MuiLink ref={ref} component={NextLink} href={href} {...rest} />;
});
