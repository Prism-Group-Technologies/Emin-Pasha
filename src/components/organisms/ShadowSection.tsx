import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Text } from "@/components/atoms/Text";
import { shadowTokens } from "@/theme/tokens";

const samples: { name: keyof typeof shadowTokens; note: string }[] = [
  { name: "none", note: "default state for cards and panels" },
  { name: "hover", note: "applied via sx on :hover/:focus only" },
  { name: "modal", note: "Dialog/Popover/Menu elevation 24" },
];

/** The three real shadow states — everything else in theme.shadows is `none`. */
export function ShadowSection() {
  return (
    <Stack spacing={1}>
      <Text variant="h2">Shadows</Text>
      <Stack direction="row" spacing={4}>
        {samples.map(({ name, note }) => (
          <Stack key={name} spacing={0.5} alignItems="center">
            <Box
              sx={{
                width: 96,
                height: 64,
                borderRadius: 1,
                backgroundColor: "background.paper",
                boxShadow: shadowTokens[name],
              }}
            />
            <Text variant="body2">shadow-{name}</Text>
            <Text variant="caption" sx={{ maxWidth: 120, textAlign: "center" }}>
              {note}
            </Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
