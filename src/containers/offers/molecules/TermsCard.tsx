import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { termsCopy } from "@/containers/offers/copy";

/**
 * The plain-language terms summary beside the FAQ. A bordered card without
 * the gold accent or hover lift — it is reference, not a call to action.
 */
export function TermsCard() {
  return (
    <Box
      component="aside"
      aria-labelledby="offers-terms-heading"
      sx={[
        cardSurface(false),
        { gap: 4, "&:hover": { transform: "none", borderColor: "divider", boxShadow: "none" } },
      ]}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Icon name="info" aria-hidden sx={{ color: "primary.main" }} />
        <Text id="offers-terms-heading" variant="h4" component="h3">
          {termsCopy.heading}
        </Text>
      </Box>
      <Box component="ol" sx={{ m: 0, pl: 5, display: "grid", gap: 2.5 }}>
        {termsCopy.items.map((item) => (
          <Text key={item} component="li" variant="body2" color="text.secondary">
            {item}
          </Text>
        ))}
      </Box>
      <Text variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>
        {termsCopy.footnote}
      </Text>
    </Box>
  );
}
