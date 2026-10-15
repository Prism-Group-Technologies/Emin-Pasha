import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { Stack } from "@/components/atoms/Stack";
import { SectionShell } from "@/components/templates/SectionShell";
import { GETTING_HERE_ANCHOR_ID } from "@/containers/contact/anchors";
import { sections, travelTimes } from "@/containers/contact/copy";
import { LiveMap } from "@/containers/contact/molecules/LiveMap";
import { TravelTimeList } from "@/containers/contact/molecules/TravelTimeList";
import { ContactDetails } from "@/containers/contact/organisms/ContactDetails";
import { identity } from "@/content/identity";
import { directionsUrl } from "@/lib/directions";
import { mapEmbedUrl, placeUrl } from "@/lib/geo";
import type { RevealDirection } from "@/theme/motion";

/**
 * Where the hotel is and how to get to it: the live map on the wide side,
 * and beside it the machine-readable NAP, a directions button and the drive
 * times from the places guests actually come from. Map first on phones, since
 * it is what a visitor scrolling here is looking for.
 *
 * The embed URL is no longer built here. This section used to geocode
 * `"<name>, <address>"` as free text, and because the approved address
 * carries a P.O. Box, Google could not resolve it to a building: the iframe
 * rendered a view of Kampala with no marker on it — a map that answers
 * "where is this hotel" with a shrug. `lib/geo.ts` now holds the hotel's
 * coordinate and the pinned URL derived from it, shared with the home page
 * and `/our-story/the-hotel` so all three cannot drift apart again.
 *
 * `title` keeps the full NAP string: it is the iframe's accessible name, read
 * aloud by a screen reader, where "Plot 27 Akii Bua Road" is worth far more
 * than a pair of decimals.
 */
export function GettingHereSection({ motion = "up" }: { motion?: RevealDirection }) {
  const copy = sections.gettingHere;

  return (
    <SectionShell
      id={GETTING_HERE_ANCHOR_ID}
      motion={motion}
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      description={copy.description}
      bodyMotion={motion}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.35fr) minmax(0, 1fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "stretch",
        }}
      >
        <LiveMap
          embedUrl={mapEmbedUrl}
          openUrl={placeUrl}
          title={`Map of ${identity.name}, ${identity.address}`}
          openLabel={copy.openMap}
          loadingLabel={copy.mapLoading}
        />

        <Stack spacing={5}>
          <ContactDetails />
          <Button
            href={directionsUrl}
            size="large"
            startIcon={<Icon name="directions" />}
            aria-label={`${copy.directions}${NEW_TAB_NOTE}`}
            sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}
          >
            {copy.directions}
          </Button>
          <TravelTimeList title={copy.travelTitle} items={travelTimes} />
        </Stack>
      </Box>
    </SectionShell>
  );
}
