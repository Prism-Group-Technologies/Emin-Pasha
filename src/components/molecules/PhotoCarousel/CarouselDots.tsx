"use client";

import Box from "@mui/material/Box";

export interface CarouselDotsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  transitionMs: number;
  /** Inverts the dots for use over a photograph or a dark band. */
  onDark?: boolean;
}

/**
 * The frame picker. One button per frame, each an independent tab stop, so a
 * keyboard user can reach any frame directly rather than cycling through the
 * whole loop with an arrow control.
 *
 * The hit area is 24px while the dot itself is 8px: the dot is a mark, not a
 * target, and shrinking the button to match it would put the control under the
 * pointer-target minimum on a phone.
 */
export function CarouselDots({
  count,
  activeIndex,
  onSelect,
  transitionMs,
  onDark = false,
}: CarouselDotsProps) {
  const idle = onDark ? "rgba(255,255,255,0.72)" : "text.secondary";
  const active = onDark ? "common.white" : "primary.main";

  return (
    <>
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex;
        return (
          <Box
            key={index}
            component="button"
            type="button"
            onClick={() => onSelect(index)}
            aria-current={isActive}
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
              color: idle,
              "&::after": {
                content: '""',
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: isActive ? active : "transparent",
                boxShadow: isActive ? "none" : "inset 0 0 0 1px currentColor",
                transition: `background-color ${transitionMs}ms, box-shadow ${transitionMs}ms`,
              },
              "&:hover::after": { bgcolor: isActive ? active : idle },
              "@media (prefers-reduced-motion: reduce)": { "&::after": { transition: "none" } },
            }}
          />
        );
      })}
    </>
  );
}
