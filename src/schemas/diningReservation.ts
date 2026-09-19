import { z } from "zod";

import {
  occasionOptions,
  outletOptions,
  reservationCopy,
} from "@/containers/dining/copy/reservation";

const { errors } = reservationCopy;

/**
 * Lead capture for a table reservation.
 *
 * There is no confirmed table-reservation destination in the source
 * (TODO(EMIN-Q13)) and no online booking engine, so this form is how a
 * visitor makes the enquiry they would otherwise make by phone. A person on
 * the reservations desk confirms every table.
 *
 * `outlet` and `occasion` are closed enums built from the same option lists
 * the form renders (`containers/dining/copy/reservation.ts`), so the select
 * and the validator cannot drift. `date` / `time` stay free-form and optional
 * — the desk confirms the real slot — and `message` is optional because
 * requiring one loses leads.
 */
const tupleOf = <T extends readonly { value: string }[]>(options: T) =>
  options.map((option) => option.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

export const outletEnum = z.enum(tupleOf(outletOptions));
export const occasionEnum = z.enum(tupleOf(occasionOptions));

export type ReservationOutlet = z.infer<typeof outletEnum>;
export type ReservationOccasion = z.infer<typeof occasionEnum>;

export const diningReservationSchema = z.object({
  name: z.string().trim().min(2, { error: errors.name }),
  email: z.email({ error: errors.email }),
  phone: z.string().trim().max(40).optional(),
  outlet: outletEnum,
  date: z.string().trim().max(40).optional(),
  time: z.string().trim().max(40).optional(),
  // `valueAsNumber` on the field register turns the <select> string into a
  // number before it reaches here, so this stays a plain `number` schema —
  // `z.coerce` would give the field an `unknown` input type and break
  // `useForm`'s resolver typing.
  partySize: z
    .number({ error: errors.partySize })
    .int({ error: errors.partySize })
    .min(1, { error: errors.partySize })
    .max(20, { error: errors.partySize }),
  occasion: occasionEnum,
  message: z.string().trim().max(1000).optional(),
  consent: z.boolean().refine((value) => value, { error: errors.consent }),
});

export type DiningReservation = z.infer<typeof diningReservationSchema>;
