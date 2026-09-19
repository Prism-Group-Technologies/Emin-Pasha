import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { Differentiator } from "@/containers/events/copy";

/**
 * One buying reason: a tinted icon badge, a claim as the heading, and two
 * sentences of support. A flat card — no CTA — because the section's job is
 * to build conviction, not to route.
 */
export function DifferentiatorCard({ item }: { item: Differentiator }) {
  return (
    <Box component="article" sx={[cardSurface(false), { gap: 2 }]}>
      <IconBadge name={item.icon} size={44} />
      <Text variant="h4" component="h3" sx={{ mt: 1 }}>
        {item.title}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {item.body}
      </Text>
    </Box>
  );
}
