import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { ColorSwatch } from "@/components/atoms/ColorSwatch";
import { Text } from "@/components/atoms/Text";

export type ContrastPair = {
  label: string;
  fg: string;
  bg: string;
  ratio: number;
  passes: boolean;
  expectFail?: boolean;
};

/** One text/background pair, its computed ratio, and a pass/fail badge. */
export function ContrastRow({ label, fg, bg, ratio, passes, expectFail }: ContrastPair) {
  const badgeOk = expectFail ? !passes : passes;
  return (
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ py: 0.5 }}>
      <ColorSwatch hex={bg} />
      <ColorSwatch hex={fg} />
      <Text variant="body2" sx={{ flexGrow: 1 }}>
        {label} — {fg} on {bg}
      </Text>
      <Text variant="body2">{ratio.toFixed(2)}:1</Text>
      <Chip
        size="small"
        label={
          expectFail
            ? passes
              ? "unexpected pass"
              : "fails (expected)"
            : passes
              ? "AA pass"
              : "AA fail"
        }
        color={badgeOk ? "success" : "error"}
      />
    </Stack>
  );
}
