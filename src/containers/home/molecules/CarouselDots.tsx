"use client";

import { Box } from "@/components/atoms/Box";

export interface CarouselDotsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  /** Milliseconds for the dot's own state change. Matched to the crossfade. */
  transitionMs: number;
}

/**
 * The frame picker for `ImageCarousel` — the carousel's only visible control.
 *
 * Each dot is a 24px button wrapping an 8px mark, so the visual weight stays
 * light while the touch target stays thumb-sized. The active dot changes fill
 * *and* loses its ring, rather than only changing colour: gold sits at 2.33:1
 * on the light surface and cannot be the sole carrier of "this one".
 *
 * `aria-current` rather than `aria-selected`, because these are buttons, not
 * tabs — there is no tablist here and no roving tabindex, so every dot stays
 * reachable by Tab.
 */
export function CarouselDots({ count, activeIndex, onSelect, transitionMs }: CarouselDotsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 2,
        pt: 3,
      }}
    >
      {Array.from({ length: count }, (_, index) => {
        const active = index === activeIndex;
        return (
          <Box
            key={index}
            component="button"
            type="button"
            onClick={() => onSelect(index)}
            aria-current={active}
            aria-label={`Show image ${index + 1} of ${count}`}
            sx={{
              appearance: "none",
              p: 0,
              width: 24,
              height: 24,
              display: "grid",
              placeItems: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "text.secondary",
              "&::after": {
                content: '""',
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: active ? "primary.main" : "transparent",
                boxShadow: active ? "none" : "inset 0 0 0 1px currentColor",
                transition: `background-color ${transitionMs}ms, box-shadow ${transitionMs}ms`,
              },
              "&:hover::after": { bgcolor: active ? "primary.main" : "text.secondary" },
              "@media (prefers-reduced-motion: reduce)": {
                "&::after": { transition: "none" },
              },
            }}
          />
        );
      })}
    </Box>
  );
}
