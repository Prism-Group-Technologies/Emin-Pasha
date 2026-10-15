"use client";

import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";

import { Button } from "@/components/atoms/Button";

/**
 * The dialog's chunk — react-hook-form, the Zod resolver, the field molecules
 * and MUI's Modal — is not requested at all until a guest first taps Reserve.
 * The same latch the mobile booking sheet uses, and it matters more here:
 * `RoomCard` renders three times in the "Other rooms" band and four on the
 * hub, so an eager import would pay for this form up to four times on a page
 * where most guests never open it once.
 */
const RoomReservationDialog = dynamic(
  () =>
    import("@/containers/accommodation/organisms/RoomReservationDialog").then(
      (m) => m.RoomReservationDialog,
    ),
  { ssr: false },
);

/**
 * Long enough to outlast MUI's own close transition (~195ms), so the focus
 * this component restores is not immediately overwritten by the focus trap's
 * teardown putting it back on `<body>`.
 */
const RESTORE_FOCUS_MS = 260;

export interface ReserveRoomButtonProps {
  roomId: string;
  roomName: string;
  rateUgx: number;
  label: string;
}

/**
 * The card's primary CTA. A button, not a link — and that is the fix.
 *
 * It used to be `<Button href={`${href}#book`}>`: a navigation to a *different
 * room's* page, aimed at an anchor part-way down it. Once cross-route
 * fragments were made to land at the top (see `lib/navigation/routeTransition`)
 * that became indistinguishable from the "View Rooms & Rates" link beside it —
 * two buttons, one destination. Reserving is a different intention from
 * browsing, so it now gets a different kind of response: the guest stays on
 * the page they are reading and the request comes to them.
 *
 * `RoomCard` stays a Server Component. Only this button and the dialog it
 * opens cross the client boundary, and they take plain serialisable props.
 */
export function ReserveRoomButton({ roomId, roomName, rateUgx, label }: ReserveRoomButtonProps) {
  const [open, setOpen] = useState(false);
  // Latches on the first open so the chunk is fetched once and the dialog
  // survives being closed — a guest who reopens it finds what they typed.
  const [everOpened, setEverOpened] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  /**
   * Closing a dialog has to put the keyboard back where it came from, and
   * MUI's own restore does not get there on this card. Measured in Chrome:
   * the dialog's chunk is fetched on the click, so by the time the focus trap
   * mounts and records what to return to, the trap has already marked the
   * page behind it `aria-hidden` — which blurs the still-focused button — and
   * it records `<body>` instead. Escape then drops a keyboard guest at the top
   * of the document, three screens above the card they were reading.
   *
   * So the trigger is remembered here, where it cannot be lost, and focus is
   * handed back explicitly once the dialog has finished leaving.
   */
  useEffect(() => {
    if (open || !everOpened) {
      return;
    }
    const timer = window.setTimeout(() => trigger.current?.focus(), RESTORE_FOCUS_MS);
    return () => window.clearTimeout(timer);
  }, [open, everOpened]);

  const handleOpen = () => {
    setEverOpened(true);
    setOpen(true);
  };

  return (
    <>
      <Button ref={trigger} onClick={handleOpen}>
        {label}
      </Button>
      {everOpened && (
        <RoomReservationDialog
          open={open}
          onClose={() => setOpen(false)}
          roomId={roomId}
          roomName={roomName}
          rateUgx={rateUgx}
        />
      )}
    </>
  );
}
