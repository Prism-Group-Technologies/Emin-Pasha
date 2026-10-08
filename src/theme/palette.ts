import type { ColorSystemOptions } from "@mui/material/styles";

import { colorTokens } from "./tokens";

const { copper, maroon, ink, sand, support } = colorTokens;

/**
 * `primary.main` is the **exact brand copper** (#BE6E29), not the darker shade
 * the contained button actually fills with.
 *
 * That split is deliberate. `primary.main` is what every `color="primary"`
 * icon, `borderColor: "primary.main"` rule and large display heading resolves
 * to, and all of those are legal at 3.64:1 — they only need the 3:1 non-text /
 * large-text floor. Pinning the palette to the brand hex keeps the brand
 * visible in the places it is most seen. The one role that *cannot* take it is
 * a white label on a fill, so the contained button overrides its own
 * background in `components.ts` rather than the whole palette being dragged
 * darker to satisfy a single component.
 *
 * `contrastText` is therefore `ink.900`: MUI hands `contrastText` to anything
 * sitting on `primary.main`, and ink on the brand copper is 5.11:1 while white
 * would be 3.69:1. The contained button, which does not use `primary.main` as
 * its ground, sets its own label colour.
 */
export const lightColorScheme: ColorSystemOptions = {
  palette: {
    primary: {
      main: copper[500],
      light: copper[300],
      dark: copper[700],
      contrastText: ink[900],
    },
    secondary: {
      main: maroon[800],
      light: maroon[600],
      dark: maroon[900],
      contrastText: ink.contrastCopy,
    },
    success: { main: support.success.light, contrastText: ink.contrastCopy },
    warning: { main: support.warning.lightText, contrastText: ink.contrastCopy },
    error: { main: support.error.light, contrastText: ink.contrastCopy },
    info: { main: support.info.light, contrastText: ink.contrastCopy },
    background: { default: sand[50], paper: sand[100] },
    text: { primary: ink[900], secondary: sand[800] },
    divider: sand[300],
  },
};

/**
 * The dark scheme keeps the same brand hues and re-picks the *values*, which
 * is the whole job of a second scheme.
 *
 * Both brand buttons follow one rule here: **a lighter fill than the light
 * scheme uses.** On a near-black page a dark fill has no findable edge — the
 * brand `maroon.800` is 1.87:1 against the ground, and the light scheme's
 * `copper.700` only 2.73:1, both under the 3:1 floor WCAG 1.4.11 sets for
 * identifying a control's boundary. (That floor is missed by the palette this
 * replaced, in both of its button colours.) Stepping the fills up satisfies
 * the boundary; what the label then does differs by family. The primary stops
 * at `copper.600`, which clears the boundary *and* still carries white, so the
 * contained button keeps one white label in both schemes — see the note in
 * `components.ts`. The secondary has no such stop and flips its label to ink.
 *
 * `secondary.main` is therefore `maroon.500` — 5.28:1 under an ink label and
 * 5.28:1 against the page, and safe as accent text on dark too, which
 * `maroon.600` would not have been (3.84:1).
 */
export const darkColorScheme: ColorSystemOptions = {
  palette: {
    primary: {
      main: copper[500],
      light: copper[300],
      dark: copper[700],
      contrastText: ink[900],
    },
    secondary: {
      main: maroon[500],
      light: maroon[300],
      dark: maroon[700],
      contrastText: ink[900],
    },
    success: { main: support.success.dark, contrastText: ink[900] },
    warning: { main: support.warning.dark, contrastText: ink[900] },
    error: { main: support.error.dark, contrastText: ink[900] },
    info: { main: support.info.dark, contrastText: ink[900] },
    background: { default: ink[900], paper: ink[800] },
    text: { primary: sand[50], secondary: ink.contrastMuted },
    divider: ink[600],
  },
};
