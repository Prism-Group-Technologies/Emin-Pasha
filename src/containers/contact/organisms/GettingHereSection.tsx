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
import type { RevealDirection } from "@/theme/motion";

/**
 * Name + approved address, so Google resolves the hotel's own listing rather
 * than a bare street. Still the NAP string, never an invented coordinate
 * (TODO(EMIN-Q20)).
 */
const MAP_QUERY = encodeURIComponent(`${identity.name}, ${identity.address}`);
const EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;

/**
 * Where the hotel is and how to get to it: the live map on the wide side,
 * and beside it the machine-readable NAP, a directions button and the drive
 * times from the places guests actually come from. Map first on phones, since
 * it is what a visitor scrolling here is looking for.
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
          embedUrl={EMBED_URL}
          openUrl={directionsUrl}
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
