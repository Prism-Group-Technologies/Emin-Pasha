import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { ROOM_ASSET_IDS, ROOM_POPULAR_ID } from "@/containers/accommodation/constants";
import { roomTaglines } from "@/containers/accommodation/copy";
import { RoomCardMedia } from "@/containers/accommodation/molecules/RoomCardMedia";
import { assets } from "@/content/assets";
import { ctas } from "@/content/ctas";
import type { RoomCategory } from "@/schemas/content/roomCategory";
import { formatUgx } from "@/utils/currency";

const reserve = ctas.find((cta) => cta.id === "rooms-reserve");
const view = ctas.find((cta) => cta.id === "rooms-view");
/** Three of the four inclusions on the card; the detail page lists them all. */
const INCLUSIONS_SHOWN = 3;

/**
 * One approved category as an image-forward card: an inset rounded photo with
 * the capacity and (for the Garden Room) a "Most requested" chip, then the
 * name, the unverified strapline (`copy/rooms.ts`), the `from` rate in the
 * display face, a short inclusions list and the two CTAs on a shared
 * baseline. A Server Component — it reads `content/*` and never runs on the
 * client (the guest filter in `RoomGrid` only toggles its visibility).
 */
export function RoomCard({ room }: { room: RoomCategory }) {
  const asset = assets.find((item) => item.id === ROOM_ASSET_IDS[room.id]);
  const href = `/accommodation/${room.id}`;
  const shown = room.inclusions.slice(0, INCLUSIONS_SHOWN);
  const extra = room.inclusions.length - shown.length;

  return (
    <Box component="article" sx={[cardSurface(false), { gap: 3 }]}>
      <RoomCardMedia asset={asset} capacity={room.capacity} popular={room.id === ROOM_POPULAR_ID} />

      <Text variant="h3" component="h2">
        {room.name}
      </Text>
      {roomTaglines[room.id] && (
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {roomTaglines[room.id]}
        </Text>
      )}

      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, flexWrap: "wrap" }}>
        <Text
          component="p"
          sx={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", lineHeight: 1.1 }}
        >
          {formatUgx(room.rateUgx)}
        </Text>
        <Text variant="body2" color="text.secondary">
          from · per night
        </Text>
      </Box>

      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 1.5 }}>
        {shown.map((inclusion) => (
          <Box key={inclusion} component="li" sx={{ display: "flex", gap: 2 }}>
            <Icon
              name="check-circle"
              aria-hidden
              fontSize="small"
              sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }}
            />
            <Text variant="body2" color="text.secondary">
              {inclusion}
            </Text>
          </Box>
        ))}
        {extra > 0 && (
          <Text component="li" variant="body2" color="text.secondary" sx={{ pl: 6 }}>
            {`+ ${extra} more in every room`}
          </Text>
        )}
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: "auto", pt: 1 }}>
        <Button href={href} variant="ghost">
          {view?.label ?? "View the room"}
        </Button>
        {reserve?.href && <Button href={`${href}#book`}>{reserve.label}</Button>}
      </Box>
    </Box>
  );
}
