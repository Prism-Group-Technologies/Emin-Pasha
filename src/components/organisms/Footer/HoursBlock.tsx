import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { DetailList } from "@/components/molecules/DetailList";
import type { FooterData } from "@/components/organisms/Footer/footerData";

/**
 * The hours the source actually approves, as a `<dl>`, plus the honest note
 * standing in for restaurant and bar hours — which 02_CONTENT_SOURCE_OF_TRUTH.md
 * §0.7 forbids inventing (TODO(EMIN-Q12)). Which rows exist is decided in
 * `footerData`; this component only lays them out.
 */
export function HoursBlock({ hours }: { hours: FooterData["hours"] }) {
  return (
    // Capped rather than filling its track. The list is a two-column grid
    // with the times flush right, so in an unbounded column a short row
    // ("Check-in … 14:00") strands its value hundreds of pixels from its
    // label. 420px is just wide enough for the longest pair
    // ("Swanky Spa & Wellness Centre" / "Daily, 7:00am – 9:00pm") and keeps
    // every other row readable as a pair.
    <Box sx={{ maxWidth: 420 }}>
      <DetailList rows={hours.rows} title={hours.title} titleId={hours.titleId} />
      <Text variant="body2" color="text.secondary" sx={{ mt: 4, maxWidth: "36ch" }}>
        {hours.pendingNote}
      </Text>
    </Box>
  );
}
