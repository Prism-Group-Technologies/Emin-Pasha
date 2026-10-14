import { describe, expect, it } from "vitest";

import { rooms } from "@/content/rooms";
import { type RoomReservation, roomReservationSchema } from "@/schemas/roomReservation";

/** `YYYY-MM-DD`, offset in whole days from today — the form's own date format. */
function isoDaysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function request(overrides: Partial<RoomReservation> = {}) {
  return {
    roomId: "deluxe-room",
    name: "Amina Okello",
    email: "amina@example.com",
    phone: "+256 700 000 000",
    checkIn: isoDaysFromNow(1),
    checkOut: isoDaysFromNow(3),
    adults: 2,
    children: 0,
    message: "A quiet room if you have one.",
    consent: true,
    ...overrides,
  };
}

const errorsOn = (field: string, input: unknown) => {
  const result = roomReservationSchema.safeParse(input);
  return result.success ? [] : result.error.issues.filter((issue) => issue.path[0] === field);
};

describe("roomReservationSchema", () => {
  it("accepts a complete request", () => {
    expect(roomReservationSchema.safeParse(request()).success).toBe(true);
  });

  it("accepts a request with the optional fields left out", () => {
    const { phone, message, ...required } = request();
    void phone;
    void message;
    expect(roomReservationSchema.safeParse(required).success).toBe(true);
  });

  /**
   * The enum is built from the §4 rate card itself, so this also guards
   * against a category being renamed in `content/rooms.ts` while the dialog
   * carries on sending the old slug.
   */
  it("accepts every category the hotel actually sells", () => {
    for (const room of rooms) {
      expect(roomReservationSchema.safeParse(request({ roomId: room.id })).success).toBe(true);
    }
  });

  it("rejects a room the hotel does not sell", () => {
    expect(errorsOn("roomId", request({ roomId: "presidential-penthouse" }))).toHaveLength(1);
  });

  it("rejects a check-in that has already passed", () => {
    expect(errorsOn("checkIn", request({ checkIn: isoDaysFromNow(-1) }))).not.toHaveLength(0);
  });

  it("rejects a check-out on or before check-in", () => {
    const sameDay = isoDaysFromNow(2);
    expect(errorsOn("checkOut", request({ checkIn: sameDay, checkOut: sameDay }))).not.toHaveLength(
      0,
    );
    expect(
      errorsOn("checkOut", request({ checkIn: isoDaysFromNow(4), checkOut: isoDaysFromNow(2) })),
    ).not.toHaveLength(0);
  });

  it("rejects a malformed date rather than guessing at it", () => {
    expect(errorsOn("checkIn", request({ checkIn: "12/11/2026" }))).not.toHaveLength(0);
  });

  it("requires a name and a usable reply address", () => {
    expect(errorsOn("name", request({ name: "A" }))).toHaveLength(1);
    expect(errorsOn("email", request({ email: "not-an-email" }))).toHaveLength(1);
  });

  it("requires at least one adult, and bounds the party", () => {
    expect(errorsOn("adults", request({ adults: 0 }))).not.toHaveLength(0);
    expect(errorsOn("adults", request({ adults: 99 }))).not.toHaveLength(0);
    expect(errorsOn("children", request({ children: -1 }))).not.toHaveLength(0);
  });

  it("accepts a party with no children", () => {
    expect(roomReservationSchema.safeParse(request({ children: 0 })).success).toBe(true);
  });

  it("requires consent, because the reply is an email to a named person", () => {
    expect(errorsOn("consent", request({ consent: false }))).toHaveLength(1);
  });

  it("rejects a filled honeypot", () => {
    expect(errorsOn("website", { ...request(), website: "http://spam.example" })).not.toHaveLength(
      0,
    );
  });
});
