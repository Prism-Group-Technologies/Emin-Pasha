import { colorTokens, radiusTokens } from "@/theme/tokens";

/**
 * Shared style fragments for photographs on the gallery. Static objects, not
 * `sx` callbacks — a callback in a Server Component breaks prerender (see the
 * offers redesign note), and several of these render on the server.
 */

/** Makes an `AssetImage` fill its tile instead of holding its own ratio. */
export const fillImageSx = {
  "& > div:first-of-type": { position: "absolute", inset: 0, aspectRatio: "auto", height: "100%" },
} as const;

/**
 * A bottom scrim for type set on a photograph. Fixed ink in both colour
 * schemes — it sits on a photo, not the page ground — so its light type always
 * passes contrast (the same reasoning as `spaces/MomentTile`).
 */
export const photoScrimSx = {
  position: "absolute",
  insetInline: 0,
  bottom: 0,
  display: "grid",
  gap: 0.5,
  backgroundImage: `linear-gradient(180deg, transparent 0%, ${colorTokens.ink[900]}E0 72%)`,
  color: colorTokens.ink.contrastCopy,
} as const;

export const photoOverlineSx = { color: colorTokens.gold[300], lineHeight: 1.4 } as const;

export const photoMutedSx = { color: colorTokens.ink.contrastMuted } as const;

export const roundedMediaSx = {
  position: "relative",
  overflow: "hidden",
  borderRadius: `${radiusTokens.lg}px`,
} as const;

/** A translucent dark chip that reads over any photograph. */
export const photoBadgeSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
  px: 2,
  py: 0.75,
  borderRadius: `${radiusTokens.pill}px`,
  bgcolor: "rgba(11,11,10,0.62)",
  color: colorTokens.ink.contrastCopy,
  backdropFilter: "blur(6px)",
} as const;
