import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import type { AssuranceItem } from "@/containers/wellness/copy/assurance";

/**
 * The credibility strip under a facility hero: a wrap of tinted icon badges,
 * each over a short label and one clause of reassurance. Not built on
 * `cardSurface()` — it reads as one continuous band, so the items share a
 * hairline rather than each getting a border.
 */
export function AssuranceBar({ items }: { items: AssuranceItem[] }) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        display: "grid",
        gap: { xs: 5, md: 6 },
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(3, minmax(0, 1fr))",
          lg: "repeat(6, minmax(0, 1fr))",
        },
      }}
    >
      {items.map((item) => (
        <Box
          component="li"
          key={item.label}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 4,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <IconBadge name={item.icon} size={40} />
          <Text variant="subtitle2" component="p">
            {item.label}
          </Text>
          <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
            {item.detail}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
