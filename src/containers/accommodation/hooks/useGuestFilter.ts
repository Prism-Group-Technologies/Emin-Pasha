"use client";

import { useState } from "react";

/**
 * The party-size control. Deliberately holds nothing but the number: the
 * cards themselves stay server-rendered (see `RoomGrid`), and matching each
 * card's own approved `capacity` string against this value is what keeps the
 * filter from ever claiming a room sleeps more than the source says.
 */
export function useGuestFilter() {
  const [guests, setGuests] = useState(1);
  return { guests, setGuests };
}
