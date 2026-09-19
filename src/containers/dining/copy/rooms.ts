/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { OUTLET_ID, type OutletId } from "@/containers/dining/anchors";

export interface OutletIntro {
  /**
   * Editorial paragraphs that run under the approved §5 description on the
   * outlet detail page. Invented prose, written to give every room the same
   * reading weight — the source gives two of the five a single sentence and
   * no namesake, which left half the band empty.
   */
  paragraphs: string[];
  /** Three reasons to book this room rather than one of the other four. */
  whyCome: string[];
}

/**
 * Per-outlet long-form framing for `OutletIntroSection`.
 *
 * Traceability, same rule as the rest of this folder: every structural claim
 * restates something already approved — the all-day room and its terrace, the
 * fine-dining tasting sequence, the rooftop's panoramic views, Manutea's
 * curated wines and whiskies, and 24/7 in-room dining with a Special-Select
 * menu are all in `content/dining.ts`; the dumbwaiter and the Asian/European/
 * African influences are in `diningOverview`. Times and covers restate the
 * sample hours in `./hours.ts` and are invented (TODO(EMIN-Q12)).
 */
export const outletIntros = {
  [OUTLET_ID.hakkiPasha]: {
    paragraphs: [
      "It is the room the hotel wakes up in. Coffee and a full breakfast from half past six, a lunch crowd that spills onto the terrace, and by evening a bar working through handcrafted cocktails while the dining room fills behind it — one space that changes character four times a day without ever closing.",
      "The kitchen's fusion of international and local flavours is at its most legible here: the menu runs longest, the specials board moves fastest, and the modern dumbwaiter carries plates up in full view of the room.",
    ],
    whyCome: [
      "The default table for a breakfast meeting or a long, unhurried lunch.",
      "Terrace seating under the trees when the dining room feels too formal.",
      "A full bar in the same room, so dinner can turn into a nightcap without moving.",
    ],
  },
  [OUTLET_ID.sirSamuelBaker]: {
    paragraphs: [
      "One room, one menu, one seating. Five courses arrive in sequence for the whole table at once, so the evening has a shape — it begins when you sit down and ends when the last plate is cleared, somewhere past two hours later.",
      "The kitchen writes this menu for a small dining room and cooks it for twenty-odd covers a night, which is what buys the meticulous attention to detail the room is known for. Dietary versions are cooked to the same sequence with a day's notice.",
    ],
    whyCome: [
      "The room for the evening that is the reason for the trip, not an interlude in it.",
      "An optional wine flight poured course by course rather than ordered by the bottle.",
      "Reservation only, which means the kitchen knows you are coming.",
    ],
  },
  [OUTLET_ID.rooftopTerrace]: {
    paragraphs: [
      "Open air, above the treeline, with Nakasero falling away on one side and the city lights coming up on the other. The terrace opens at four, and the hour before sunset is the one everybody asks for — the light goes through the whole spectrum and the room goes quiet for it.",
      "It is a bar first: a long drinks list, a full zero-proof section, and small plates from the same kitchen that runs the restaurants below, served until it closes at ten. Nobody dresses for it, and nobody stays for a single round.",
    ],
    whyCome: [
      "The highest table on the property, and the only one with the skyline in it.",
      "Small plates and cocktails rather than a sit-down menu — stay an hour or the evening.",
      "Walk-ins welcome, though the sundown tables go first.",
    ],
  },
  [OUTLET_ID.manutea]: {
    paragraphs: [
      "Low light, deep chairs, and a list that is the point of the room: fine wines and whiskies gathered from around the world, poured by the glass — so a bottle you would not open alone becomes one pour on a Tuesday.",
      "A coravin system keeps those pours tasting as they did the day the bottle was opened, and the short food menu — cheese, charcuterie, a few warm plates — exists to go with the list rather than to compete with it.",
    ],
    whyCome: [
      "The quiet room for a nightcap after dinner, or for the whole evening instead of one.",
      "Rare bottles available by the glass, not only by the bottle.",
      "Single malts from four regions, and someone behind the bar who can talk you through them.",
    ],
  },
  [OUTLET_ID.inRoom]: {
    paragraphs: [
      "The same kitchen, brought upstairs. The Special-Select menu runs in every room category around the clock, which matters most on the two occasions a hotel is usually least able to help: the night you land at two in the morning, and the morning a meeting starts before the restaurant does.",
      "The full menu is available until eleven at night; after that a shorter overnight card carries through to breakfast. One call to the in-room phone or the reception line is the whole ordering process, and a tray typically arrives inside twenty minutes.",
    ],
    whyCome: [
      "Every room category, every hour — including the ones nobody plans for.",
      "A full menu until 23:00, and a shorter overnight card through to breakfast.",
      "One call to order. No app, no ordering window, no minimum.",
    ],
  },
} satisfies Record<OutletId, OutletIntro>;
