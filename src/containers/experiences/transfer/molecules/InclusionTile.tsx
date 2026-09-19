import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import type { Inclusion } from "@/containers/experiences/transfer/copy/inclusions";

/**
 * One "always included" item: a garden-toned icon badge beside a title and a
 * one-line detail. Deliberately borderless — eight of them sit in a grid and
 * should read as one list, not eight competing cards.
 */
export function InclusionTile({ item }: { item: Inclusion }) {
  return (
    <Box component="li" sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
      <IconBadge name={item.icon} tone="garden" size={44} />
      <Box sx={{ display: "grid", gap: 0.5 }}>
        <Text variant="subtitle2" component="p">
          {item.title}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {item.detail}
        </Text>
      </Box>
    </Box>
  );
}
