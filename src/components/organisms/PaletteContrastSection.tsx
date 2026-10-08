import Stack from "@mui/material/Stack";

import { Text } from "@/components/atoms/Text";
import { ContrastRow } from "@/components/molecules/ContrastRow";
import { colorTokens } from "@/theme/tokens";
import { contrastRatio, passesAA } from "@/utils/contrast";

const { copper, gold, maroon, ink, sand, support } = colorTokens;

type RawPair = { label: string; fg: string; bg: string; expectFail?: boolean };

/**
 * Every shipped pair, computed live rather than restated from `tokens.ts`.
 *
 * The `expectFail` rows are the guardrails: they pin the pairings the system
 * deliberately does *not* ship, so that if someone later promotes one of them
 * to a real role the page says so out loud. The brand copper under white text
 * is the important one — it is the constraint the whole primary-button
 * treatment exists to work around.
 */
const lightPairs: RawPair[] = [
  { label: "Body text", fg: ink[900], bg: sand[50] },
  { label: "Secondary text", fg: sand[800], bg: sand[50] },
  { label: "Body text on the greige brand band (sand.300)", fg: ink[900], bg: sand[300] },
  { label: "Secondary text on the greige brand band", fg: sand[800], bg: sand[300] },
  {
    label: "Brand copper under white — why the button is darker (never shipped)",
    fg: ink.contrastCopy,
    bg: copper[500],
    expectFail: true,
  },
  { label: "Primary button (copper.700)", fg: ink.contrastCopy, bg: copper[700] },
  { label: "Primary button hover (copper.800)", fg: ink.contrastCopy, bg: copper[800] },
  { label: "Inline copper link text (copper.700)", fg: copper[700], bg: sand[50] },
  {
    label: "Brand copper as inline body text (icons/rules/large type only)",
    fg: copper[500],
    bg: sand[50],
    expectFail: true,
  },
  { label: "Secondary button (maroon.800)", fg: ink.contrastCopy, bg: maroon[800] },
  { label: "Secondary button hover (maroon.900)", fg: ink.contrastCopy, bg: maroon[900] },
  { label: "Maroon as inline text", fg: maroon[800], bg: sand[50] },
  {
    label: "Brand gold as text on light (ornament only, never text)",
    fg: gold[300],
    bg: sand[50],
    expectFail: true,
  },
  { label: "Gold pill — ink label on brand gold", fg: ink[900], bg: gold[300] },
  { label: "IconBadge copper (copper.700 on copper.50)", fg: copper[700], bg: copper[50] },
  { label: "IconBadge gold (gold.700 on gold.50)", fg: gold[700], bg: gold[50] },
  { label: "IconBadge maroon (maroon.800 on maroon.50)", fg: maroon[800], bg: maroon[50] },
  { label: "Success text", fg: support.success.light, bg: sand[50] },
  { label: "Warning text", fg: support.warning.lightText, bg: sand[50] },
  { label: "Error text / icon / border", fg: support.error.light, bg: sand[50] },
  { label: "Info text", fg: support.info.light, bg: sand[50] },
];

const darkPairs: RawPair[] = [
  { label: "Body text", fg: sand[50], bg: ink[900] },
  { label: "Secondary text", fg: ink.contrastMuted, bg: ink[900] },
  { label: "Body text on dark paper (ink.800)", fg: sand[50], bg: ink[800] },
  { label: "Copper accent text (copper.300)", fg: copper[300], bg: ink[900] },
  { label: "Gold accent text (brand gold)", fg: gold[300], bg: ink[900] },
  { label: "Maroon accent text (maroon.300)", fg: maroon[300], bg: ink[900] },
  {
    label: "Light-scheme button fill on the dark ground — no findable edge",
    fg: copper[700],
    bg: ink[900],
    expectFail: true,
  },
  { label: "Primary button — ink on the exact brand copper", fg: ink[900], bg: copper[500] },
  { label: "Primary button hover (copper.400)", fg: ink[900], bg: copper[400] },
  { label: "Secondary button (maroon.500)", fg: ink[900], bg: maroon[500] },
  { label: "Secondary button hover (maroon.400)", fg: ink[900], bg: maroon[400] },
  { label: "Success text", fg: support.success.dark, bg: ink[900] },
  { label: "Warning text", fg: support.warning.dark, bg: ink[900] },
  { label: "Error text", fg: support.error.dark, bg: ink[900] },
  { label: "Info text", fg: support.info.dark, bg: ink[900] },
];

/**
 * The fixed dark band (`templates/sectionShellStyles.ts`) does not follow the
 * scheme, so its pairs are asserted against both stops of its gradient.
 */
const bandPairs: RawPair[] = [
  { label: "Band copy on ink.900", fg: ink.contrastCopy, bg: ink[900] },
  { label: "Band copy on ink.800", fg: ink.contrastCopy, bg: ink[800] },
  { label: "Band muted copy on ink.900", fg: ink.contrastMuted, bg: ink[900] },
  { label: "Band muted copy on ink.800", fg: ink.contrastMuted, bg: ink[800] },
  { label: "Band gold eyebrow on ink.900", fg: gold[300], bg: ink[900] },
  { label: "Band gold eyebrow on ink.800", fg: gold[300], bg: ink[800] },
  { label: "Band copper eyebrow on ink.900", fg: copper[300], bg: ink[900] },
];

function withRatios(pairs: RawPair[]) {
  return pairs.map((pair) => {
    const ratio = contrastRatio(pair.fg, pair.bg);
    return { ...pair, ratio, passes: passesAA(ratio) };
  });
}

/** Every shipped text/background pair, computed live from `tokens.ts`. */
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
      <Stack spacing={0.5}>
        <Text variant="h2">Palette &amp; contrast — fixed dark band</Text>
        {withRatios(bandPairs).map((pair) => (
          <ContrastRow key={pair.label} {...pair} />
        ))}
      </Stack>
    </Stack>
  );
}
