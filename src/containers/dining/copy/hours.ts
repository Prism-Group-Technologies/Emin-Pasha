/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { OUTLET_ID, type OutletId } from "@/containers/dining/anchors";

export interface HoursRow {
  /** e.g. "Breakfast", "Dinner", "Mon–Fri". */
  label: string;
  time: string;
}

export interface OutletHours {
  label: string;
  rows: HoursRow[];
}

/**
 * Sample service times. The source publishes none (TODO(EMIN-Q12)); these are
 * plausible placeholders, always shown with a "confirmed on reservation" note.
 */
export const outletHours = {
  [OUTLET_ID.hakkiPasha]: {
    label: "Hakki Pasha Restaurant & Bar",
    rows: [
      { label: "Breakfast", time: "06:30 – 10:30" },
      { label: "Lunch", time: "12:30 – 15:00" },
      { label: "Dinner", time: "18:30 – 22:30" },
      { label: "Bar", time: "12:00 – late" },
    ],
  },
  [OUTLET_ID.sirSamuelBaker]: {
    label: "Sir Samuel Baker Fine Dining",
    rows: [
      { label: "Dinner, Tue–Sat", time: "19:00 – 22:00" },
      { label: "Last seating", time: "20:30" },
      { label: "Sun–Mon", time: "Private bookings only" },
    ],
  },
  [OUTLET_ID.rooftopTerrace]: {
    label: "The Rooftop Terrace",
    rows: [
      { label: "Daily", time: "16:00 – 23:00" },
      { label: "Sundowner hour", time: "18:00 – 19:00" },
      { label: "Kitchen closes", time: "22:00" },
    ],
  },
  [OUTLET_ID.manutea]: {
    label: "Manutea Wine & Whisky Lounge",
    rows: [
      { label: "Tue–Sat", time: "17:00 – 24:00" },
      { label: "Sun–Mon", time: "Closed" },
    ],
  },
  [OUTLET_ID.inRoom]: {
    label: "In-Room Dining",
    rows: [
      { label: "Full menu", time: "06:00 – 23:00" },
      { label: "Overnight menu", time: "23:00 – 06:00" },
      { label: "Availability", time: "Every room, 24/7" },
    ],
  },
} satisfies Record<OutletId, OutletHours>;
