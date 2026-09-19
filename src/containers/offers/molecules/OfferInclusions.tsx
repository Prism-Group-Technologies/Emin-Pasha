import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

export interface OfferInclusionsProps {
  items: string[];
  /** Two columns from `sm` — the featured spotlight's longer list. */
  columns?: 1 | 2;
  /** Accessible list name, e.g. "Included in The Deluxe Suite Escape". */
  label?: string;
}

/**
 * A checked "what's included" list. Shared by the offer cards, the featured
 * spotlight and the alerts band's benefits, so every tick on the page is the
 * same size, colour and rhythm. Renders nothing for an empty list.
 */
export function OfferInclusions({ items, columns = 1, label }: OfferInclusionsProps) {
  if (items.length === 0) {
    return null;
  }
  return (
    <Box
      component="ul"
      aria-label={label}
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        display: "grid",
        columnGap: 5,
        rowGap: 2,
        gridTemplateColumns: { xs: "1fr", sm: `repeat(${columns}, minmax(0, 1fr))` },
      }}
    >
      {items.map((item) => (
        <Box key={item} component="li" sx={{ display: "flex", gap: 2 }}>
          <Icon
            name="check-circle"
            aria-hidden
            fontSize="small"
            sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }}
          />
          <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
            {item}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
