/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface DeskMember {
  id: string;
  /** Placeholder name — no real staff member is identified (cf. copy/voices.ts). */
  name: string;
  role: string;
  languages: string[];
  bio: string;
  /** Portrait placeholder id — resolves against copy/media.ts. */
  assetId: string;
}

/**
 * The people behind the inbox, as four profiles. Names are **placeholders**
 * — the approved content deck names no front-office staff, so nothing here is
 * attributed to a real person. Promote into `src/content` once real bios and
 * portraits are collected and signed off.
 */
export const deskTeam: DeskMember[] = [
  {
    id: "front-office",
    name: "John Doe",
    role: "Front office manager",
    languages: ["English", "Luganda", "Swahili"],
    bio: "Runs the desk and reads every enquiry that comes in overnight.",
    assetId: "contact-team-1",
  },
  {
    id: "reservations",
    name: "Jane Smith",
    role: "Reservations lead",
    languages: ["English", "French"],
    bio: "Rooms, long stays and corporate rates — the person who holds your dates.",
    assetId: "contact-team-2",
  },
  {
    id: "events",
    name: "James Smith",
    role: "Events coordinator",
    languages: ["English", "Swahili"],
    bio: "From a board lunch to a garden wedding, one planner from first call to last guest.",
    assetId: "contact-team-3",
  },
  {
    id: "concierge",
    name: "David Johnson",
    role: "Concierge",
    languages: ["English", "Luganda", "German"],
    bio: "Drivers, dinner tables across town and the gorilla-permit questions.",
    assetId: "contact-team-4",
  },
];
