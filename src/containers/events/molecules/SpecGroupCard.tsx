import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { SpecGroup } from "@/containers/events/copy";

/**
 * One group of an equipment spec — a tinted icon, the group name, and its
 * label/value rows as a `<dl>` so an AV lead can scan the figures down a flush
 * edge. Flat card, no CTA: these sections build confidence, they do not route.
 *
 * Shared by Kudara Hall's in-house production spec and The Boardroom's
 * technology spec.
 */
export function SpecGroupCard({ group }: { group: SpecGroup }) {
  return (
    <Box component="article" sx={[cardSurface(false), { gap: 3 }]}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconBadge name={group.icon} size={44} />
        <Text variant="h4" component="h3">
          {group.title}
        </Text>
      </Box>

      <Box component="dl" sx={{ display: "grid", gap: 2, m: 0 }}>
        {group.items.map((item) => (
          <Box key={item.label} sx={{ display: "grid", gap: 0.25 }}>
            <Text component="dt" variant="overline" color="text.secondary">
              {item.label}
            </Text>
            <Text component="dd" variant="body2" sx={{ m: 0, textWrap: "pretty" }}>
              {item.value}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
