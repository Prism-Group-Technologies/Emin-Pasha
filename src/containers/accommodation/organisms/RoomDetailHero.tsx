import { PageHero } from "@/components/organisms/PageHero";
import { BOOKING_ANCHOR_ID, GALLERY_ANCHOR_ID } from "@/containers/accommodation/constants";
import { pageHeroImage } from "@/content/pageHeroes";
import type { RoomCategory } from "@/schemas/content/roomCategory";
import { formatUgx } from "@/utils/currency";

/**
 * The room page's above-the-fold block. A thin wrapper over the shared
 * `PageHero`: only verified fields — the name, the `from` rate and the
 * capacity — over the page's two in-page CTAs. Two, because a guest arriving
 * on a room page wants one of exactly two things: the price and dates, or a
 * proper look at the room. Sending both to the booking widget wastes the
 * second, and the photographs are the stronger of the two for anyone who is
 * still choosing.
 */
export function RoomDetailHero({ room }: { room: RoomCategory }) {
  return (
    <PageHero
      image={pageHeroImage(room.id)}
      eyebrow={`§ ${room.name.toUpperCase()}`}
      headline={room.name}
      label={room.name}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Accommodation", href: "/accommodation" },
        { label: room.name },
      ]}
      primaryCta={{ label: "Check dates", href: `#${BOOKING_ANCHOR_ID}` }}
      secondaryCta={{ label: "See the room", href: `#${GALLERY_ANCHOR_ID}` }}
      stats={[
        { value: formatUgx(room.rateUgx), label: "from · per night" },
        { value: `Sleeps ${room.capacity}`, label: "maximum occupancy" },
      ]}
      minHeight={{ xs: 520, md: 600 }}
    />
  );
}
