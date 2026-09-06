import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { colorTokens } from "@/theme/tokens";

export interface PillarCardProps {
  ordinal: number;
  name: string;
  description: string;
  /** The brand's own vocabulary for this pillar, rendered as gold keyword chips. */
  cues: readonly string[];
}

const { gold, ink } = colorTokens;

/**
 * One pillar, as a card on the dark band.
 *
 * The previous version ran the four pillars down a single narrow column and
 * left the entire right half of the viewport empty — the worst dead space on
 * the page. Two things fix it: a 2×2 grid so the pillars occupy the full
 * measure, and the `cues` array, which the content layer has always carried
 * and nothing rendered. Those keywords are the brand's own vocabulary for each
 * pillar, so they fill the card with something meaningful rather than padding.
 *
 * The oversized ordinal is the visual anchor. Gold/500 measures 8.43:1 on this
 * ground (verified with `utils/contrast.ts`, not estimated), so this is the one
 * place on the site where gold can carry type at size.
 */
export function PillarCard({ ordinal, name, description, cues }: PillarCardProps) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr)",
        gap: { xs: 4, md: 5 },
        p: { xs: 5, md: 6 },
        border: "1px solid",
        borderColor: gold[700],
        bgcolor: "rgba(255,255,255,0.02)",
        transition: "border-color 200ms, background-color 200ms",
        "&:hover": { borderColor: gold[500], bgcolor: "rgba(196,168,50,0.06)" },
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
      }}
    >
      <Text
        aria-hidden
        component="span"
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: { xs: "2.25rem", md: "3rem" },
          lineHeight: 0.9,
          color: gold[500],
          opacity: 0.85,
        }}
      >
        {String(ordinal).padStart(2, "0")}
      </Text>

      <Box sx={{ display: "grid", gap: 3, alignContent: "start" }}>
        <Text variant="h3" component="h3" sx={{ color: ink.contrastCopy }}>
          {name}
        </Text>
        <Text variant="body1" sx={{ color: ink.contrastMuted, textWrap: "pretty" }}>
          {description}
        </Text>
        <Box
          component="ul"
          sx={{ display: "flex", flexWrap: "wrap", gap: 2, m: 0, p: 0, pt: 1, listStyle: "none" }}
        >
          {cues.map((cue) => (
            <Box
              key={cue}
              component="li"
              sx={{
                px: 3,
                py: 1,
                border: "1px solid",
                borderColor: gold[700],
                color: gold[300],
                fontFamily: "var(--font-cartographic)",
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {cue}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
