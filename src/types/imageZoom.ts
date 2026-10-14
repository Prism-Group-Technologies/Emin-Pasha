/**
 * One photograph in the form the image modal needs — and, crucially, the form
 * a DOM data attribute can carry.
 *
 * It is the whole contract between the three layers of the zoom feature:
 * `AssetImage` serialises one of these onto the element it renders, the
 * delegated listener in `useImageZoom` reads them back out of the document,
 * and `LightboxStage` / `LightboxThumbStrip` render them. Nothing in that
 * chain needs `AssetRef`, which is what keeps the content layer (and Zod, and
 * the photography registry) out of the always-loaded client bundle — the trap
 * DECISIONS.md D25 exists to stop us falling into again.
 *
 * `caption` doubles as the enlarged photograph's `alt`. A slot that is
 * decorative in a card is no longer decorative once it is the sole subject of
 * a dialog, so there is no second text field to keep in step — and no second
 * copy of the same sentence in the HTML of every page.
 */
export interface ZoomImage {
  id: string;
  src: string;
  /** The delivered file's own intrinsic size, not the slot's declared box. */
  width: number;
  height: number;
  /** One line of human text: the caption, the thumbnail's name, the `alt`. */
  caption: string;
}
