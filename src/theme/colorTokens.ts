/**
 * Colour tokens — the brand ramps and the semantic set.
 *
 * Split out of `tokens.ts` (which re-exports them, so every existing
 * `from "@/theme/tokens"` import keeps working) because the generated ramps
 * and the reasoning behind them outgrew that file's complexity budget. This
 * module is pure data: no logic, no imports.
 *
 * Raw design tokens. Framework-agnostic — no MUI/React imports here.
 * palette.ts / typography.ts map these onto MUI's theme shape.
 *
 * ## The brand ramps
 *
 * Four official brand colours anchor the system:
 *
 * | brand hex | family      | step | role                                  |
 * | --------- | ----------- | ---- | ------------------------------------- |
 * | `#BE6E29` | `copper`    | 500  | primary — the lock-up's own colour    |
 * | `#6E2828` | `maroon`    | 800  | secondary — used sparingly            |
 * | `#DCD2C9` | `sand`      | 300  | the warm greige band / divider tone   |
 * | `#D0AB42` | `gold`      | 300  | ornament — rules, glyphs, eyebrows    |
 *
 * Every other stop is **generated**, not hand-picked, so the families stay
 * consistent with one another. The method (`scripts/` is not involved — these
 * are baked values) was:
 *
 * 1. Convert the brand hex to **OKLCH**, whose `L` axis is perceptually
 *    uniform — equal numeric steps look like equal lightness steps, which is
 *    the thing HSL gets wrong and the reason a hand-built ramp usually has one
 *    stop that visibly jumps.
 * 2. Lock a shared `L` ladder for the three chromatic families, chosen so each
 *    brand hex lands *exactly* on a named step. The numbers therefore mean
 *    perceptual lightness, consistently across families — which is why the
 *    brand gold is `gold.300` (it is a light colour) and the brand maroon is
 *    `maroon.800` (it is a dark one). The step number is honest about value
 *    rather than flattering to the brand.
 * 3. Fall chroma off on a Gaussian centred on the anchor, so colour is most
 *    saturated at the true brand hex and calms toward both the washes and the
 *    deep shades. The falloff is asymmetric — dark steps keep more chroma, or
 *    they turn to mud.
 * 4. Apply **hue torsion**: darker steps drift warmer. Without it, darkening
 *    the brand gold at a fixed hue produces olive (it is a yellow at heart),
 *    and the hairlines that use it read as army green. With it they read as
 *    bronze, which is what the brand wants.
 * 5. Clamp chroma back into sRGB while holding `L` and hue fixed, so no stop
 *    is silently flattened by the gamut.
 *
 * `sand` uses its own finer ladder: page and card grounds all live within a
 * sliver of near-white, and a chromatic ladder has no resolution there. Its
 * chroma is additionally tapered above `L` 0.90 — without that the page ground
 * comes out visibly peach rather than warm white.
 *
 * ## Contrast
 *
 * Every pair below that ships is asserted live on `/styleguide`, computed with
 * `utils/contrast.ts` rather than restated from here. The ratios in these
 * comments are those same computed values.
 */
export const colorTokens = {
  /**
   * **Primary — the brand copper.** `copper.500` (#BE6E29) is the exact colour
   * of the lock-up artwork.
   *
   * It cannot carry white text: #FAF8F6 on it measures **3.64:1**, short of
   * the 4.5:1 AA floor for normal text. So the roles split by surface:
   *
   *   - **Fills under white text** use `copper.700` (7.03:1), hover
   *     `copper.800` (9.73:1). Same hue, lower value — it still reads copper.
   *   - **Exact `copper.500`** is kept for everything where it is legal and
   *     most visible: icon glyphs, 1px rules and borders, large display type
   *     (3.64:1, past the 3:1 large-text/non-text floor), and — because the
   *     ground is dark — as the *fill* of the dark-scheme primary button under
   *     an ink label (5.28:1).
   *   - `copper.300` is the accent *text* colour on dark grounds (9.05:1).
   *   - `copper.50` is a background-only wash: it carries `copper.700` at
   *     6.62:1, so it is the ground for a tinted icon chip or a soft band.
   */
  copper: {
    50: "#FAF0E7",
    100: "#FADDC4",
    200: "#F2C198",
    300: "#E19F67",
    400: "#D38747",
    500: "#BE6E29",
    600: "#A45814",
    700: "#864309",
    800: "#673208",
    900: "#4C2408",
    950: "#351706",
  },
  /**
   * **Secondary — the brand maroon.** Deliberately rationed: it is a very dark
   * colour, and a page that leans on it stops reading as modern and starts
   * reading as heavy. Its shipped jobs are the secondary button, the saving /
   * closed pill, and tinted chips — not section bands, which stay on `ink`.
   *
   * White on `maroon.800` is 9.93:1, hover `maroon.900` 13.00:1. On a dark
   * ground the brand hex is near-invisible (1.87:1 against `ink.900`), so the
   * dark scheme steps up to `maroon.600` — white 5.00:1, and 3.84:1 against
   * the page so the button's own edge stays findable.
   *
   * `maroon.300` is the dark-scheme accent text (9.06:1).
   */
  maroon: {
    50: "#FBEEEE",
    100: "#F8DBDB",
    200: "#EBC0C0",
    300: "#D5A0A0",
    400: "#C58989",
    500: "#B2706F",
    600: "#9D5857",
    700: "#863F3E",
    800: "#6E2828",
    900: "#571517",
    950: "#410609",
  },
  /**
   * **Ornament — the brand gold.** `gold.300` (#D0AB42) is the exact brand
   * hex. It is never a fill under white text (2.07:1) and never inline text on
   * a light ground (2.07:1). Its shipped jobs are all on dark or tinted
   * grounds: the eyebrow / overline on a dark band (9.28:1 on `ink.900`), the
   * pill fill under an ink label (9.28:1), and hairlines.
   *
   * The dark steps are bronze rather than olive because of the hue torsion
   * described above. `gold.600` is the hairline on dark bands (3.93:1 against
   * `ink.900`); `gold.700` carries `gold.50` chips at 6.48:1.
   */
  gold: {
    50: "#F5F3DB",
    100: "#EFE5A5",
    200: "#E3CC6E",
    300: "#D0AB42",
    400: "#BF942D",
    500: "#AA7C20",
    600: "#92641B",
    700: "#774E1B",
    800: "#5B3A19",
    900: "#432A15",
    950: "#2E1B0F",
  },
  /**
   * **Neutral — the brand greige.** `sand.300` (#DCD2C9) is the exact brand
   * hex and does the work the brand intends for it: the alternating soft band,
   * the card ground, the input border, the divider.
   *
   * The page ground stays near-white (`sand.50`, #FAF8F6). That is deliberate:
   * every route here is built around photography, and a greige page tints the
   * surround of every image. Keeping the page near-white and banding *with*
   * #DCD2C9 gives the warm brand rhythm without touching how the photographs
   * read. `ink.900` is 19.18:1 on `sand.50` and still 13.65:1 on `sand.300`,
   * so a band carries body copy unchanged.
   */
  sand: {
    50: "#FAF8F6",
    100: "#F4F0ED",
    200: "#EBE3DC",
    300: "#DCD2C9",
    400: "#BFB6AD",
    500: "#9E9790",
    600: "#79736F",
    700: "#585552",
    800: "#3F3D3B",
    900: "#222121",
    950: "#111010",
  },
  /**
   * Warm near-blacks, built on the copper hue at very low chroma so they read
   * as a warm near-black rather than a brown. These are the dark-scheme
   * grounds and the fixed dark band.
   *
   * `contrastCopy` / `contrastMuted` are the two text values used on that band
   * (see `templates/sectionShellStyles.ts`). They are fixed rather than
   * scheme-dependent because the band itself is fixed — 19.18:1 and 10.14:1
   * against `ink.900`.
   */
  ink: {
    900: "#080503",
    800: "#130E0B",
    700: "#221B17",
    600: "#312A24",
    contrastCopy: "#FAF8F6",
    contrastMuted: "#BDB6B0",
  },
  /**
   * Semantic colours, held deliberately apart from the brand hues.
   *
   * This palette occupies the whole warm range — maroon at 23°, copper at 57°,
   * gold at 89° — so a status colour has to be separated by something other
   * than hue alone. `error` is the live case: a muted deep red would be
   * indistinguishable from `maroon.800`, which is a brand colour and carries
   * no warning at all. It is therefore placed at markedly higher chroma and
   * lighter value (#BC2826 against the brand's #6E2828) so it reads as a
   * vivid alert rather than as estate maroon. `error.main` ships as text, icon
   * and border on light grounds — 5.71:1.
   */
  support: {
    success: { light: "#267B4C", dark: "#7AD59C" },
    warning: { light: "#C78B00", lightText: "#8E6200", dark: "#F4C352" },
    error: { light: "#BC2826", dark: "#FF968A" },
    info: { light: "#2B6EA1", dark: "#8FC4F1" },
  },
} as const;

/**
 * Third-party brand colours. **Not part of the estate palette** and
 * deliberately not in `colorTokens` — nothing here is scheme-dependent,
 * because a brand mark that changes colour between light and dark stops
 * being recognisable, which is the only reason to use the vendor's colour
 * instead of our own gold in the first place.
 *
 * `whatsapp.main` is WhatsApp's own **dark** green #128C7E, not the lighter
 * #25D366: the FAB carries a white glyph, and white measures **4.13:1** on
 * #128C7E — an AA pass for the graphical object — versus only 1.98:1 on
 * #25D366. `hover` (#0E7C6F) is a shade darker again, so the glyph stays
 * compliant through the hover state.
 *
 *   - `ring` (#0E7A3C) still outlines the control so its *boundary* is
 *     identifiable against both grounds — 5.2:1 on sand.50, 3.5:1 on ink.900.
 *   - The button is never icon-only to assistive tech: it carries a full
 *     `aria-label`, so the glyph is decoration over a named control.
 */
export const brandColorTokens = {
  whatsapp: { main: "#128C7E", hover: "#0E7C6F", ring: "#0E7A3C", glyph: "#FFFFFF" },
} as const;
