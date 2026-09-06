import { createTheme } from "@mui/material/styles";
import type { Shadows } from "@mui/material/styles/shadows";

import { components } from "./components";
import { darkColorScheme, lightColorScheme } from "./palette";
import { muiShadowLevels, radiusTokens, spacingFn } from "./tokens";
import { buildTypography } from "./typography";

/**
 * DESIGN_DIRECTION.md §B (approved D01–D03). `colorSchemeSelector` must be
 * the literal `data-mui-color-scheme` attribute string (not the `'data'`
 * shorthand, which generates a different, boolean-style `[data-%s]`
 * selector) — it has to match InitColorSchemeScript's own default
 * `attribute` so the no-FOUC script and the theme agree on the same DOM hook.
 * Verified against installed @mui/material@6.5.0 — see DECISIONS.md D10–D14.
 */
const { breakpoints } = createTheme();

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: "data-mui-color-scheme" },
  colorSchemes: { light: lightColorScheme, dark: darkColorScheme },
  defaultColorScheme: "light",
  typography: buildTypography(breakpoints),
  shape: { borderRadius: radiusTokens.md },
  spacing: spacingFn,
  shadows: muiShadowLevels as unknown as Shadows,
  components,
});
