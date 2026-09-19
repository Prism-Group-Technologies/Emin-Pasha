"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import type {
  GalleryFilterOption,
  GalleryFilterValue,
} from "@/containers/gallery/hooks/useGalleryFilter";

export interface GalleryFilterChipsProps {
  options: GalleryFilterOption[];
  value: GalleryFilterValue;
  onChange: (value: GalleryFilterValue) => void;
  label: string;
}

/**
 * The category filter as pill toggles with counts — the gallery twin of
 * `OfferFilterChips`. On a phone the row scrolls sideways instead of wrapping
 * into a tall block above the wall.
 */
export function GalleryFilterChips({ options, value, onChange, label }: GalleryFilterChipsProps) {
  return (
    <Box
      role="group"
      aria-label={label}
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: { xs: "nowrap", md: "wrap" },
        overflowX: { xs: "auto", md: "visible" },
        mx: { xs: -2, sm: 0 },
        px: { xs: 2, sm: 0 },
        pb: { xs: 1, md: 0 },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Button
            key={option.value}
            variant={active ? "primary" : "ghost"}
            size="small"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            sx={{ flexShrink: 0, borderRadius: 999, whiteSpace: "nowrap" }}
          >
            {`${option.label} · ${option.count}`}
          </Button>
        );
      })}
    </Box>
  );
}
