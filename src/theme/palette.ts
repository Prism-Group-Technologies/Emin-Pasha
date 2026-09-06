import type { ColorSystemOptions } from "@mui/material/styles";

import { colorTokens } from "./tokens";

const { gold, ink, sand, garden, support } = colorTokens;

/**
 * DESIGN_DIRECTION.md §B.1/§B.2 (approved D01). `garden.500` is used as the
 * secondary fill in both modes — the only garden swatch verified (6.8:1,
 * §B.2 methodology) as safe under light text in either scheme; `garden.700`
 * / `garden.200` are reserved for the Nature-pillar accent *text* role, not
 * component fills, and are applied ad hoc via `sx` where that role appears.
 */
export const lightColorScheme: ColorSystemOptions = {
  palette: {
    primary: { main: gold[500], contrastText: ink[900] },
    secondary: { main: garden[500], contrastText: sand[50] },
    success: { main: support.success.light, contrastText: sand[50] },
    warning: { main: support.warning.lightText, contrastText: sand[50] },
    error: { main: support.error.light, contrastText: sand[50] },
    info: { main: support.info.light, contrastText: sand[50] },
    background: { default: sand[50], paper: sand[100] },
    text: { primary: ink[900], secondary: sand[800] },
    divider: sand[200],
  },
};

export const darkColorScheme: ColorSystemOptions = {
  palette: {
    primary: { main: gold[500], contrastText: ink[900] },
    secondary: { main: garden[500], contrastText: sand[50] },
    success: { main: support.success.dark, contrastText: ink[900] },
    warning: { main: support.warning.dark, contrastText: ink[900] },
    error: { main: support.error.dark, contrastText: ink[900] },
    info: { main: support.info.dark, contrastText: ink[900] },
    background: { default: ink[900], paper: ink[800] },
    text: { primary: sand[50], secondary: sand[400] },
    divider: ink[600],
  },
};
