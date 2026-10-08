import { createTheme } from "@mui/material/styles";
import { describe, expect, it } from "vitest";

import { colorTokens } from "@/theme/colorTokens";
import { components } from "@/theme/components";
import { darkColorScheme, lightColorScheme } from "@/theme/palette";

/**
 * Built here rather than imported from `theme/index`, which pulls `next/font`
 * in through `typography.ts` and cannot load outside a Next build. Everything
 * under test — the colour schemes and the component overrides — is the same
 * object `theme/index` assembles.
 */
const theme = createTheme({
  cssVariables: { colorSchemeSelector: "data-mui-color-scheme" },
  colorSchemes: { light: lightColorScheme, dark: darkColorScheme },
  defaultColorScheme: "light",
  components,
});

const { copper, maroon } = colorTokens;

/**
 * The contained buttons are the only overrides that branch on colour scheme,
 * and they do it through `theme.applyStyles`, whose return value is a nested
 * selector object rather than flat properties. Types cannot tell whether that
 * branch actually landed — a spread of the wrong shape compiles cleanly and
 * silently ships one fill to both schemes. So this resolves the overrides
 * against the real theme and reads the values back out.
 */
function resolve(name: "containedPrimary" | "containedSecondary") {
  const overrides = theme.components?.MuiButton?.styleOverrides;
  const entry = overrides?.[name];
  expect(typeof entry).toBe("function");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out = (entry as any)({ theme, ownerState: {} });
  return { flat: out as Record<string, unknown>, json: JSON.stringify(out) };
}

describe("contained button fills", () => {
  it("fills primary with the darkened copper in the light scheme", () => {
    const { flat } = resolve("containedPrimary");
    expect(flat.backgroundColor).toBe(copper[700]);
    expect(flat.color).toBe(colorTokens.ink.contrastCopy);
  });

  it("lightens the primary fill in the dark scheme but keeps the white label", () => {
    const { flat, json } = resolve("containedPrimary");
    // The dark fill steps up for its boundary against the near-black page,
    // stopping at the one copper that still carries white at AA.
    expect(json).toContain(copper[600]);
    expect(json).toContain(copper[700]);
    // The label is declared once, flat, so it is white in both schemes — the
    // dark branch must not reintroduce a colour of its own.
    expect(flat.color).toBe(colorTokens.ink.contrastCopy);
    expect(json).not.toContain(colorTokens.ink[900]);
  });

  it("gives secondary a scheme-correct hover in both schemes", () => {
    const { json } = resolve("containedSecondary");
    expect(json).toContain(maroon[900]);
    expect(json).toContain(maroon[400]);
  });

  it("carries the brand copper as primary.main in both schemes", () => {
    // `primary.main` is the brand hex, not the button fill — it is what every
    // `color="primary"` glyph and `borderColor: "primary.main"` rule resolves
    // to, and those only need the 3:1 non-text floor the brand copper clears.
    expect(lightColorScheme.palette?.primary).toMatchObject({ main: copper[500] });
    expect(darkColorScheme.palette?.primary).toMatchObject({ main: copper[500] });
  });
});
