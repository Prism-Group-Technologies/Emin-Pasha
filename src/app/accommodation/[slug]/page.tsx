import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RoomDetailContainer } from "@/containers/accommodation/detail";
import { rooms } from "@/content/rooms";
import { breadcrumbJsonLd, roomJsonLd } from "@/lib/seo/room";

/**
 * Verified against next@16.2.12: dynamic-route `params` is a Promise and must
 * be awaited (the Next 15 change) — asserted here rather than recalled.
 *
 * `generateStaticParams` returns exactly the four approved category ids, so
 * the legacy USD categories have no route at all; anything else 404s rather
 * than rendering.
 */
export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.id }));
}

export const dynamicParams = false;

function findRoom(slug: string) {
  return rooms.find((room) => room.id === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = findRoom(slug);
  if (!room) {
    return {};
  }
  return {
    title: `${room.name} | Emin Pasha Hotel Kampala`,
    // Built only from verified fields — capacity, rate and the approved
    // inclusions. No size, bed or view, exactly as on the page itself.
    description: `${room.name} at The Emin Pasha Hotel & Spa, Nakasero. Sleeps ${room.capacity}. From UGX ${room.rateUgx.toLocaleString("en-UG")} per night, including à la carte breakfast, unlimited fibre and 24/7 room service.`,
    alternates: { canonical: `/accommodation/${room.id}` },
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = findRoom(slug);
  if (!room) {
    notFound();
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Accommodation", href: "/accommodation" },
    { name: room.name },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomJsonLd(room)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <RoomDetailContainer room={room} />
    </>
  );
}
