import { shell } from "@/content/shell";
import { whatsappUrl } from "@/lib/directions";

import { ScrollToTopFab } from "./ScrollToTopFab";
import { WhatsAppFab } from "./WhatsAppFab";

/**
 * The desktop floating dock — two independent controls pinned to the bottom
 * corners, mounted once from `PageShell` beside the two bars.
 *
 * The split is deliberate rather than decorative. Bottom-left is *contact*,
 * an outbound hand-off the guest chooses; bottom-right is *navigation*, the
 * corner every design system that documents this pattern (NN/g, GOV.UK-lineage
 * systems, NSW) puts back-to-top in, because that is where people look for it.
 * Putting them on opposite corners also means neither can ever occlude the
 * other, at any width, with no offset arithmetic between them.
 *
 * A **Server Component**, and the only place either control's copy is read:
 * `content/shell` is resolved here and handed across the boundary as plain
 * strings (DECISIONS.md D25). WhatsApp stays entirely on the server; only the
 * scroll control ships JavaScript.
 *
 * Rendered as siblings, not children of a wrapper: a single positioned
 * container spanning both corners would have to stretch across the viewport
 * and sit over the page, and `pointer-events: none` juggling to undo that is
 * a well-known source of dead click zones.
 */
export function FloatingActionDock() {
  const { whatsappLabel, backToTopLabel } = shell.floatingActions;

  return (
    <>
      <WhatsAppFab label={whatsappLabel} href={whatsappUrl} />
      <ScrollToTopFab label={backToTopLabel} focusTargetId={shell.skipLink.targetId} />
    </>
  );
}
