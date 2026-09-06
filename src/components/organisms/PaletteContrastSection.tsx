import Stack from "@mui/material/Stack";

import { Text } from "@/components/atoms/Text";
import { ContrastRow } from "@/components/molecules/ContrastRow";
import { colorTokens } from "@/theme/tokens";
import { contrastRatio, passesAA } from "@/utils/contrast";

const { gold, ink, sand, garden, support } = colorTokens;

type RawPair = { label: string; fg: string; bg: string; expectFail?: boolean };

const lightPairs: RawPair[] = [
  { label: "Body text", fg: ink[900], bg: sand[50] },
  { label: "Secondary text", fg: sand[800], bg: sand[50] },
  { label: "Forbidden pair (never shipped)", fg: gold[500], bg: "#FFFFFF", expectFail: true },
  { label: "Primary button", fg: ink[900], bg: gold[500] },
  { label: "Inline gold link", fg: gold[800], bg: sand[50] },
  {
    label: "gold.700 as text (icons/borders only, not text)",
    fg: gold[700],
    bg: sand[50],
    expectFail: true,
  },
  { label: "Nature accent text", fg: garden[700], bg: sand[50] },
  { label: "Secondary button", fg: sand[50], bg: garden[500] },
  { label: "Success text", fg: support.success.light, bg: sand[50] },
  { label: "Warning text", fg: support.warning.lightText, bg: sand[50] },
  { label: "Error text", fg: support.error.light, bg: sand[50] },
  { label: "Info text", fg: support.info.light, bg: sand[50] },
];

const darkPairs: RawPair[] = [
  { label: "Body text", fg: sand[50], bg: ink[900] },
  { label: "Secondary text", fg: sand[400], bg: ink[900] },
  { label: "Accent gold text", fg: gold[300], bg: ink[900] },
  { label: "Primary button", fg: ink[900], bg: gold[500] },
  { label: "Nature accent text", fg: garden[200], bg: ink[900] },
  { label: "Secondary button", fg: sand[50], bg: garden[500] },
  { label: "Success text", fg: support.success.dark, bg: ink[900] },
  { label: "Warning text", fg: support.warning.dark, bg: ink[900] },
  { label: "Error text", fg: support.error.dark, bg: ink[900] },
  { label: "Info text", fg: support.info.dark, bg: ink[900] },
];

function withRatios(pairs: RawPair[]) {
  return pairs.map((pair) => {
    const ratio = contrastRatio(pair.fg, pair.bg);
    return { ...pair, ratio, passes: passesAA(ratio) };
  });
}

/** Every shipped text/background pair, computed live — DESIGN_DIRECTION.md §B.2. */
export function PaletteContrastSection() {
  return (
    <Stack spacing={4}>
      <Stack spacing={0.5}>
        <Text variant="h2">Palette &amp; contrast — light scheme</Text>
        {withRatios(lightPairs).map((pair) => (
          <ContrastRow key={pair.label} {...pair} />
        ))}
      </Stack>
      <Stack spacing={0.5}>
        <Text variant="h2">Palette &amp; contrast — dark scheme</Text>
        {withRatios(darkPairs).map((pair) => (
          <ContrastRow key={pair.label} {...pair} />
        ))}
      </Stack>
    </Stack>
  );
}
