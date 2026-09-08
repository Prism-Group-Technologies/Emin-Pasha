import { SectionShell } from "@/components/templates/SectionShell";
import { roomsSection } from "@/containers/accommodation/copy";
import { RoomCard } from "@/containers/accommodation/molecules/RoomCard";
import { RoomGrid } from "@/containers/accommodation/organisms/RoomGrid";
import { rooms } from "@/content/rooms";
import type { RevealDirection } from "@/theme/motion";

/**
 * The four approved categories, filterable by party size. The cards are
 * Server Components built here and handed to `RoomGrid` as children — the
 * filter only toggles their visibility, so `content/rooms` and Zod never
 * cross into the client bundle.
 */
export function RoomsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={roomsSection.eyebrow}
      heading={roomsSection.heading}
      description={roomsSection.description}
    >
      <RoomGrid capacities={rooms.map((room) => room.capacity)}>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </RoomGrid>
    </SectionShell>
  );
}
