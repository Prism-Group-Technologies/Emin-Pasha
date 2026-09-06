import { bookingCopy } from "@/content/booking";

/**
 * Vendor error codes → guest-facing sentences.
 *
 * Every key below was read off the vendor's own "Common Error Codes" table at
 * api.ezeetechnosys.com on 2026-08-02 — none is inferred. The vendor returns
 * both numeric codes and string codes, sometimes in the same field, so both
 * are keyed here as strings.
 *
 * The mapping is deliberately lossy in one direction: a guest never sees
 * "Auth Code inactive" or "APIACCESSDENIED". Those are our configuration
 * problems, not theirs, so every credential/config failure resolves to the
 * same calm sentence that routes them to a human. The raw code is preserved
 * separately for the server log.
 */
const GUEST_MESSAGE: Record<string, string> = {
  // ── Our configuration is wrong. Never the guest's problem. ──────────────
  "100": bookingCopy.errors.configuration,
  "101": bookingCopy.errors.configuration,
  "102": bookingCopy.errors.configuration,
  "200": bookingCopy.errors.configuration,
  "201": bookingCopy.errors.configuration,
  "202": bookingCopy.errors.configuration,
  "301": bookingCopy.errors.configuration,
  "302": bookingCopy.errors.configuration,
  "303": bookingCopy.errors.configuration,
  "400": bookingCopy.errors.configuration,
  "502": bookingCopy.errors.configuration,
  "602": bookingCopy.errors.configuration,
  "611": bookingCopy.errors.configuration,
  "612": bookingCopy.errors.configuration,
  "614": bookingCopy.errors.configuration,
  APIACCESSDENIED: bookingCopy.errors.configuration,
  UNAUTHREQ: bookingCopy.errors.configuration,
  INVUSEPASS: bookingCopy.errors.configuration,
  InvalidHotelCode: bookingCopy.errors.configuration,
  HotelCodeEmpty: bookingCopy.errors.configuration,
  ParametersMissing: bookingCopy.errors.configuration,
  BadRequest: bookingCopy.errors.configuration,
  DBConnectError: bookingCopy.errors.engineDown,

  // ── The engine is up but something about the search doesn't work. ──────
  "106": bookingCopy.errors.dates,
  "108": bookingCopy.errors.dates,
  "109": bookingCopy.errors.dates,
  "117": bookingCopy.errors.dates,
  "118": bookingCopy.errors.dates,
  "119": bookingCopy.errors.dates,
  CheckDate: bookingCopy.errors.dates,
  DateNotvalid: bookingCopy.errors.dates,
  InvalidSearchCriteria: bookingCopy.errors.dates,
  NightsLimitExceeded: bookingCopy.errors.stayTooLong,
  MaxAdultLimitReach: bookingCopy.errors.occupancy,
  MaxChildLimitReach: bookingCopy.errors.occupancy,

  // ── Nothing to sell for that search. Not an error to the guest. ────────
  "203": bookingCopy.errors.noAvailability,
  "-1": bookingCopy.errors.noAvailability,
  NORESACC: bookingCopy.errors.noAvailability,
  RoomListingError: bookingCopy.errors.noAvailability,

  // ── Their side fell over. ──────────────────────────────────────────────
  "500": bookingCopy.errors.engineDown,
  UnknownError: bookingCopy.errors.engineDown,
};

/** Codes that mean "no rooms", not "something broke". */
const NO_AVAILABILITY = new Set(["203", "-1", "NORESACC", "RoomListingError"]);

export function isNoAvailability(code: string | number | undefined): boolean {
  return code !== undefined && NO_AVAILABILITY.has(String(code));
}

/**
 * Never surfaces a vendor string. An unrecognised code falls through to the
 * generic sentence rather than being echoed, because an unmapped code is by
 * definition one we have not read and cannot vouch for.
 */
export function guestMessageFor(code: string | number | undefined): string {
  if (code === undefined) {
    return bookingCopy.errors.generic;
  }
  return GUEST_MESSAGE[String(code)] ?? bookingCopy.errors.generic;
}
