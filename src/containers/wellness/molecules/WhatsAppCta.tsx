import { Button, type ButtonProps } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { whatsappWellnessUrl } from "@/lib/directions";

export interface WhatsAppCtaProps {
  label: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
}

/**
 * The one "book on WhatsApp" control the wellness pages reuse — hero, sticky
 * bar, every inline mid-funnel nudge and the closing band all render this.
 *
 * The destination is the single `whatsappWellnessUrl` from `lib/directions`,
 * so the pre-filled message the property can receive under a guest's name
 * stays closed and reviewable in `content/whatsapp.ts` (CLAUDE.md §5.4). The
 * `Button` atom already renders a real `<a target="_blank" rel="noopener">`
 * for an `https:` href; the new-tab note is folded into the accessible name
 * because the visible label is short.
 */
export function WhatsAppCta({ label, variant = "primary", size, fullWidth }: WhatsAppCtaProps) {
  return (
    <Button
      href={whatsappWellnessUrl}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      startIcon={<Icon name="whatsapp" />}
      aria-label={`${label}${NEW_TAB_NOTE}`}
    >
      {label}
    </Button>
  );
}
