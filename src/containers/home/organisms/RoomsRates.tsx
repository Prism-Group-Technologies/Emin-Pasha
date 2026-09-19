import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { ROOM_HREFS } from "@/containers/home/constants";
import { roomsSection } from "@/containers/home/copy";
import { RoomRateCard } from "@/containers/home/molecules/RoomRateCard";
import { assets } from "@/content/assets";
import { rooms } from "@/content/rooms";
import type { RevealDirection } from "@/theme/motion";

/**
 * Each category's card photograph, keyed by the same room id the rate card
 * uses. Built once at module load rather than searched per card, and resolved
 * here in the Server Component — the slot ids live in `content/assets.ts`, so
 * a reshoot never touches this file.
 */
const roomImages = new Map(
  rooms.map((room) => [room.id, assets.find((asset) => asset.id === `home-rate-${room.id}`)]),
);

/**
 * The rate card, on the homepage.
 *
 * Hotels lose most of their direct bookings to an undisclosed price: a visitor
 * who cannot see a rate has to enter a booking flow to find out whether the
 * property is even in their band, and a good share of them simply leave
 * instead. Every figure here comes from `content/rooms.ts` — the approved rate
 * card — rendered through `formatUgx` in UGX, never USD.
 *
 * Four cards on a four-column grid at `lg`, two at `sm`, one on a phone: the
 * rate has to stay readable at a glance, and four columns on a tablet would
 * put it at a size nobody reads.
 */
export function RoomsRates({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={roomsSection.eyebrow}
      heading={roomsSection.heading}
      description={roomsSection.description}
      action={
        <Button href={roomsSection.action.href} variant="ghost">
          {roomsSection.action.label}
        </Button>
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 4, md: 5 },
        }}
      >
        {rooms.map((room, index) => (
          <Reveal key={room.id} index={index} fill>
            <RoomRateCard
              name={room.name}
              rateUgx={room.rateUgx}
              capacity={room.capacity}
              sellTo={room.sellTo}
              tagline={roomsSection.taglines[room.id]}
              href={ROOM_HREFS[room.id] ?? "/accommodation"}
              image={roomImages.get(room.id)}
            />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
