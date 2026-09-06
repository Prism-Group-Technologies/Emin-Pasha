import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Text } from "@/components/atoms/Text";
import { easingTokens, motionTokens, shadowTokens } from "@/theme/tokens";

/**
 * Reveals once on mount using the named easing curve (settles well before a
 * screenshot is taken), plus a statically-applied "hover state" sample since
 * a screenshot can't capture a live :hover.
 */
export function MotionSection() {
  return (
    <Stack spacing={2}>
      <Text variant="h2">Motion</Text>
      <Text variant="body2">
        Easing: <code>{easingTokens.emin}</code> · content reveal {motionTokens.contentReveal}ms ·
        button hover {motionTokens.buttonHover}ms · stagger {motionTokens.staggerStep}ms
      </Text>
      <Stack direction="row" spacing={4} alignItems="center">
        <Stack spacing={0.5} alignItems="center">
          <Box
            sx={{
              width: 96,
              height: 48,
              backgroundColor: "primary.main",
              borderRadius: 1,
              opacity: 0,
              transform: "translateY(16px)",
              animation: `emin-reveal ${motionTokens.contentReveal}ms ${easingTokens.emin} forwards`,
              "@keyframes emin-reveal": {
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          />
          <Text variant="caption">content reveal (settled)</Text>
        </Stack>
        <Stack spacing={0.5} alignItems="center">
          <Box
            sx={{
              width: 96,
              height: 48,
              backgroundColor: "background.paper",
              borderRadius: 1,
              boxShadow: shadowTokens.hover,
            }}
          />
          <Text variant="caption">hover state (simulated)</Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
