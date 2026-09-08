"use client";

import { useMemo, useState } from "react";

import { maxGuests } from "@/utils/capacity";

export interface RoomFilterResult {
  /** Current party-size selection. */
  guests: number;
  setGuests: (value: number) => void;
  /** Highest party size any category sleeps — the stepper's ceiling. */
  guestCeiling: number;
  /** Per-card, in the order `capacities` was given: is this card shown? */
  visible: boolean[];
  visibleCount: number;
  /** `aria-live` status string for the result count. */
  statusText: string;
}

/**
 * The Rooms grid's only interactive state: a party-size number and the
 * derived visibility of each card.
 *
 * Kept out of the organism so `RoomGrid` stays a thin layout component and
 * the matching rule — each card's own approved `capacity` string against the
 * chosen number — lives in one testable place. Deliberately holds nothing
 * but the number: the cards themselves stay server-rendered (see `RoomGrid`),
 * so no card is ever built on the client and the Zod content layer never
 * crosses the boundary (`utils/capacity` is import-free by design).
 */
export function useRoomFilter(capacities: string[]): RoomFilterResult {
  const [guests, setGuests] = useState(1);

  const ceilings = useMemo(() => capacities.map(maxGuests), [capacities]);
  const guestCeiling = ceilings.length > 0 ? Math.max(...ceilings) : 1;
  const visible = ceilings.map((ceiling) => ceiling >= guests);
  const visibleCount = visible.filter(Boolean).length;

  const statusText =
    visibleCount === capacities.length
      ? `Showing all ${capacities.length} categories.`
      : `Showing ${visibleCount} of ${capacities.length} categories that sleep ${guests}.`;

  return { guests, setGuests, guestCeiling, visible, visibleCount, statusText };
}
