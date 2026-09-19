import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

/**
 * A match percentage as a figure over a thin gold bar. The bar is decorative
 * (`aria-hidden`); the figure carries the meaning as text. `transform` rather
 * than `width` animates on the compositor, and reduced motion drops it.
 */
export function MatchMeter({ percent, emphasis = false }: { percent: number; emphasis?: boolean }) {
  return (
    <Box sx={{ display: "grid", gap: 1, minWidth: 0 }}>
      <Text
        component="p"
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: emphasis ? "2.25rem" : "1.25rem",
          lineHeight: 1,
          color: percent > 0 ? "primary.main" : "text.secondary",
        }}
      >
        {percent}%
        <Text component="span" variant="body2" color="text.secondary">
          {" "}
          match
        </Text>
      </Text>
      <Box
        aria-hidden
        sx={{ height: 4, borderRadius: 999, bgcolor: "action.hover", overflow: "hidden" }}
      >
        <Box
          sx={{
            height: "100%",
            bgcolor: "primary.main",
            transformOrigin: "left",
            transform: `scaleX(${percent / 100})`,
            transition: "transform 420ms cubic-bezier(0.16,1,0.3,1)",
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
        />
      </Box>
    </Box>
  );
}
