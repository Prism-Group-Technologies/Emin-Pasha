import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import type { SeatingZone } from "@/containers/spaces/copy/profiles";

/** The three zones within a space, as a compact icon row that stacks on a phone. */
export function SeatingZones({ zones }: { zones: SeatingZone[] }) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        display: "grid",
        gap: 3,
        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
      }}
    >
      {zones.map((zone) => (
        <Box
          component="li"
          key={zone.title}
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            gap: 2,
            pt: 3,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <IconBadge name={zone.icon} size={36} />
          <Box>
            <Text variant="subtitle2" component="p">
              {zone.title}
            </Text>
            <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {zone.detail}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
