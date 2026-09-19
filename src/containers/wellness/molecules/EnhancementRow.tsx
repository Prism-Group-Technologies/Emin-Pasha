import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { radiusTokens } from "@/theme/tokens";

export interface EnhancementRowProps {
  name: string;
  description: string;
  duration: string;
  /** Pre-formatted indicative price, e.g. "UGX 60,000". */
  price: string;
  selected: boolean;
  onToggle: () => void;
}

/**
 * One add-on on the enhancements menu, as an `aria-pressed` toggle so a guest
 * can shortlist a few and send them to the wellness desk. The selection state
 * and running total live in `useAddOnEstimator`, never here — this stays a
 * presentational button.
 */
export function EnhancementRow({
  name,
  description,
  duration,
  price,
  selected,
  onToggle,
}: EnhancementRowProps) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      sx={{
        width: "100%",
        textAlign: "left",
        font: "inherit",
        color: "inherit",
        cursor: "pointer",
        display: "grid",
        gridTemplateColumns: { xs: "auto 1fr", sm: "auto 1fr auto" },
        alignItems: { sm: "center" },
        columnGap: 4,
        rowGap: 1,
        p: { xs: 4, md: 5 },
        border: "1px solid",
        borderColor: selected ? "primary.main" : "divider",
        borderRadius: `${radiusTokens.lg}px`,
        bgcolor: selected ? "action.hover" : "background.default",
        transition: "border-color 200ms cubic-bezier(0.16,1,0.3,1)",
        "&:hover": { borderColor: "primary.main" },
        "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
      }}
    >
      <Icon
        name={selected ? "check-circle" : "add"}
        aria-hidden
        fontSize="small"
        sx={{ color: selected ? "primary.main" : "text.secondary", mt: { xs: "2px", sm: 0 } }}
      />
      <Box sx={{ display: "grid", gap: 0.5, minWidth: 0 }}>
        <Text variant="subtitle2" component="span">
          {name}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {description}
        </Text>
      </Box>
      <Box
        sx={{
          gridColumn: { xs: "2", sm: "auto" },
          display: "flex",
          gap: 3,
          alignItems: "baseline",
          flexShrink: 0,
        }}
      >
        <Text variant="overline" component="span" color="text.secondary">
          {duration}
        </Text>
        <Text component="span" sx={{ fontFamily: "var(--font-cartographic)" }}>
          {price}
        </Text>
      </Box>
    </Box>
  );
}
