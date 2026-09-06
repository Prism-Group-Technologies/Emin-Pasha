import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { ROOM_ASSET_IDS } from "@/containers/accommodation/constants";
import { RateBadge } from "@/containers/accommodation/molecules/RateBadge";
import { assets } from "@/content/assets";
import { ctas } from "@/content/ctas";
import type { RoomCategory } from "@/schemas/content/roomCategory";

const reserve = ctas.find((cta) => cta.id === "rooms-reserve");
const view = ctas.find((cta) => cta.id === "rooms-view");

/**
 * One approved category. Shows only verified fields — name, capacity, rate
 * and the four common inclusions. No square metreage, bed configuration,
 * view or floor: none is verified, so none is stated.
 */
export function RoomCard({ room }: { room: RoomCategory }) {
  const asset = assets.find((item) => item.id === ROOM_ASSET_IDS[room.id]);
  const href = `/accommodation/${room.id}`;

  return (
    <Box
      component="article"
      sx={{ display: "grid", gap: 4, borderTop: "1px solid", borderColor: "primary.main", pt: 4 }}
    >
      {asset && <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 33vw" />}
      <Stack spacing={2}>
        <Text variant="h3" component="h2">
          {room.name}
        </Text>
        <Text variant="body2" color="text.secondary">
          {room.capacity}
        </Text>
        <RateBadge rateUgx={room.rateUgx} />
      </Stack>
      <Box component="ul" sx={{ m: 0, pl: 5, display: "grid", gap: 1 }}>
        {room.inclusions.map((inclusion) => (
          <Text key={inclusion} component="li" variant="body2" color="text.secondary">
            {inclusion}
          </Text>
        ))}
      </Box>
      <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", mt: "auto" }}>
        <Button href={href} variant="ghost">
          {view?.label ?? room.name}
        </Button>
        {reserve?.href && <Button href={`${href}#book`}>{reserve.label}</Button>}
      </Stack>
    </Box>
  );
}
