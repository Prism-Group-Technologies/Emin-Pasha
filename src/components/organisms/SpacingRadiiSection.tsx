import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Text } from "@/components/atoms/Text";
import { radiusTokens, spacingScale } from "@/theme/tokens";

/** The spacing scale as measured bars, and the three radius steps. */
export function SpacingRadiiSection() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Text variant="h2">Spacing scale</Text>
        {spacingScale.map((px, index) => (
          <Stack key={px} direction="row" spacing={2} alignItems="center">
            <Text variant="body2" sx={{ width: 72, flexShrink: 0, opacity: 0.6 }}>
              space-{index + 1}
            </Text>
            <Box sx={{ width: px, height: 12, backgroundColor: "primary.main" }} />
            <Text variant="body2">{px}px</Text>
          </Stack>
        ))}
      </Stack>
      <Stack spacing={1}>
        <Text variant="h2">Radii</Text>
        <Stack direction="row" spacing={3}>
          {Object.entries(radiusTokens).map(([name, px]) => (
            <Stack key={name} spacing={0.5} alignItems="center">
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: `${px}px`,
                  backgroundColor: "secondary.main",
                }}
              />
              <Text variant="body2">
                {name} ({px}px)
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
