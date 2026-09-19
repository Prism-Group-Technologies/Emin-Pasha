import { Box } from "@/components/atoms/Box";

/**
 * A small status dot: green and softly pulsing for a channel answered live,
 * a quiet gold for one answered in turn. Decorative — the availability text
 * beside it carries the meaning — and the pulse stops under
 * `prefers-reduced-motion`.
 */
export function AvailabilityDot({ live }: { live: boolean }) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        position: "relative",
        width: 8,
        height: 8,
        flexShrink: 0,
        borderRadius: "50%",
        bgcolor: live ? "success.main" : "primary.main",
        ...(live && {
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            bgcolor: "success.main",
            animation: "contact-pulse 2s cubic-bezier(0.16,1,0.3,1) infinite",
          },
          "@keyframes contact-pulse": {
            "0%": { transform: "scale(1)", opacity: 0.6 },
            "100%": { transform: "scale(2.6)", opacity: 0 },
          },
          "@media (prefers-reduced-motion: reduce)": { "&::after": { animation: "none" } },
        }),
      }}
    />
  );
}
