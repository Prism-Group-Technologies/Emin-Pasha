import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { FloatingActionButton } from "@/components/atoms/FloatingActionButton";
import { Icon } from "@/components/atoms/Icon";

import { floatingSlotSx } from "./floatingDockStyles";

export interface WhatsAppFabProps {
  label: string;
  /** Full `wa.me` deep link, message already encoded — built by `lib/directions`. */
  href: string;
}

/**
 * The bottom-left member of the dock, and a **Server Component**: it is a
 * real `<a href>` and nothing more, so it costs zero client JavaScript, works
 * before hydration and with JS off, and a long-press copies the actual chat
 * link. That is the whole argument for a plain link over a chat widget here.
 *
 * `NEW_TAB_NOTE` is appended to the accessible name by hand because this is
 * an icon-only link and has nowhere to nest the `VisuallyHidden` span that
 * `ExternalLink` uses — the note is imported rather than retyped so the
 * string exists in exactly one place (CLAUDE.md §5.4).
 */
export function WhatsAppFab({ label, href }: WhatsAppFabProps) {
  return (
    <FloatingActionButton
      aria-label={`${label}${NEW_TAB_NOTE}`}
      tone="whatsapp"
      href={href}
      sx={floatingSlotSx("left")}
    >
      <Icon name="whatsapp" />
    </FloatingActionButton>
  );
}
