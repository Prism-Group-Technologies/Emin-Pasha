import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { easingTokens } from "@/theme/tokens";

/**
 * The scroll cue, drawn as the top of the Equatorial Line
 * (DESIGN_DIRECTION.md §B.6) rather than a generic bouncing chevron — the
 * hairline that runs down the rest of the page begins here.
 *
 * `aria-hidden`: it is a hint about a gesture, not content, and announcing
 * "scroll down" to a screen-reader user is noise. The travelling highlight
 * is a pure `transform`, so it cannot affect layout, and it stops entirely
 * under `prefers-reduced-motion`.
 */
export function ScrollCue() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        bottom: 0,
        left: { xs: 20, md: 80 },
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        color: "common.white",
      }}
    >
      <Text
        variant="body2"
        sx={{
          fontFamily: "var(--font-cartographic)",
          fontSize: "0.6875rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
          opacity: 0.75,
        }}
      >
        Scroll
      </Text>
      <Box
        sx={{ position: "relative", width: "1px", height: 96, bgcolor: "rgba(251,250,247,0.3)" }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "primary.main",
            transformOrigin: "top",
            animation: `scroll-cue 2.4s ${easingTokens.emin} infinite`,
            "@keyframes scroll-cue": {
              "0%": { transform: "scaleY(0)" },
              "55%": { transform: "scaleY(1)" },
              "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
            },
            "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 0.6 },
          }}
        />
      </Box>
    </Box>
  );
}
