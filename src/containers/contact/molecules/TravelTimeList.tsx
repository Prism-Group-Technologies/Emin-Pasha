import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import type { TravelTime } from "@/containers/contact/copy";

/**
 * Drive times as a hairline-ruled list: where from and by which road on the
 * left, the time in the display face on the right, so the column of numbers
 * scans at a glance.
 */
export function TravelTimeList({ title, items }: { title: string; items: TravelTime[] }) {
  return (
    <Box>
      <Text variant="overline" component="p" color="text.secondary" sx={{ mb: 2 }}>
        {title}
      </Text>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
        {items.map((item) => (
          <Box
            component="li"
            key={item.from}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 3,
              py: 2.5,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Text variant="body2" sx={{ fontWeight: 600 }}>
                {item.from}
              </Text>
              <Text variant="caption" color="text.secondary">
                {item.note}
              </Text>
            </Box>
            <Text
              component="p"
              sx={{
                flexShrink: 0,
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                color: "text.primary",
                whiteSpace: "nowrap",
              }}
            >
              {item.time}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
