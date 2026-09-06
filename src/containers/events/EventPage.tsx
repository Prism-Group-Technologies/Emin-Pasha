import type { ReactNode } from "react";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { GroupTerms } from "@/containers/events/molecules/GroupTerms";
import { DeferredRfpForm } from "@/containers/events/organisms/DeferredRfpForm";
import { assets } from "@/content/assets";
import { alternatingDirection } from "@/theme/motion";

export interface EventPageProps {
  eyebrow: string;
  heading: string;
  intro: string;
  breadcrumb: string;
  assetId?: string;
  /** Verified inclusions, rendered as a plain list. */
  inclusions?: string[];
  /** Capacity table, or anything else the specific page adds. */
  children?: ReactNode;
  relatedHrefs: string[];
  showGroupTerms?: boolean;
}

/**
 * The shared shape of all five Meetings & Events pages: intro, image,
 * verified inclusions, page-specific content, group terms, then the RFP form.
 *
 * The form sits on **every** page rather than only the hub. An organiser who
 * has just read about Kudara Hall should not have to navigate back to enquire
 * — that navigation is where event leads are lost.
 */
export function EventPage(props: EventPageProps) {
  const asset = props.assetId ? assets.find((item) => item.id === props.assetId) : undefined;

  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow={props.eyebrow}
        heading={props.heading}
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Meetings & Events", href: "/meetings-and-events" },
              ...(props.breadcrumb ? [{ label: props.breadcrumb }] : []),
            ]}
          />
          <Text variant="subtitle1" sx={{ maxWidth: "70ch" }}>
            {props.intro}
          </Text>
        </Stack>
      </SectionShell>

      {asset && (
        <SectionShell motion={alternatingDirection(1)} variant="bleed">
          <AssetImage asset={asset} sizes="100vw" priority />
        </SectionShell>
      )}

      <SectionShell motion={alternatingDirection(2)}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
            gap: { xs: 6, md: 8 },
            alignItems: "start",
          }}
        >
          <Stack spacing={6}>
            {props.inclusions && props.inclusions.length > 0 && (
              <Stack spacing={3}>
                <Text variant="h3" component="h2">
                  What you get
                </Text>
                <Box component="ul" sx={{ m: 0, pl: 5, display: "grid", gap: 2 }}>
                  {props.inclusions.map((item) => (
                    <Text key={item} component="li" variant="body1" color="text.secondary">
                      {item}
                    </Text>
                  ))}
                </Box>
              </Stack>
            )}
            {props.children}
            {props.showGroupTerms !== false && <GroupTerms />}
          </Stack>
          <Box id="enquire">
            <DeferredRfpForm />
          </Box>
        </Box>
      </SectionShell>

      <SectionShell motion={alternatingDirection(3)} heading="Also here" variant="raised">
        <RelatedLinks hrefs={props.relatedHrefs} />
      </SectionShell>
    </>
  );
}
