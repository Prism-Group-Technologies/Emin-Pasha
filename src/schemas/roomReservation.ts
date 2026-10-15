import { z } from "zod";

import { bookingLimits } from "@/config/booking";
import { roomReservationCopy } from "@/containers/accommodation/copy/reservation";
import { rooms } from "@/content/rooms";
import { nightsBetween, startOfLocalToday } from "@/schemas/booking";

const { errors } = roomReservationCopy;

/**
 * A request to stay in one approved category.
 *
 * Distinct from `bookingSearchSchema`, and deliberately so. That one is an
 * *availability search* — dates and headcount, no person attached — because
 * it ends by handing the guest to the engine, which collects the rest. This
 * one ends at the reservations desk, so it carries the guest with it: a name,
 * a reply address, and whatever they want the desk to know. The two coexist;
 * the dialog offers the engine as a second path for anyone who would rather
 * not wait on a human.
 *
 * `roomId` is a closed enum built from the §4 rate card itself, so a request
 * can never name a category the hotel does not sell, and the enum cannot
 * drift from the rooms the cards are rendered from.
 *
 * Dates are `YYYY-MM-DD` strings for the same reasons as the booking search —
 * they survive the form, the request body and the mail envelope unchanged,
 * and they pick up none of the timezone drift a `Date` collects in transit.
 */
const roomIds = rooms.map((room) => room.id) as [string, ...string[]];

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { error: errors.checkIn });

export const roomReservationSchema = z
  .object({
    roomId: z.enum(roomIds),
    name: z.string().trim().min(2, { error: errors.name }),
    email: z.email({ error: errors.email }),
    phone: z.string().trim().max(40).optional(),
    checkIn: isoDate,
    checkOut: isoDate,
    adults: z
      .number({ error: errors.adults })
      .int({ error: errors.adults })
      .min(1, { error: errors.adults })
      .max(bookingLimits.maxAdults, { error: errors.adults }),
    children: z
      .number({ error: errors.children })
      .int({ error: errors.children })
      .min(0, { error: errors.children })
      .max(bookingLimits.maxChildren, { error: errors.children }),
    message: z.string().trim().max(1000).optional(),
    consent: z.boolean().refine((value) => value, { error: errors.consent }),
    /** The honeypot every enquiry form carries — see `HoneypotField`. */
    website: z.string().max(0).optional(),
  })
  .superRefine((value, ctx) => {
    const daysFromToday = Math.round(
      (new Date(`${value.checkIn}T00:00:00`).getTime() - startOfLocalToday().getTime()) /
        86_400_000,
    );
    if (daysFromToday < 0) {
      ctx.addIssue({ code: "custom", path: ["checkIn"], message: errors.checkInPast });
    }
    if (nightsBetween(value.checkIn, value.checkOut) < 1) {
      ctx.addIssue({ code: "custom", path: ["checkOut"], message: errors.checkOutNotAfter });
    }
  });

export type RoomReservation = z.infer<typeof roomReservationSchema>;
