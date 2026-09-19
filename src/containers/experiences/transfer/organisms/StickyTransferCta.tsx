import { StickyTransferBar } from "@/containers/experiences/transfer/molecules/StickyTransferBar";
import { whatsappTransferUrl } from "@/lib/directions";

/**
 * The page-scoped sticky "book" bar. A Server Component whose only job is to
 * resolve `whatsappTransferUrl` and hand it to the client bar as a plain
 * string, so the Zod-validated content layer stays off the client (D25).
 */
export function StickyTransferCta() {
  return <StickyTransferBar whatsappHref={whatsappTransferUrl} />;
}
