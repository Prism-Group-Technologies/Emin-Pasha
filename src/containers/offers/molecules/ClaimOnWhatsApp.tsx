import { Button, type ButtonProps } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";

export interface ClaimOnWhatsAppProps {
  /** A resolved `wa.me` URL from `lib/directions` — never built at the call site. */
  href: string;
  label: string;
  /** Folded into the accessible name when the visible label is generic. */
  offerTitle?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
  sx?: ButtonProps["sx"];
}

/**
 * The page's one lead-capture control — the brief made WhatsApp the only way
 * to claim. It takes the href as a plain string so it works on both sides of
 * the client boundary. A dozen "Claim on WhatsApp" buttons in one grid would
 * be indistinguishable to a screen reader, so the offer title and the new-tab
 * note are folded into the accessible name.
 */
export function ClaimOnWhatsApp({
  href,
  label,
  offerTitle,
  variant = "primary",
  size,
  fullWidth,
  sx,
}: ClaimOnWhatsAppProps) {
  const name = offerTitle ? `${label}: ${offerTitle}` : label;
  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      startIcon={<Icon name="whatsapp" />}
      aria-label={`${name}${NEW_TAB_NOTE}`}
      sx={sx}
    >
      {label}
    </Button>
  );
}
