"use client";

import { useId, useState } from "react";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { Popover } from "@/components/molecules/Popover";
import { bookingFieldSx } from "@/containers/booking/fieldSx";
import { formatGuests } from "@/containers/booking/hooks/useBookingSummary";
import { GuestStepper } from "@/containers/booking/molecules/GuestStepper";
import type { BookingWidgetData } from "@/containers/booking/types";

export interface GuestsFieldProps {
  data: BookingWidgetData;
  adults: number;
  /** Named `childGuests`, not `children` — that name belongs to JSX. */
  childGuests: number;
  rooms: number;
  onChange: (field: "adults" | "children" | "rooms", value: number) => void;
}

/**
 * The collapsed guests control: one field reading `3 guests · 1 room` that
 * opens the three steppers in a popover.
 *
 * The steppers are untouched. Usability research on guest and passenger
 * counts is consistent that a stepper beats a select for values that are
 * almost always 1–2, and `GuestStepper` remains the single definition of
 * those bounds — so this is not a downgrade of the control, only of how much
 * room it occupies while nobody is using it. As an always-open column it was
 * ~196px of a ~390px hero panel: taller than the dates and the submit button
 * together, spent on the field guests change least often.
 *
 * The summary phrase comes from `formatGuests`, the same helper the sticky
 * bar's summary uses, so the hero and the bar can never pluralise differently.
 *
 * The popover is portalled to `body` and therefore *outside* the hero's
 * forced-dark wrapper — deliberately. It is a surface on the page, not on the
 * video, so it should follow the page's colour scheme, and it does.
 */
export function GuestsField({ data, adults, childGuests, rooms, onChange }: GuestsFieldProps) {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const panelId = useId();
  const { copy } = data;

  return (
    <>
      <Box
        component="button"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={Boolean(anchor)}
        aria-controls={anchor ? panelId : undefined}
        onClick={(event) => setAnchor(event.currentTarget)}
        // `flex: "0 0 auto"` overrides the shared `flex: 1`. Left flexible it
        // claimed the same share of the row as the two date fields together,
        // so "2 guests · 1 room" sat in a box twice the width of "20 Sep 2026".
        sx={{ ...bookingFieldSx(), flex: "0 0 auto", minWidth: { md: 240 } }}
      >
        <Text variant="overline" component="span" sx={{ display: "block", opacity: 0.7 }}>
          {copy.fields.guests}
        </Text>
        <Text component="span" sx={{ whiteSpace: "nowrap" }}>
          {formatGuests(copy, adults, childGuests, rooms)}
        </Text>
      </Box>

      <Popover
        id={panelId}
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            // `dialog` rather than the default presentational wrapper: the
            // trigger promises `aria-haspopup="dialog"`, and MUI's focus trap
            // already behaves like one. The label names it for a screen
            // reader that lands here without having read the trigger.
            role: "dialog",
            "aria-label": copy.actions.openGuests,
            sx: { mt: 1, p: 4, minWidth: 296, borderRadius: 0.5 },
          },
        }}
      >
        <GuestStepper
          data={data}
          adults={adults}
          childGuests={childGuests}
          rooms={rooms}
          onChange={onChange}
        />
      </Popover>
    </>
  );
}
