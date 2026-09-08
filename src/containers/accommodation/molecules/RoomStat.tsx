import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { colorTokens } from "@/theme/tokens";

export interface RoomStatProps {
  value: string;
  label: string;
  /** On the dark hero the figure is gold; on a light surface it stays ink. */
  onDark?: boolean;
}

const { gold, ink } = colorTokens;

/**
 * One figure in a stat rail: a value in the display face over its label in
 * the cartographic face. The accommodation-local twin of the homepage's
 * `TrustItem` — kept separate so a change to one page's rail cannot silently
 * reshape the other's.
 *
 * Gold is only used for the value on `onDark`; on a light surface gold fails
 * AA as text (2.33:1), so there the value is `text.primary`.
 */
export function RoomStat({ value, label, onDark = false }: RoomStatProps) {
  return (
    <Box sx={{ display: "grid", gap: 1, minWidth: 0 }}>
      <Text
        component="p"
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: { xs: "1.375rem", md: "1.6875rem" },
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
