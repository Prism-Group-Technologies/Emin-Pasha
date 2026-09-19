import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

/**
 * A ticked list of short inclusions — used on the fleet cards and the premium
 * service cards so "what you get" reads identically everywhere on the page.
 */
export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2 }}>
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
