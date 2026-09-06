import "server-only";

import { bookingCopy } from "@/content/booking";
import { guestMessageFor, isNoAvailability } from "@/lib/booking/errors";
import type { BookingAdapter, BookingOutcome, QuotedRoomType } from "@/lib/booking/types";
import { YcsTransportError, listingRequest } from "@/lib/booking/ycsClient";
import { type BookingSearch, nightsBetween } from "@/schemas/booking";

/**
 * (B) API-BACKED FLOW — phase 2. Server-only.
 *
 * ## Which request type this uses, and why not the one in the brief
 *
 * The brief nominated `RoomAvailability` (kioskconnectivity, HotelCode +
 * AuthCode). Reading the vendor docs, that returns **room and room-type
 * availability only** — its parameters are `from_date`/`to_date` with
 * optional `RoomID`/`RoomtypeID`, and no occupancy or rate inputs at all. It
 * cannot answer "what would 2 adults in 1 room for 3 nights cost".
 *
 * `RoomList` on `booking/reservation_api/listing.php` is the request type
 * that actually matches our search: its documented parameters are
 * `check_in_date`, `check_out_date`, `num_nights`, `number_adults`,
 * `number_children`, `num_rooms`, `promotion_code`, `roomtypeunkid` — a
 * near-exact match for `bookingSearchSchema`, and it returns rates and
 * `currency_code` alongside `available_rooms`. So this adapter uses
 * `RoomList`; `RoomAvailability` stays available for a future "is this
 * specific room free" check.
 *
 * ## Response parsing
 *
 * Field names below are quoted from the vendor's documented `RoomList`
 * response and nothing else: `roomtypeunkid`, `Roomtype_Name`,
 * `available_rooms`, `currency_code`. The vendor does not publish a full
 * schema for `room_rates_info`, so its total is read defensively and reported
 * as `null` rather than being coerced into a number we cannot vouch for — a
 * wrong price is worse than no price.
 */
interface RoomListRow {
  roomtypeunkid?: string | number;
  Roomtype_Name?: string;
  available_rooms?: string | number;
  currency_code?: string;
  room_rates_info?: unknown;
}

function readErrorCode(payload: unknown): string | undefined {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }
  const record = payload as Record<string, unknown>;
  const candidate = record.ErrorCode ?? record.errorcode ?? record.Error ?? record.status;
  return candidate === undefined ? undefined : String(candidate);
}

function toRoomTypes(rows: RoomListRow[]): QuotedRoomType[] {
  return rows.flatMap((row) => {
    if (row.roomtypeunkid === undefined || !row.Roomtype_Name) {
      return [];
    }
    return [
      {
        roomTypeId: String(row.roomtypeunkid),
        name: row.Roomtype_Name,
        availableRooms: Number(row.available_rooms ?? 0),
        totalAmount: null,
      },
    ];
  });
}

/** Exactly the documented `RoomList` parameter names — nothing invented. */
function roomListParams(search: BookingSearch): Record<string, string> {
  return {
    check_in_date: search.checkIn,
    check_out_date: search.checkOut,
    num_nights: String(nightsBetween(search.checkIn, search.checkOut)),
    number_adults: String(search.adults),
    number_children: String(search.children),
    num_rooms: String(search.rooms),
    show_only_available_rooms: "1",
    ...(search.promoCode ? { promotion_code: search.promoCode } : {}),
    ...(search.roomTypeId ? { roomtypeunkid: search.roomTypeId } : {}),
  };
}

const noAvailability = (): BookingOutcome => ({
  kind: "enquiry",
  href: "/contact",
  reason: "no-availability",
});

function interpret(payload: unknown): BookingOutcome {
  const code = readErrorCode(payload);
  if (isNoAvailability(code)) {
    return noAvailability();
  }
  if (code !== undefined && !Array.isArray(payload)) {
    // Logged with its real code server-side; the guest never sees it.
    console.error(`[ycs] RoomList returned code ${code}`);
    return { kind: "error", message: guestMessageFor(code), code };
  }
  const rows = Array.isArray(payload) ? (payload as RoomListRow[]) : [];
  const roomTypes = toRoomTypes(rows);
  return roomTypes.length === 0
    ? noAvailability()
    : { kind: "quote", roomTypes, currency: rows[0]?.currency_code ?? "" };
}

export const ycsApiAdapter: BookingAdapter = {
  id: "ycsApi",
  async submit(search): Promise<BookingOutcome> {
    try {
      return interpret(await listingRequest("RoomList", roomListParams(search)));
    } catch (error) {
      if (error instanceof YcsTransportError) {
        console.error(`[ycs] transport ${error.reason}`);
        return { kind: "enquiry", href: "/contact", reason: "engine-unreachable" };
      }
      console.error("[ycs] unexpected failure", error);
      return { kind: "error", message: bookingCopy.errors.generic };
    }
  },
};
