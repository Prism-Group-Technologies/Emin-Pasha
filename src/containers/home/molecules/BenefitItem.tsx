import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

export interface BenefitItemProps {
  title: string;
  description: string;
}

/**
 * One book-direct benefit, as a column in a four-across row.
 *
 * Previously these sat two-up beside a heading column that ran out of content
 * halfway down, leaving a tall empty block on the left. Four equal columns
 * under a centred header uses the full measure and gives the four claims equal
 * weight, which is what they have.
 *
 * The icon is `aria-hidden`: every item in the list is a benefit, so
 * announcing "check mark" four times adds nothing. List semantics come from
 * the parent `<ul>`.
 */
export function BenefitItem({ title, description }: BenefitItemProps) {
  return (
    <Box
      component="li"
      sx={{
        listStyle: "none",
        display: "grid",
        gap: 3,
        alignContent: "start",
        pt: 4,
        borderTop: "2px solid",
        borderColor: "primary.main",
      }}
    >
      <Icon name="check-circle" aria-hidden fontSize="small" sx={{ color: "primary.main" }} />
      <Text variant="h4" component="h3">
        {title}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {description}
      </Text>
    </Box>
  );
}
