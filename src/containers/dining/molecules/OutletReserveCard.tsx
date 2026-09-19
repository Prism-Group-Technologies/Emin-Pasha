import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { MENUS_ANCHOR_ID, RESERVE_ANCHOR_ID } from "@/containers/dining/anchors";
import { identity } from "@/content/identity";
import { telephoneUrl, whatsappUrl } from "@/lib/directions";

export interface OutletReserveCardProps {
  outletName: string;
  /** In-room dining is ordered, not reserved — the card swaps its CTA. */
  isInRoom: boolean;
}

/**
 * The in-band booking prompt, at the end of the intro column.
 *
 * The hero's CTAs have scrolled off by the time a visitor finishes reading
 * the room, and the reservation form is two sections further down — this is
 * the point of highest intent on the page and previously had nothing on it.
 * In-room dining is ordered by phone rather than reserved, so it swaps to the
 * menu and the reservations line, exactly as `OutletDetailHero` does.
 *
 * The WhatsApp hand-off uses the general opening rather than a dining-specific
 * one: `content/whatsapp.ts` deliberately keeps that set closed, and minting a
 * variant per call site is a governed-copy change, not a layout one.
 */
export function OutletReserveCard({ outletName, isInRoom }: OutletReserveCardProps) {
  return (
    <Box sx={[cardSurface(), { gap: 3, "&:hover": { transform: "none" } }]}>
      <Icon name={isInRoom ? "king-bed" : "event"} aria-hidden sx={{ color: "primary.main" }} />
      <Text variant="h4" component="h3">
        {isInRoom ? "Order to your room" : `Reserve at ${outletName}`}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {isInRoom
          ? "Dial the in-room phone or the reception line — no reservation needed, at any hour."
          : "Tell us the date, the time and how many. We confirm by email, usually the same day."}
      </Text>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
        <Button href={isInRoom ? `#${MENUS_ANCHOR_ID}` : `#${RESERVE_ANCHOR_ID}`}>
          {isInRoom ? "See the menu" : "Reserve a table"}
        </Button>
        <Button href={whatsappUrl} variant="ghost">
          WhatsApp us
        </Button>
      </Box>
      <Link href={telephoneUrl} variant="body2">
        Or call {identity.telephone}
      </Link>
    </Box>
  );
}
