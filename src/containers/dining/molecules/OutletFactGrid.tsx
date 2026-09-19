import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import type { OutletFact } from "@/containers/dining/copy/facts";

export interface OutletFactGridProps {
  title: string;
  items: readonly OutletFact[];
}

/**
 * The outlet's "Good to know" facts as a full-width row of equal columns, each
 * on a gold top rule — the same column pattern the homepage book-direct block
 * uses (`BenefitItem`).
 *
 * It replaces the shared `RoomFactList` at this one call site: that component
 * is a narrow stacked checklist tuned for the accommodation room pages, and
 * inside `OutletIntroSection` it sat in a `72ch` box with the whole right half
 * of the band empty beside it. Four columns under the heading use the full
 * measure and give the four facts equal weight.
 */
export function OutletFactGrid({ title, items }: OutletFactGridProps) {
  return (
    <Box>
      <Text variant="h3" component="h2" sx={{ mb: { xs: 5, md: 6 } }}>
        {title}
      </Text>
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 5, md: 6 },
        }}
      >
        {items.map((fact) => (
          <Box
            key={fact.label}
            component="li"
            sx={{
              display: "grid",
              gap: 3,
              alignContent: "start",
              pt: 4,
              borderTop: "2px solid",
              borderColor: "primary.main",
            }}
          >
            <Icon name={fact.icon} aria-hidden fontSize="small" sx={{ color: "primary.main" }} />
            <Text variant="h4" component="h3">
              {fact.label}
            </Text>
            <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {fact.detail}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
