import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { GmPullQuote } from "@/containers/story/molecules/GmPullQuote";
import { GmSignature } from "@/containers/story/molecules/GmSignature";
import { GmWelcomeLetter } from "@/containers/story/molecules/GmWelcomeLetter";

/**
 * `hub` — the Our Story hub band: the message as a pull-quote (`GmPullQuote`),
 * framed by its own `sections.gm` eyebrow / heading / lede.
 *
 * `letter` — the standalone `/our-story/message-from-the-general-manager`
 * route: the same message as an editorial welcome letter (`GmWelcomeLetter`)
 * and a smaller portrait, because there the `framing` copy makes it a letter
 * rather than a quotation.
 */
export type GmQuoteTone = "hub" | "letter";

interface GmQuotePanelProps {
  eyebrow: string;
  heading: string;
  lede: string;
  tone?: GmQuoteTone;
}

/**
 * Per-tone geometry for the overlap grid. The message card and the portrait
 * rail share one grid row: the card runs from column 1 to `messageEnd`, the
 * rail is right-aligned at `railWidth`, so the rail laps the card's top-right
 * corner and the tinted band visibly breaks the grid. A wider `letter`
 * message leaves the card one column short of the `hub` one.
 */
const TONE_GRID = {
  hub: { messageEnd: 11, railWidth: 336 },
  letter: { messageEnd: 10, railWidth: 248 },
} as const;

const compositionSx = { maxWidth: 1180, mx: "auto" } as const;

const headerSx = {
  display: "grid",
  gap: { xs: 2.5, md: 3 },
  maxWidth: "56ch",
  mb: { xs: 6, md: 8 },
} as const;

const overlapSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
  rowGap: { xs: 5, md: 0 },
  alignItems: "start",
} as const;

/**
 * The welcome as one asymmetric composition. A measured header block (gold
 * tick, eyebrow, display heading, lede) renders here rather than through
 * `SectionShell`'s header so the whole block shares one measure; the message
 * card and the portrait rail then overlap in a single grid row (see
 * `TONE_GRID`). `tone` picks the message treatment and the geometry; the
 * frame is shared. DOM order is header → message → rail, which is also the
 * reading order when the grid collapses to one column below `md`.
 */
export function GmQuotePanel({ eyebrow, heading, lede, tone = "hub" }: GmQuotePanelProps) {
  const isLetter = tone === "letter";
  const grid = isLetter ? TONE_GRID.letter : TONE_GRID.hub;

  return (
    <Box sx={compositionSx}>
      <Box sx={headerSx}>
        <Box aria-hidden sx={{ width: 44, height: "2px", bgcolor: "primary.main" }} />
        <Text
          component="p"
          variant="overline"
          sx={{
            fontFamily: "var(--font-cartographic)",
            letterSpacing: "0.14em",
            color: "text.secondary",
          }}
        >
          {eyebrow}
        </Text>
        <Text component="h2" variant="h2" sx={{ textWrap: "balance", maxWidth: "20ch" }}>
          {heading}
        </Text>
        <Text
          variant="subtitle1"
          sx={{ color: "text.secondary", textWrap: "pretty", maxWidth: "54ch" }}
        >
          {lede}
        </Text>
      </Box>

      <Box sx={overlapSx}>
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            gridColumn: { xs: "1", md: `1 / ${grid.messageEnd}` },
            gridRow: { md: 1 },
          }}
        >
          {isLetter ? <GmWelcomeLetter /> : <GmPullQuote />}
        </Box>

        <Box
          sx={{
            zIndex: 2,
            gridColumn: { xs: "1", md: "1 / 13" },
            gridRow: { md: 1 },
            justifySelf: { xs: "start", md: "end" },
            width: { md: grid.railWidth },
            maxWidth: { xs: 280 },
            mt: { md: 7 },
          }}
        >
          <GmSignature dense={isLetter} />
        </Box>
      </Box>
    </Box>
  );
}
