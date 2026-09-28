"use client";

import { forwardRef } from "react";

import NextLink from "next/link";

import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { VisuallyHidden } from "@/components/atoms/VisuallyHidden";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "link";

export interface ButtonProps extends Omit<
  MuiButtonProps,
  "variant" | "color" | "component" | "href"
> {
  /** Visual style — maps onto MUI's variant+color combinations (CLAUDE.md §5.1 tokens only). */
  variant?: ButtonVariant;
  size?: "small" | "medium" | "large";
  /** Shows a spinner in place of startIcon and disables the button. */
  loading?: boolean;
  /** Renders as a Next.js Link (client-side navigation) instead of a <button>. */
  href?: string;
}

const VARIANT_MAP: Record<ButtonVariant, Pick<MuiButtonProps, "variant" | "color">> = {
  primary: { variant: "contained", color: "primary" },
  secondary: { variant: "contained", color: "secondary" },
  danger: { variant: "contained", color: "error" },
  ghost: { variant: "outlined", color: "primary" },
  link: { variant: "text", color: "primary" },
};

/**
 * `next/link` is for routes. An absolute or protocol URL (`https:`, `tel:`,
 * `mailto:`) is not one, and handing it to the client router is at best
 * pointless and at worst breaks the handoff — so those render a plain anchor,
 * with the new-tab safety rel for external http(s).
 *
 * Lifted out of the component body because it is a decision about the href,
 * not about this render, and because inlining all three branches pushed
 * `Button` past the complexity ceiling the lint config enforces.
 */
function resolveLinkProps(href: string | undefined) {
  if (href === undefined) {
    return { linkProps: {}, newTab: false };
  }
  if (!/^(https?:|tel:|mailto:)/.test(href)) {
    return { linkProps: { component: NextLink, href }, newTab: false };
  }
  // http(s) opens a new tab; `tel:`/`mailto:` hand off to the OS in place.
  const newTab = href.startsWith("http");
  return {
    linkProps: {
      component: "a" as const,
      href,
      ...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {}),
    },
    newTab,
  };
}

/**
 * The one Button every page uses — CLAUDE.md §5.1. `loading` is custom (MUI
 * v6 core has no built-in loading state; that shipped later, in MUI Lab/v7).
 * `href` renders through `next/link` for client-side navigation rather than
 * a plain `<a>` (MUI's own `href` prop would cause a full page reload).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", loading = false, disabled, startIcon, children, href, ...rest },
  ref,
) {
  const mapped = VARIANT_MAP[variant];
  const { linkProps, newTab } = resolveLinkProps(href);
  return (
    <MuiButton
      ref={ref}
      {...mapped}
      {...linkProps}
      disabled={disabled ?? loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      {...rest}
    >
      {children}
      {/*
        Matches `ExternalLink`: a link that silently opens a new tab is a WCAG
        3.2.5 surprise, and this became load-bearing the moment the sitewide
        BOOK NOW button started pointing at the booking engine rather than at
        an internal route. The note is announced, never drawn.
      */}
      {newTab && <VisuallyHidden>{NEW_TAB_NOTE}</VisuallyHidden>}
    </MuiButton>
  );
});
