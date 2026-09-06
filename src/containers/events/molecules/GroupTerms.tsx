import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { policies } from "@/content/policies";

const GROUP_TERM_MATCHES = ["group bookings", "rooming lists", "over 10 rooms"];

const booking = policies.find((section) => section.id === "booking-payments-guarantees");
const groupTerms = (booking?.items ?? []).filter((item) =>
  GROUP_TERM_MATCHES.some((match) => item.includes(match)),
);

/**
 * The group terms an organiser will ask about anyway — 14-day confirmation,
 * rooming lists 7 days out, 50% deposit above 10 rooms — surfaced on the page
 * rather than left to a later email.
 *
 * Filtered from the approved §14 policy items by content match rather than
 * retyped, so the wording is exactly what the hotel will hold the client to.
 * Answering these before they are asked is the point: an unanswered
 * commercial objection is the most common reason an RFP goes cold.
 */
export function GroupTerms() {
  if (groupTerms.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Text variant="h3" component="h2">
        Group terms
      </Text>
      <Box component="ul" sx={{ m: 0, pl: 5, display: "grid", gap: 2 }}>
        {groupTerms.map((term) => (
          <Text key={term} component="li" variant="body1" color="text.secondary">
            {term}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
