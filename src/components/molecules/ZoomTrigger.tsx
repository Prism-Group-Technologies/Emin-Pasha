import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import type { AssetRef } from "@/schemas/content/assetRef";
import { colorTokens } from "@/theme/tokens";
import { toZoomImage, zoomAttributes } from "@/utils/imageZoom";

/**
 * Spread on the element that wraps a card's link and its trigger together.
 *
 * It does two jobs: it positions the trigger (`position: relative`), and it
 * decides when the trigger is seen. Where a pointer can hover, the control is
 * revealed by hovering the card or by focus landing anywhere inside it —
 * `:focus-within`, not `:hover` alone, because an invisible button that is
 * still tabbable is a trap for a keyboard user. Where there is no hover at
 * all, which is every phone, nothing hides it: the only alternative on touch
 * is an affordance nobody can discover.
 *
 * `height: 100%` keeps the wrapper transparent to layout. The cards it wraps
 * are grid children that stretch and whose own surface is `height: 100%`, so
 * without it the row of cards would stop sitting level.
 */
export const zoomTriggerHostSx = {
  position: "relative",
  height: "100%",
  "@media (hover: hover)": {
    "& .ZoomTrigger": { opacity: 0 },
    "&:hover .ZoomTrigger, &:focus-within .ZoomTrigger": { opacity: 1 },
  },
} as const;

const triggerSx = {
  position: "absolute",
  top: 12,
  right: 12,
  zIndex: 1,
  color: colorTokens.ink.contrastCopy,
  bgcolor: "rgba(8,5,3,0.55)",
  // Blurred like the modal's own scrim, so the control reads as sitting above
  // the photograph rather than being printed on it.
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  transition: "opacity 160ms ease, background-color 160ms ease",
  "&:hover, &:focus-visible": { bgcolor: "rgba(8,5,3,0.85)" },
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  "@media (forced-colors: active)": {
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  },
} as const;

export interface ZoomTriggerProps {
  asset: AssetRef;
  /** Overrides the modal's caption. Defaults to the asset's own alt text. */
  caption?: string;
}

/**
 * The corner control that enlarges a photograph which is *also* a link.
 *
 * A handful of cards — the homepage rate cards and feature tiles, the gallery
 * collection cards — are a single `<a>` wrapping the whole surface, image
 * included. That is deliberate: one tab stop, one hit target, and the entire
 * card sends the visitor to the page it is advertising. A photograph inside
 * one of those cannot also open a modal, because a click would then mean two
 * things, and a `<button>` inside an `<a>` is invalid HTML besides.
 *
 * So the card keeps its link and the photograph gets a second, smaller target
 * of its own, rendered as a *sibling* of the link rather than inside it. It
 * carries the same data attributes `AssetImage` would have, so the one
 * delegated listener in `useImageZoom` opens it with no extra wiring — and the
 * card stays a Server Component, since nothing here is a handler.
 *
 * Renders nothing when the slot has no photograph delivered yet: there would
 * be nothing behind the stand-in to enlarge.
 */
export function ZoomTrigger({ asset, caption }: ZoomTriggerProps) {
  const zoom = toZoomImage(asset, caption);
  if (!zoom) {
    return null;
  }

  return (
    <IconButton
      className="ZoomTrigger"
      aria-label={`Enlarge: ${zoom.caption}`}
      size="small"
      sx={triggerSx}
      {...zoomAttributes(zoom)}
    >
      <Icon name="open-in-full" fontSize="small" />
    </IconButton>
  );
}
