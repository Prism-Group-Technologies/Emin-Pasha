import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { PendingInfoNotice } from "@/components/molecules/PendingInfoNotice";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { OUTLET_ASSET_IDS } from "@/containers/dining/constants";
import { NamesakeNote } from "@/containers/dining/molecules/NamesakeNote";
import { assets } from "@/content/assets";
import { ctas } from "@/content/ctas";
import type { Outlet } from "@/schemas/content/outlet";
import { alternatingDirection } from "@/theme/motion";

const reserve = ctas.find((cta) => cta.id === "dining-reserve");

/**
 * One outlet. Description and `namedForNote` are the approved §5 copy,
 * unedited. Menus, dishes, prices and opening hours are absent by design —
 * none is in the source and all are forbidden to invent (§0.7).
 *
 * TODO(EMIN-Q13): "Reserve a table" points at the enquiry route, because no
 * table-reservation destination has been confirmed. That is a working path
 * to a booking, not a dead end — every reservation here is handled by a
 * person anyway.
 */
export function OutletDetailContainer({ outlet }: { outlet: Outlet }) {
  const asset = assets.find((item) => item.id === OUTLET_ASSET_IDS[outlet.id]);
  const isInRoom = outlet.type === "in-room";

  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow={`§ ${outlet.name.toUpperCase()}`}
        heading={outlet.name}
        headingLevel="h1"
      >
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Dining", href: "/dining" },
            { label: outlet.name },
          ]}
        />
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
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.3fr) minmax(0, 1fr)" },
            gap: { xs: 6, md: 8 },
            alignItems: "start",
          }}
        >
          <Stack spacing={6}>
            <Text variant="subtitle1">{outlet.description}</Text>
            <NamesakeNote note={outlet.namedForNote} />
          </Stack>

          <Stack spacing={5}>
            {reserve?.href && !isInRoom && (
              <Button href={reserve.href} size="large">
                {reserve.label}
              </Button>
            )}
            <PendingInfoNotice
              subject={isInRoom ? "The In-Room Dining Menu" : "Menu and opening hours"}
              todoId="EMIN-Q12"
            />
          </Stack>
        </Box>
      </SectionShell>

      <SectionShell
        motion={alternatingDirection(3)}
        heading="Make an evening of it"
        variant="raised"
      >
        <RelatedLinks hrefs={["/accommodation", "/meetings-and-events", "/offers"]} />
      </SectionShell>
    </>
  );
}
