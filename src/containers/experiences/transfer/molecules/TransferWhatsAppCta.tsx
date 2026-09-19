import { Button, type ButtonProps } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { whatsappTransferUrl } from "@/lib/directions";

export interface TransferWhatsAppCtaProps {
  label: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  sx?: ButtonProps["sx"];
}

/**
 * The transfer page's "book on WhatsApp" control. The destination is the
 * single `whatsappTransferUrl`, so the pre-filled message the property can
 * receive stays closed and reviewable in `content/whatsapp.ts` (CLAUDE.md
 * §5.4) — the same construction as the wellness `WhatsAppCta`. Server
 * component; the new-tab note is folded into the accessible name.
 */
export function TransferWhatsAppCta({
  label,
  variant = "primary",
  size,
  sx,
}: TransferWhatsAppCtaProps) {
  return (
    <Button
      href={whatsappTransferUrl}
      variant={variant}
      size={size}
      sx={sx}
      startIcon={<Icon name="whatsapp" />}
      aria-label={`${label}${NEW_TAB_NOTE}`}
    >
      {label}
    </Button>
  );
}
