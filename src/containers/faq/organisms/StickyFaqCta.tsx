import { FaqStickyBar } from "@/containers/faq/molecules/FaqStickyBar";
import { whatsappFaqUrl } from "@/lib/directions";

/**
 * The page-scoped sticky "ask" bar. A Server Component whose only job is to
 * resolve `whatsappFaqUrl` and hand it to the client `FaqStickyBar` as a plain
 * string, so the Zod-validated content layer stays off the client (D25).
 */
export function StickyFaqCta() {
  return <FaqStickyBar whatsappHref={whatsappFaqUrl} />;
}
