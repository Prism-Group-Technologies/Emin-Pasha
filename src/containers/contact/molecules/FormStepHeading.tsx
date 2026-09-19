import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

export interface FormStepHeadingProps {
  id?: string;
  eyebrow: string;
  heading: string;
  lead?: string;
}

/**
 * The "Step 1 of 2" marker, heading and optional lede each half of the
 * enquiry form opens with. The `id` lets a `fieldset` name itself by the
 * heading rather than repeating the question in a `legend`.
 */
export function FormStepHeading({ id, eyebrow, heading, lead }: FormStepHeadingProps) {
  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Text
        variant="overline"
        component="p"
        sx={{
          fontFamily: "var(--font-cartographic)",
          color: "primary.main",
          letterSpacing: "0.14em",
        }}
      >
        {eyebrow}
      </Text>
      <Text id={id} variant="h4" component="h3">
        {heading}
      </Text>
      {lead && (
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {lead}
        </Text>
      )}
    </Box>
  );
}
