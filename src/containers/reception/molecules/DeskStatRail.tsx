import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { receptionStats } from "@/containers/reception/copy";

/**
 * The three arrival facts as a rule-separated rail.
 *
 * Three equal columns at every width rather than a stack on a phone: the
 * values are four characters each, so they fit a 320px viewport three-across
 * with room to spare, and stacking them would turn the page's most scannable
 * block into three more rows of scrolling.
 *
 * The dividers are drawn as left borders on the second and third cells rather
 * than as `Rule` elements between them, so the rail stays three grid children
 * and needs no `:last-child` special case.
 */
export function DeskStatRail({ onDark = false }: { onDark?: boolean }) {
  return (
    <Box
      component="dl"
      sx={{
        m: 0,
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        borderTop: "1px solid",
        borderColor: onDark ? "rgba(255,255,255,0.22)" : "divider",
        pt: 4,
      }}
    >
      {receptionStats.map((stat, index) => (
        <Box
          key={stat.label}
          sx={{
            px: { xs: 2, sm: 3 },
            ...(index === 0 && { pl: 0 }),
            ...(index > 0 && {
              borderLeft: "1px solid",
              borderColor: onDark ? "rgba(255,255,255,0.22)" : "divider",
            }),
          }}
        >
          <Text
            component="dd"
            sx={{
              m: 0,
              fontFamily: "var(--font-display)",
              fontSize: { xs: "1.5rem", sm: "1.875rem", md: "2.25rem" },
              lineHeight: 1.1,
              color: onDark ? "inherit" : "text.primary",
            }}
          >
            {stat.value}
          </Text>
          <Text
            component="dt"
            variant="overline"
            sx={{
              display: "block",
              mt: 0.5,
              color: onDark ? "rgba(255,255,255,0.74)" : "text.secondary",
            }}
          >
            {stat.label}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
