import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

export interface OutletMetaListProps {
  /** Label / value pairs — cuisine, setting, dress from `copy/outlets.ts`. */
  items: { label: string; value: string }[];
}

/**
 * The cuisine / setting / dress trio under an outlet's description. Invented
 * positioning, laid out as labelled columns that wrap on a narrow screen —
 * lifted out of `OutletIntroSection` so that organism stays a thin layout.
 */
export function OutletMetaList({ items }: OutletMetaListProps) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
      {items.map((item) => (
        <Box key={item.label} sx={{ display: "grid", gap: 0.5, minWidth: 140 }}>
          <Text variant="overline" component="p" color="text.secondary">
            {item.label}
          </Text>
          <Text variant="body2">{item.value}</Text>
        </Box>
      ))}
    </Box>
  );
}
