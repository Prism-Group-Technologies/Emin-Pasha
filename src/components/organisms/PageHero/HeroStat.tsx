import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { colorTokens } from "@/theme/tokens";

export interface HeroStatProps {
  value: string;
  label: string;
  /** On the dark hero scrim the figure is gold; on a light surface it stays ink. */
  onDark?: boolean;
}

const { gold, ink } = colorTokens;

/**
 * One figure in the shared page-hero stat rail: a value in the display face
 * over its label in the cartographic face.
 *
 * The sitewide twin of `accommodation/molecules/RoomStat` — kept as its own
 * component on purpose, so a change to the shared hero rail cannot silently
 * reshape a page-local one. Gold is only legible as text on the dark scrim
 * (it fails AA on light), so on a light surface the value falls back to
 * `text.primary`.
 */
export function HeroStat({ value, label, onDark = false }: HeroStatProps) {
  return (
    <Box sx={{ display: "grid", gap: 1, minWidth: 0 }}>
      <Text
        component="p"
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: { xs: "1.375rem", md: "1.625rem" },
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: onDark ? gold[300] : "text.primary",
          textWrap: "balance",
        }}
      >
        {value}
      </Text>
      <Text
        component="p"
        sx={{
          fontFamily: "var(--font-cartographic)",
          fontSize: "0.6875rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          lineHeight: 1.4,
          color: onDark ? ink.contrastMuted : "text.secondary",
          textWrap: "pretty",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}
