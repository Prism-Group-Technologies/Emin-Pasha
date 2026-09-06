import { Text } from "@/components/atoms/Text";

/** The heading + lede pair every enquiry form opens with. */
export function FormHeading({ heading, lead }: { heading: string; lead: string }) {
  return (
    <>
      <Text variant="h3" component="h2">
        {heading}
      </Text>
      <Text variant="body2" color="text.secondary">
        {lead}
      </Text>
    </>
  );
}
