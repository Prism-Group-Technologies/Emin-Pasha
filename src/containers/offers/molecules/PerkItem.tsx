import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import type { BookDirectPerk } from "@/containers/offers/copy";

/**
 * One book-direct perk: a tinted icon badge beside a short title and one
 * clause of detail. A list item on a shared hairline rather than a bordered
 * card, so six of them read as one continuous promise.
 */
export function PerkItem({ perk }: { perk: BookDirectPerk }) {
  return (
    <Box
      component="li"
      sx={{
        display: "flex",
        gap: 4,
        pt: 5,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <IconBadge name={perk.icon} size={44} />
      <Box sx={{ display: "grid", gap: 1 }}>
        <Text variant="subtitle1" component="h3" sx={{ fontWeight: 600 }}>
          {perk.title}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {perk.detail}
        </Text>
      </Box>
    </Box>
  );
}
