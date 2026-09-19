import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

export interface OutletWhyListProps {
  /** Three reasons to book this room — invented copy from `copy/rooms.ts`. */
  items: readonly string[];
}

/**
 * "Why this room" — the three-line case for one outlet over the other four.
 *
 * It exists because the approved §5 copy gives two of the five outlets a
 * single sentence and no namesake, so their intro band had nothing to say
 * after the cuisine/setting/dress trio. A checked list answers the question a
 * diner choosing between five rooms is actually asking, and gives every
 * outlet the same block weight regardless of how long its description runs.
 */
export function OutletWhyList({ items }: OutletWhyListProps) {
  return (
    <Box>
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mb: 3 }}
      >
        § WHY THIS ROOM
      </Text>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2.5 }}>
        {items.map((item) => (
          <Box
            key={item}
            component="li"
            sx={{ display: "flex", gap: 2.5, alignItems: "flex-start" }}
          >
            <Icon
              name="check-circle"
              aria-hidden
              fontSize="small"
              sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }}
            />
            <Text variant="body2" sx={{ textWrap: "pretty" }}>
              {item}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
