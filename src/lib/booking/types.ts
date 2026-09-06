import type { BookingSearch } from "@/schemas/booking";

/**
 * One interface, three implementations (CLAUDE.md §4's "deep-link handoff for
 * v1, API-backed flow phase 2, enquiry fallback always present"). Callers —
 * the four widget variants — depend only on this, so promoting the API flow
 * from phase 2 is a config change at the composition root, not a UI rewrite.
 */
export type BookingOutcome =
  /** Hand off to the engine. The caller navigates; the adapter never does. */
  | { kind: "redirect"; url: string }
  /** A priced result set came back from the API (phase 2). */
  | { kind: "quote"; roomTypes: QuotedRoomType[]; currency: string }
  /** Route the guest to the enquiry path instead — always a valid ending. */
  | { kind: "enquiry"; href: string; reason: BookingFallbackReason }
  /** Something went wrong, already translated out of vendor-speak. */
  | { kind: "error"; message: string; code?: string };

export type BookingFallbackReason =
  "not-configured" | "engine-unreachable" | "no-availability" | "vendor-error";

/**
 * Shaped from the field names the vendor documents for `request_type=RoomList`
 * (verified 2026-08-02 against api.ezeetechnosys.com): `roomtypeunkid`,
 * `Roomtype_Name`, `available_rooms`, `room_rates_info`, `currency_code`.
 * Nothing here is a guessed field.
 */
export interface QuotedRoomType {
  roomTypeId: string;
  name: string;
  availableRooms: number;
  /** Total for the stay, in the engine's configured currency (Q51). */
  totalAmount: number | null;
}

export interface BookingAdapter {
  readonly id: "ycsDeepLink" | "ycsApi" | "enquiry";
  submit(search: BookingSearch, context: BookingContext): Promise<BookingOutcome>;
}

export interface BookingContext {
  /** Forwarded verbatim to the engine so attribution survives the handoff. */
  utm?: Record<string, string>;
  /** Absolute base of the hotel's booking engine — `env.YCS_BOOKING_URL`. */
  bookingUrl?: string;
}
