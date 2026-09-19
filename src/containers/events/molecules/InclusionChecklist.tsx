import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

/**
 * A verified-inclusions list rendered with gold check marks rather than plain
 * bullets — the "what you get" block on every venue page. `columns={2}` packs
 * it into two tracks from `sm` up when it sits full-width; the default single
 * column is for when it shares the row with a supporting image.
 */
export function InclusionChecklist({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: columns === 2 ? "repeat(2, minmax(0, 1fr))" : "1fr",
        },
        columnGap: 6,
        rowGap: 2.5,
      }}
    >
      {items.map((item) => (
        <Box key={item} component="li" sx={{ display: "flex", gap: 1.5 }}>
          <Icon
            name="check-circle"
            aria-hidden
            fontSize="small"
            sx={{ color: "primary.main", mt: "3px", flexShrink: 0 }}
          />
          <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
            {item}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
