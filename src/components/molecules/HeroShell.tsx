import type { ReactNode } from "react";

import Box from "@mui/material/Box";

import { Image } from "@/components/atoms/Image";
import { placeholderImageSrc } from "@/config/assets";

/**
 * A three-stop scrim — light at the top so the photograph still reads,
 * deepening through the lower half so white overlay type clears AA against it
 * wherever the content column sits.
 */
const SCRIM =
  "linear-gradient(180deg, rgba(11,11,10,0.16) 0%, rgba(11,11,10,0.52) 52%, rgba(11,11,10,0.82) 100%)";

/**
 * The full-bleed photograph, in the shape a static image import produces.
 * Structural rather than `StaticImageData` so the design system stays
 * independent of the content layer that resolves it.
 */
export interface HeroImage {
  src: string;
  blurDataURL?: string;
}

export interface HeroShellProps {
  /** Full-bleed background; falls back to the stand-in when absent. */
  image?: HeroImage;
  /** Accessible name for the hero `<section>`. */
  label: string;
  /** Bottom-aligned overlay content, capped at the 1280 content width. */
  children: ReactNode;
  minHeight?: { xs: number; md: number };
}

/**
 * The shared above-the-fold scaffold for the site's page heroes: one
 * `priority` `next/image` as the LCP element, the gradient scrim, and a
 * bottom-aligned overlay column at the 1280 content width. The section holds
 * its height from first paint, so CLS stays 0 while the photograph loads.
 *
 * Callers pass only the overlay content — eyebrow, headline, CTAs, a stat
 * rail — so `AccommodationHero` and `RoomDetailHero` no longer each re-implement
 * the image / scrim / overlay plumbing or drift apart on the scrim itself.
 */
export function HeroShell({
  image,
  label,
  children,
  minHeight = { xs: 520, md: 640 },
}: HeroShellProps) {
  return (
    <Box
      component="section"
      aria-label={label}
      sx={{ position: "relative", minHeight, overflow: "hidden", display: "flex" }}
    >
      <Image
        src={image?.src ?? placeholderImageSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        blurDataURL={image?.blurDataURL}
        style={{ objectFit: "cover" }}
      />
      <Box sx={{ position: "absolute", inset: 0, backgroundImage: SCRIM }} />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 1280,
          mx: "auto",
          px: { xs: 5, md: 8 },
          py: { xs: 8, md: 9 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: { xs: 5, md: 6 },
          color: "common.white",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
