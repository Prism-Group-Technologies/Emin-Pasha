import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

/**
 * The approved §5 description, verbatim, set as a quiet pull-out with a gold
 * spine so it reads as the house's own words beside the invented facts.
 */
export function ApprovedDescription({ text }: { text: string }) {
  return (
    <Box sx={{ borderLeft: "3px solid", borderColor: "primary.main", pl: { xs: 3, md: 4 }, py: 1 }}>
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mb: 1 }}
      >
        § IN OUR WORDS
      </Text>
      <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {text}
      </Text>
    </Box>
  );
}
