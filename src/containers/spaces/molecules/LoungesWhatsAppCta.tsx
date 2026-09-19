import { Button, type ButtonProps } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { whatsappLoungesUrl } from "@/lib/directions";

export interface LoungesWhatsAppCtaProps {
  label: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
}

/**
 * The page's "reserve on WhatsApp" control. The destination is the single
 * `whatsappLoungesUrl`, so the pre-filled message stays closed and reviewable
 * in `content/whatsapp.ts` — the same construction as `TransferWhatsAppCta`.
 */
export function LoungesWhatsAppCta({
  label,
  variant = "ghost",
  size,
  fullWidth,
}: LoungesWhatsAppCtaProps) {
  return (
    <Button
      href={whatsappLoungesUrl}
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
