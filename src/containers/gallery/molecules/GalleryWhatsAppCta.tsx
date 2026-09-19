import { Button, type ButtonProps } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";

export interface GalleryWhatsAppCtaProps {
  /** A resolved `wa.me` URL from `lib/directions` — never built at the call site. */
  href: string;
  label: string;
  /** Folded into the accessible name when the visible label is generic. */
  context?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
  sx?: ButtonProps["sx"];
}

/**
 * The gallery's one lead-capture control — WhatsApp is the only channel on
 * this page (user decision). Takes the href as a plain string so it works on
 * both sides of the client boundary. Many "Plan on WhatsApp" buttons would be
 * indistinguishable to a screen reader, so the photo or collection name and
 * the new-tab note are folded into the accessible name.
 */
export function GalleryWhatsAppCta({
  href,
  label,
  context,
  variant = "primary",
  size,
  fullWidth,
  sx,
}: GalleryWhatsAppCtaProps) {
  const name = context ? `${label}: ${context}` : label;
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
