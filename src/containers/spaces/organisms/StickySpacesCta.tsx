import { SpacesStickyBar } from "@/containers/spaces/molecules/SpacesStickyBar";
import { whatsappLoungesUrl } from "@/lib/directions";

/**
 * The page-scoped sticky bar's server half: resolves `whatsappLoungesUrl` and
 * hands it to the client bar as a plain string (DECISIONS.md D25).
 */
export function StickySpacesCta() {
  return <SpacesStickyBar whatsappHref={whatsappLoungesUrl} />;
}
