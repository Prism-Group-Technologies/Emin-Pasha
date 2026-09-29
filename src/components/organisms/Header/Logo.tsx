"use client";

import NextLink from "next/link";

import Box from "@mui/material/Box";

import { BrandMark } from "@/components/atoms/BrandMark";
import { useLogoLockup } from "@/hooks/useLogoLockup";

export interface LogoProps {
  /** The light lock-up sits over the hero video; the dark one over the page. */
  variant: "light" | "dark";
  /**
   * The home link's accessible name. Handed down from `headerData` rather
   * than read here: this is a client component, and the content layer is
   * Zod-validated at module scope (DECISIONS.md D25).
   */
  name: string;
  condensed?: boolean;
}

/**
 * The brand lock-up as the link home.
 *
 * It used to be two elements — a cropped portrait mark beside a wordmark set
 * as live text — because the old artwork's baked wordmark was unreadable at
 * header size. The delivered lock-up is drawn horizontally and stays legible
 * at 132–200px wide, so it is one element again and `LogoWordmark` is gone.
 *
 * That makes `name` load-bearing rather than decorative. With the wordmark as
 * live text, the mark carried `alt=""` and the text supplied the link's
 * accessible name; with the wordmark as pixels, `alt=""` would have left this
 * link unnamed. `name` is the approved `identity.name` and is the only thing
 * naming it now.
 *
 * 'use client' justification: unchanged from before — passes `NextLink` as
 * the `component` prop of an MUI element, the Server/Client boundary
 * constraint recorded as DECISIONS.md D22.
 */
export function Logo({ variant, name, condensed = false }: LogoProps) {
  const lockup = useLogoLockup({ condensed });

  return (
    <Box
      component={NextLink}
      href="/"
      sx={{ display: "flex", alignItems: "center", textDecoration: "none", minWidth: 0 }}
    >
      <BrandMark
        width={lockup.width}
        sizes={lockup.sizes}
        variant={variant}
        alt={name}
        transition={lockup.transition}
      />
    </Box>
  );
}
