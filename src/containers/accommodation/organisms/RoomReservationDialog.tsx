"use client";

import { useEffect } from "react";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { Drawer } from "@/components/molecules/Drawer";
import { Modal } from "@/components/molecules/Modal";
import { roomReservationCopy as copy } from "@/containers/accommodation/copy/reservation";
import { RoomReservationForm } from "@/containers/accommodation/organisms/RoomReservationForm";
import { DESKTOP_QUERY, useMediaBreakpoint } from "@/hooks/useMediaBreakpoint";
import { track } from "@/lib/analytics/events";
import { formatUgx } from "@/utils/currency";

export interface RoomReservationDialogProps {
  open: boolean;
  onClose: () => void;
  roomId: string;
  roomName: string;
  /** The §4 rate, shown so the guest is never asked to commit blind. */
  rateUgx: number;
}

/** Caps the sheet short of the viewport so the page stays visible behind it. */
const SHEET = { maxHeight: "88svh", overflowY: "auto", p: { xs: 4, sm: 5 }, pt: 0 } as const;

/**
 * The rate band under the title. It is the one fact a guest weighing "reserve"
 * against "keep looking" actually wants, and the dialog covers the card that
 * was showing it.
 */
function RateLine({ rateUgx }: { rateUgx: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, flexWrap: "wrap", mb: 2 }}>
      <Text component="p" sx={{ fontFamily: "var(--font-display)", fontSize: "1.375rem" }}>
        {formatUgx(rateUgx)}
      </Text>
      <Text variant="body2" color="text.secondary">
        from · per night
      </Text>
    </Box>
  );
}

/**
 * "Reserve This Room" as a layer rather than a navigation.
 *
 * A dialog on desktop, a bottom sheet on phones — the split design systems
 * specify for touch, and the one this codebase already made for the booking
 * widget (`MobileBookingSheet`). A centred box is wrong on a phone for a
 * reason that only shows up in use: the moment the keyboard opens for the name
 * field it takes half the screen, and a vertically centred dialog is pushed
 * into whatever is left. A sheet is already anchored to the bottom edge, so it
 * rises with the keyboard instead of fighting it, and it starts under the
 * thumb rather than at the top of the reach.
 *
 * Both surfaces trap focus, close on Escape and restore focus to the card's
 * button on close — MUI's `Dialog` and `Modal` do that natively, which is why
 * neither is hand-rolled here.
 */
export function RoomReservationDialog({
  open,
  onClose,
  roomId,
  roomName,
  rateUgx,
}: RoomReservationDialogProps) {
  const isDesktop = useMediaBreakpoint(DESKTOP_QUERY);
  const title = `${copy.title} the ${roomName}`;

  useEffect(() => {
    if (open) {
      track("room_reservation_opened", { roomId, variant: isDesktop ? "dialog" : "sheet" });
    }
  }, [open, roomId, isDesktop]);

  const body = (
    <>
      <RateLine rateUgx={rateUgx} />
      <RoomReservationForm roomId={roomId} onClose={onClose} engineLabel={copy.engine.label} />
    </>
  );

  if (isDesktop) {
    return (
      <Modal open={open} onClose={onClose} title={title} maxWidth="sm">
        {body}
      </Modal>
    );
  }

  return (
    <Drawer open={open} onClose={onClose} anchor="bottom" title={title}>
      <Box sx={SHEET}>
        <Text variant="h4" component="h2" sx={{ mb: 1 }}>
          {title}
        </Text>
        {body}
      </Box>
    </Drawer>
  );
}
