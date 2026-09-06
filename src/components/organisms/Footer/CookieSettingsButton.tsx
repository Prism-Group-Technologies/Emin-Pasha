"use client";

import { Text } from "@/components/atoms/Text";
import { useCookieSettings } from "@/hooks/useCookieSettings";
import { quietLinkSx } from "@/theme/linkStyles";

/**
 * The "Cookie settings" reopener CLAUDE.md §6.5 requires. A real `<button>`,
 * always rendered — a visitor who has already accepted must still be able to
 * change their mind, which is the whole point of "reopenable from the
 * footer". It wears `quietLinkSx` so it is indistinguishable from the legal
 * links beside it despite not being a link.
 *
 * 'use client' justification: opens the consent dialog. It is split out of
 * `FooterLegalBar` so the legal links either side of it stay on the server,
 * and takes its label as a prop for the same reason (DECISIONS.md D25). The
 * store subscription itself now lives in `useCookieSettings`.
 */
export function CookieSettingsButton({ label }: { label: string }) {
  const { openPreferences } = useCookieSettings();

  return (
    <Text
      component="button"
      type="button"
      onClick={openPreferences}
      variant="body2"
      // No `font: "inherit"` here. A `<button>` does not inherit font by
      // default, so that shorthand looks like the fix — but it inherits from
      // the *parent*, which is the legal `<nav>` at body1/16px, and so it
      // overrode the `body2` variant and rendered this control visibly
      // larger than the four links beside it. Dropping it lets the variant's
      // own class beat the UA stylesheet, which is all that was needed.
      sx={[quietLinkSx, { border: 0, background: "none", cursor: "pointer", p: 0 }]}
    >
      {label}
    </Text>
  );
}
