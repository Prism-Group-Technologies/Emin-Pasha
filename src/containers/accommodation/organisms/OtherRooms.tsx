import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { COMPARISON_ANCHOR_ID } from "@/containers/accommodation/constants";
import { otherRoomsSection } from "@/containers/accommodation/copy";
import { RoomCard } from "@/containers/accommodation/molecules/RoomCard";
import { rooms } from "@/content/rooms";
import type { RevealDirection } from "@/theme/motion";

/**
 * The three categories this page is not about.
 *
 * A room page that ends without one is a dead end: a guest who has decided
 * the Superior Room is too much or too little has nowhere to go but the back
 * button, and the browsing grid they came from is two navigations away. Three
 * cards and a link to the comparison keep that guest on the funnel.
 *
 * The cards are the hub's own `RoomCard`, so a category's photography, rate
 * and strapline are described identically wherever it appears. The section
 * action points at the hub's comparison anchor rather than duplicating the
 * table on four more pages.
 */
export function OtherRooms({
  currentRoomId,
  motion = "up",
}: {
  currentRoomId: string;
  motion?: RevealDirection;
}) {
  const others = rooms.filter((room) => room.id !== currentRoomId);

  if (others.length === 0) {
    return null;
  }

  return (
    <SectionShell
      motion={motion}
      eyebrow={otherRoomsSection.eyebrow}
      heading={otherRoomsSection.heading}
      description={otherRoomsSection.description}
      variant="raised"
      action={
        <Button href={`/accommodation#${COMPARISON_ANCHOR_ID}`} variant="ghost">
          Compare all four
        </Button>
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, 1fr)" },
          gap: { xs: 5, md: 6 },
        }}
      >
        {others.map((room, index) => (
          <Reveal key={room.id} index={index} fill>
            <RoomCard room={room} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
