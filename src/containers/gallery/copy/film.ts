/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface FilmChapter {
  id: string;
  /** "00:00"-style start mark on the reel. */
  mark: string;
  title: string;
  caption: string;
}

/**
 * The film reel's chapters. The film itself is TODO(EMIN-Q43) — the player
 * renders the poster placeholder and the chosen chapter's caption until the
 * master is delivered.
 */
export const filmChapters: FilmChapter[] = [
  {
    id: "arrival",
    mark: "00:00",
    title: "Arrival",
    caption: "Through the gates, under the porch, a cold towel and the first look at the gardens.",
  },
  {
    id: "suites",
    mark: "00:42",
    title: "The suites",
    caption: "Deluxe Suites and Superior Suites, balconies open, morning light on the linen.",
  },
  {
    id: "tables",
    mark: "01:25",
    title: "The tables",
    caption: "From terrace breakfasts to the tasting menu at Sir Samuel Baker.",
  },
  {
    id: "spa",
    mark: "02:10",
    title: "The spa",
    caption: "Steam in the Turkish bath, stillness in the treatment rooms, laps in the pool.",
  },
  {
    id: "night",
    mark: "02:55",
    title: "After dark",
    caption: "Lanterns, the fireside lounge and a band playing in the gardens.",
  },
];

export const tourCopy = {
  eyebrow: "360° VIRTUAL TOUR",
  title: "Step inside six spaces",
  body: "Look around the Deluxe Suite, the Turkish bath, the pool, the Acropole Lounge, Kudara Hall and the Equatorial Gardens — at your own pace.",
  stops: ["Deluxe Suite", "Turkish bath", "Pool", "Acropole Lounge", "Kudara Hall", "Gardens"],
  ctaLabel: "Book a live video walkthrough",
  note: "Tour coming soon — until then, the team will show you round on a WhatsApp video call.",
  reelLabel: "THE FILM · 3 MIN",
  playLabel: "Play the estate film",
  pendingNote: "Film in production — chapter preview shown.",
};
