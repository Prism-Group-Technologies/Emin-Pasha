"use client";

import Box from "@mui/material/Box";

import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import { CarouselDots } from "@/components/molecules/PhotoCarousel/CarouselDots";

export interface CarouselControlsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  playing: boolean;
  onToggle: () => void;
  /** Hides the play/pause button when the OS has asked for reduced motion. */
  reduced: boolean;
  transitionMs: number;
  onDark?: boolean;
  /** Names the carousel in each control's accessible name. */
  label: string;
  /** Drops the prev/next arrows, leaving dots and the play/pause toggle. */
  compact?: boolean;
  /**
   * Horizontal padding for the bar. Set where the frames bleed to the edge of
   * a padded container — a card with `p: 0` — so the controls still line up
   * with the text beneath them instead of hugging the card edge.
   */
  inset?: { xs: number; md: number } | number;
}

/**
 * The control bar: previous, the dots, next, and the play/pause toggle.
 *
 * **The toggle is not optional.** WCAG 2.2.2 requires a mechanism to stop any
 * motion that starts automatically and runs more than five seconds, and
 * pause-on-hover does not satisfy it — it is unreachable by touch and
 * transient by definition. It is hidden only when `reduced` is set, because
 * nothing is moving then and a pause button for a stationary carousel is just
 * a confusing control.
 *
 * Each control's accessible name carries the carousel's label, so a screen
 * reader on a page with two carousels does not read "Next image" twice with
 * nothing to tell them apart.
 *
 * `compact` drops the arrows for the small card carousels, where four buttons
 * under a 3:2 thumbnail weigh more than the picture. Swipe and the dots still
 * reach every frame, so nothing becomes unreachable.
 */
export function CarouselControls({
  count,
  activeIndex,
  onSelect,
  onNext,
  onPrevious,
  playing,
  onToggle,
  reduced,
  transitionMs,
  onDark = false,
  label,
  compact = false,
  inset = 0,
}: CarouselControlsProps) {
  const tint = onDark ? { color: "common.white" } : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 1,
        pt: 3,
        px: inset,
      }}
    >
      {!compact && (
        <IconButton aria-label={`Previous image, ${label}`} onClick={onPrevious} sx={tint}>
          <Icon name="chevron-left" fontSize="small" />
        </IconButton>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <CarouselDots
          count={count}
          activeIndex={activeIndex}
          onSelect={onSelect}
          transitionMs={transitionMs}
          onDark={onDark}
        />
      </Box>

      {!compact && (
        <IconButton aria-label={`Next image, ${label}`} onClick={onNext} sx={tint}>
          <Icon name="chevron-right" fontSize="small" />
        </IconButton>
      )}

      {!reduced && (
        <IconButton
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          aria-pressed={!playing}
          onClick={onToggle}
          sx={tint}
        >
          <Icon name={playing ? "pause" : "play"} fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
