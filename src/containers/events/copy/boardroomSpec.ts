import type { SpecGroup } from "./specs";

/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts.
 *
 * The Boardroom's technology spec, grouped so an executive assistant or an IT
 * lead can scan it before booking.
 *
 * Traceable: the §7 source gives "cutting-edge technology" and "a dedicated
 * F&B support team", and the 2026 photography shows a wall-mounted interactive
 * display, recessed power/data ports in the tabletop, split air conditioning,
 * blackout and sheer curtains, and a credenza — all stated here as fact.
 *
 * Invented (TODO(EMIN-Q12)): panel size, casting protocols, bandwidth, the
 * camera and microphone arrangement, and service intervals. Replace them with
 * the real spec sheet at sign-off rather than softening the wording.
 */
export const boardroomSpec: SpecGroup[] = [
  {
    id: "display",
    title: "Display & presenting",
    icon: "auto-awesome",
    items: [
      { label: "Screen", value: "Wall-mounted interactive flat panel, visible from every seat" },
      {
        label: "Touch",
        value: "Annotate over anything on screen, then send the marked-up file to the room",
      },
      {
        label: "Connecting",
        value: "Wired HDMI from the tabletop or wireless casting — no adapter hunt, no dongle",
      },
      {
        label: "No projector",
        value: "Nothing to dim the room for, nothing to focus, nothing to wheel in and out",
      },
    ],
  },
  {
    id: "table",
    title: "The table",
    icon: "groups",
    items: [
      { label: "Seats", value: "Sixteen in high-backed executive chairs — indicative maximum" },
      {
        label: "Fixed",
        value: "A single installed table, not trestles under linen; it is set before you arrive",
      },
      {
        label: "In-table services",
        value: "Recessed power and data ports along the run, so cables never cross the floor",
      },
      { label: "Writing", value: "Pads, pens and still water laid at every place as standard" },
    ],
  },
  {
    id: "hybrid",
    title: "Hybrid & connectivity",
    icon: "directions",
    items: [
      {
        label: "Video calls",
        value: "Join Teams, Zoom or Google Meet from the panel with the room as one endpoint",
      },
      {
        label: "Waiting room",
        value: "Host controls held in the room — nobody joins your session until you admit them",
      },
      { label: "Internet", value: "Dedicated wired drop plus managed Wi-Fi for the room" },
      {
        label: "Remote seats",
        value: "Camera and microphone cover the full table, so the far end hears the far chair",
      },
    ],
  },
  {
    id: "environment",
    title: "The room itself",
    icon: "light-mode",
    items: [
      {
        label: "Privacy",
        value: "A private room with its own door — not a partitioned corner of a larger hall",
      },
      {
        label: "Light",
        value: "Blackout and sheer curtains — daylight when you want it, none when you do not",
      },
      { label: "Climate", value: "Independent air conditioning you control from inside the room" },
      {
        label: "Acoustics",
        value: "Carpet throughout and a credenza wall — built for talking, not for echo",
      },
    ],
  },
  {
    id: "service",
    title: "Service & catering",
    icon: "restaurant",
    items: [
      {
        label: "F&B team",
        value:
          "A dedicated food and beverage team briefed on your run of day, not a passing waiter",
      },
      {
        label: "Breaks",
        value: "Coffee, tea and refreshments served to the room at the intervals you set",
      },
      {
        label: "Lunch",
        value: "Either restaurant on site — nobody drives, nothing goes cold",
      },
      {
        label: "Discretion",
        value: "Service enters on your signal; papers on the table stay where you left them",
      },
    ],
  },
];

export const boardroomSpecNote =
  "Panel size, casting protocols, bandwidth and the camera arrangement are indicative and are confirmed on your proposal. Secure parking, lunch in either restaurant and rooms upstairs come with the day. Anything the room does not already hold — a second screen, a scribe, a translator, a locked document safe — is arranged on request.";
