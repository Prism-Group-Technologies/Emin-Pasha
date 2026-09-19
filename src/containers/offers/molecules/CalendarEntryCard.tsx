import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { CalendarEntry } from "@/containers/offers/copy";
import { ClaimOnWhatsApp } from "@/containers/offers/molecules/ClaimOnWhatsApp";
import { OfferPill } from "@/containers/offers/molecules/OfferPill";

export interface CalendarEntryCardProps {
  entry: CalendarEntry;
  /** Resolved WhatsApp claim URL — used only while the entry is `open`. */
  claimHref: string;
  claimLabel: string;
  /** In-page link to the alerts sign-up — used while the entry is `soon`. */
  notifyHref: string;
  notifyLabel: string;
}

/**
 * One date on the seasonal calendar: the month marker and icon, the window,
 * the package in a line, a status pill, and the next step for its state — an
 * open package is claimed on WhatsApp, an upcoming one sends the guest to the
 * offer-alerts sign-up so the interest is captured rather than lost.
 */
export function CalendarEntryCard(props: CalendarEntryCardProps) {
  const { entry } = props;
  const open = entry.status === "open";

  return (
    <Box component="article" sx={[cardSurface(open), { gap: 3 }]}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 3 }}>
        <IconBadge name={entry.icon} tone={open ? "gold" : "garden"} size={44} />
        <OfferPill tone={open ? "gold" : "garden"}>{entry.statusLabel}</OfferPill>
      </Box>
      <Text
        variant="overline"
        component="p"
        color="text.secondary"
        sx={{ fontFamily: "var(--font-cartographic)", mt: 2 }}
      >
        {`${entry.month} · ${entry.when}`}
      </Text>
      <Text variant="h4" component="h3" sx={{ textWrap: "balance" }}>
        {entry.title}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {entry.description}
      </Text>
      <Box sx={{ mt: "auto", pt: 3 }}>
        {open ? (
          <ClaimOnWhatsApp
            href={props.claimHref}
            label={props.claimLabel}
            offerTitle={entry.title}
            variant="ghost"
            size="small"
          />
        ) : (
          <Button
            href={props.notifyHref}
            variant="link"
            size="small"
            aria-label={`${props.notifyLabel}: ${entry.title}`}
          >
            {props.notifyLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
}
