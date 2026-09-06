"use client";

import NextLink from "next/link";

import Box from "@mui/material/Box";

import { BrandMark } from "@/components/atoms/BrandMark";
import { useLogoLockup } from "@/hooks/useLogoLockup";

export interface LogoProps {
  /** The light lock-up sits over the hero video; the dark one over the page. */
  variant: "light" | "dark";
  condensed?: boolean;
}

/**
 * The brand lock-up: the supplied portrait mark (`BrandMark`) beside the
 * wordmark set as live text (`LogoWordmark`), with every derived value coming
 * from `useLogoLockup`.
 *
 * Supersedes DECISIONS.md D30, which made the wordmark the whole mark while
 * artwork was outstanding. The artwork arrived as a single near-square PNG
 * with the wordmark baked into its lower quarter — unreadable at a 30–52px
 * header height — so the mark is cropped out of it and the wordmark stays
 * live text. That also keeps the accessible name real, keeps it responsive,
 * and keeps it answering the colour scheme (DECISIONS.md D76).
 *
 * 'use client' justification: unchanged from before — passes `NextLink` as
 * the `component` prop of an MUI element, the Server/Client boundary
 * constraint recorded as DECISIONS.md D22.
 */
export function Logo({ variant, condensed = false }: LogoProps) {
  const lockup = useLogoLockup({ variant, condensed });

  return (
    <Box
      component={NextLink}
      href="/"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 1.5, md: 2 },
        textDecoration: "none",
        color: "inherit",
        minWidth: 0,
      }}
    >
      <BrandMark
        height={lockup.markHeight}
        sizes={lockup.markSizes}
        transition={lockup.transition}
      />
    </Box>
  );
}
