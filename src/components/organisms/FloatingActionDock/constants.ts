/**
 * Distance from the viewport edge, per breakpoint. Grows with the screen for
 * the same reason the buttons themselves do — a 24px inset that reads as
 * generous on a laptop reads as cramped against a 1600px canvas.
 *
 * The dock is `md`-and-up only, so there is no `xs`/`sm` step: below `md`
 * the corners belong to `StickyActionBar`, which already carries WhatsApp.
 */
export const FLOATING_DOCK_INSET = { md: 24, lg: 32 } as const;
