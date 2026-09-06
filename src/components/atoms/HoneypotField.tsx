import { Box } from "@/components/atoms/Box";

/**
 * The honeypot every enquiry form carries.
 *
 * Positioned off-screen rather than `display: none` — some bots skip hidden
 * fields — never focusable, and `aria-hidden` so no screen-reader user ever
 * meets it. Named `website` rather than `honeypot`, because bots read field
 * names. Anything in it means a bot, and the shared route pipeline quietly
 * returns 200 without sending.
 *
 * Takes the registration object from react-hook-form so the field is part of
 * the same form state as everything else.
 */
export function HoneypotField(props: Record<string, unknown>) {
  return (
    <Box
      component="input"
      {...props}
      type="text"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      sx={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
    />
  );
}
