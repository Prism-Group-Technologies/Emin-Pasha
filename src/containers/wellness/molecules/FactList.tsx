import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

/**
 * A plain list of verified facts. Used for offerings, rules and safety
 * notices, so each page presents exactly what the source states and nothing
 * is padded out to make a section look fuller.
 */
export function FactList({ items, heading }: { items: string[]; heading?: string }) {
  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      {heading && (
        <Text variant="h3" component="h2">
          {heading}
        </Text>
      )}
      <Box component="ul" sx={{ m: 0, pl: 5, display: "grid", gap: 2 }}>
        {items.map((item) => (
          <Text key={item} component="li" variant="body1" color="text.secondary">
            {item}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
