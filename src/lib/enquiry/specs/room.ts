import { roomReservationCopy } from "@/containers/accommodation/copy/reservation";
import { contactCopy } from "@/content/contact-copy";
import { rooms } from "@/content/rooms";
import type { EnquirySpec } from "@/lib/enquiry/types";
import { nightsBetween } from "@/schemas/booking";
import type { RoomReservation } from "@/schemas/roomReservation";

/** The desk reads a name, not a slug. */
const roomName = (id: string) => rooms.find((room) => room.id === id)?.name ?? id;

/**
 * A named request to stay in one category — the dialog behind "Reserve This
 * Room". Distinct from the `booking` kind, which carries dates with no guest
 * attached because it is the fallback for an availability search; this one is
 * a person asking for a specific room, addressed to the reservations desk with
 * everything needed to reply by hand.
 *
 * `replyTo` is the guest's own address, so the desk can answer by hitting
 * reply rather than copying an address out of the body.
 */
export const spec: EnquirySpec<RoomReservation> = {
  kind: "room",
  subject: (values) => `Reservation request — ${roomName(values.roomId)}`,
  replyTo: (values) => values.email,
  toFields: (values) => [
    { label: "Room", value: roomName(values.roomId) },
    { label: "Name", value: values.name },
    { label: "Email", value: values.email },
    { label: "Phone", value: values.phone || "—" },
    { label: "Check-in", value: values.checkIn },
    { label: "Check-out", value: values.checkOut },
    { label: "Nights", value: String(nightsBetween(values.checkIn, values.checkOut)) },
    { label: "Adults", value: String(values.adults) },
    { label: "Children", value: String(values.children) },
    { label: "Notes", value: values.message || "—" },
  ],
  messages: {
    success: "Thank you — the reservations desk has your request and will reply by email.",
    failure: roomReservationCopy.messages.failed,
    rateLimited: contactCopy.messages.rateLimited,
  },
};
